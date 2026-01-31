// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Conversations API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq, desc, and } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';
import { generateSalesResponse, analyzeSentiment, detectIntent } from '../../core/ai/gemini-engine.js';
import { broadcast } from '../../core/realtime/pusher.js';

export const conversationsRoutes = new Hono<AuthContext>();
conversationsRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get All Conversations (Inbox)
// ─────────────────────────────────────────────────────────────────────────────────

conversationsRoutes.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const channel = c.req.query('channel');
    const status = c.req.query('status'); // active, handoff, closed
    const search = c.req.query('search');
    
    let whereConditions = [];
    
    if (channel) {
      whereConditions.push(eq(schema.conversations.channel, channel as any));
    }
    
    if (status === 'active') {
      whereConditions.push(eq(schema.conversations.isActive, true));
      whereConditions.push(eq(schema.conversations.isHandedOff, false));
    } else if (status === 'handoff') {
      whereConditions.push(eq(schema.conversations.isHandedOff, true));
    } else if (status === 'closed') {
      whereConditions.push(eq(schema.conversations.isActive, false));
    }
    
    const conversations = await db.query.conversations.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      limit,
      offset: (page - 1) * limit,
      orderBy: [desc(schema.conversations.lastMessageAt)],
      with: {
        customer: {
          columns: { id: true, name: true, phone: true, avatar: true, segment: true },
        },
        messages: {
          limit: 1,
          orderBy: [desc(schema.messages.createdAt)],
          columns: { content: true, sender: true, createdAt: true },
        },
      },
    });
    
    return c.json({
      success: true,
      data: conversations.map(conv => ({
        id: conv.id,
        customer: conv.customer,
        channel: conv.channel,
        isActive: conv.isActive,
        isHandedOff: conv.isHandedOff,
        sentiment: conv.sentiment,
        intent: conv.intent,
        lastMessage: conv.messages[0] || null,
        messageCount: conv.messageCount,
        lastMessageAt: conv.lastMessageAt,
      })),
      pagination: {
        page,
        limit,
        hasMore: conversations.length === limit,
      },
    });
  } catch (error) {
    console.error('Get conversations error:', error);
    return c.json({ success: false, error: 'فشل في جلب المحادثات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Single Conversation with Messages
// ─────────────────────────────────────────────────────────────────────────────────

conversationsRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const conversation = await db.query.conversations.findFirst({
      where: eq(schema.conversations.id, id),
      with: {
        customer: true,
        messages: {
          orderBy: [desc(schema.messages.createdAt)],
          limit: 50,
        },
      },
    });
    
    if (!conversation) {
      return c.json({ success: false, error: 'المحادثة غير موجودة' }, 404);
    }
    
    return c.json({
      success: true,
      data: {
        ...conversation,
        messages: conversation.messages.reverse(),
      },
    });
  } catch (error) {
    console.error('Get conversation error:', error);
    return c.json({ success: false, error: 'فشل في جلب المحادثة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Send Message (Admin)
// ─────────────────────────────────────────────────────────────────────────────────

const sendMessageSchema = z.object({
  content: z.string().min(1),
  contentType: z.enum(['text', 'image', 'audio', 'video', 'document']).default('text'),
  mediaUrl: z.string().optional(),
});

conversationsRoutes.post('/:id/messages', zValidator('json', sendMessageSchema), async (c) => {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    const { content, contentType, mediaUrl } = c.req.valid('json');
    
    const conversation = await db.query.conversations.findFirst({
      where: eq(schema.conversations.id, id),
    });
    
    if (!conversation) {
      return c.json({ success: false, error: 'المحادثة غير موجودة' }, 404);
    }
    
    // Create message
    const [message] = await db.insert(schema.messages)
      .values({
        conversationId: id,
        sender: 'admin',
        senderId: user.id,
        content,
        contentType,
        mediaUrl,
      })
      .returning();
    
    // Update conversation
    await db.update(schema.conversations)
      .set({
        lastMessageAt: new Date(),
        messageCount: (conversation.messageCount || 0) + 1,
        humanMessageCount: (conversation.humanMessageCount || 0) + 1,
        updatedAt: new Date(),
      })
      .where(eq(schema.conversations.id, id));
    
    // TODO: Send message via channel (WhatsApp, Telegram, etc.)
    
    // Broadcast to real-time
    await broadcast.newMessage(id, {
      id: message.id,
      sender: 'admin',
      content,
      timestamp: new Date(),
    });
    
    return c.json({ success: true, data: message });
  } catch (error) {
    console.error('Send message error:', error);
    return c.json({ success: false, error: 'فشل في إرسال الرسالة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Take Over Conversation (Handoff)
// ─────────────────────────────────────────────────────────────────────────────────

conversationsRoutes.post('/:id/takeover', async (c) => {
  try {
    const id = c.req.param('id');
    const user = c.get('user');
    
    await db.update(schema.conversations)
      .set({
        isHandedOff: true,
        handedOffTo: user.id,
        handedOffAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.conversations.id, id));
    
    return c.json({ success: true, message: 'تم استلام المحادثة' });
  } catch (error) {
    console.error('Takeover error:', error);
    return c.json({ success: false, error: 'فشل في استلام المحادثة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Return to Bot
// ─────────────────────────────────────────────────────────────────────────────────

conversationsRoutes.post('/:id/return-to-bot', async (c) => {
  try {
    const id = c.req.param('id');
    
    await db.update(schema.conversations)
      .set({
        isHandedOff: false,
        handedOffTo: null,
        handedOffAt: null,
        updatedAt: new Date(),
      })
      .where(eq(schema.conversations.id, id));
    
    return c.json({ success: true, message: 'تم إرجاع المحادثة للبوت' });
  } catch (error) {
    console.error('Return to bot error:', error);
    return c.json({ success: false, error: 'فشل في إرجاع المحادثة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Close Conversation
// ─────────────────────────────────────────────────────────────────────────────────

conversationsRoutes.post('/:id/close', async (c) => {
  try {
    const id = c.req.param('id');
    
    await db.update(schema.conversations)
      .set({
        isActive: false,
        closedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(schema.conversations.id, id));
    
    return c.json({ success: true, message: 'تم إغلاق المحادثة' });
  } catch (error) {
    console.error('Close error:', error);
    return c.json({ success: false, error: 'فشل في إغلاق المحادثة' }, 500);
  }
});
