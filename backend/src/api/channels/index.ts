// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Channels API (Manual Connection Setup)
// ═══════════════════════════════════════════════════════════════════════════════
// هنا يتم إضافة وإدارة معلومات ربط القنوات يدوياً من الموقع
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, requireRole, type AuthContext } from '../../middleware/auth.js';
import { env } from '../../core/config/index.js';

export const channelsRoutes = new Hono<AuthContext>();
channelsRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get All Channel Connections
// ─────────────────────────────────────────────────────────────────────────────────

channelsRoutes.get('/', async (c) => {
  try {
    const channels = await db.query.channelConnections.findMany();
    
    // Mask sensitive credentials
    const maskedChannels = channels.map(ch => ({
      ...ch,
      credentials: ch.credentials ? {
        ...ch.credentials,
        accessToken: ch.credentials.accessToken ? '••••••••' : undefined,
        appSecret: ch.credentials.appSecret ? '••••••••' : undefined,
        botToken: ch.credentials.botToken ? '••••••••' : undefined,
      } : null,
    }));
    
    return c.json({ success: true, data: maskedChannels });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب القنوات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Single Channel
// ─────────────────────────────────────────────────────────────────────────────────

channelsRoutes.get('/:channel', async (c) => {
  try {
    const channel = c.req.param('channel');
    
    const connection = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, channel as any),
    });
    
    return c.json({ success: true, data: connection });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب القناة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// WhatsApp Connection Schema
// ─────────────────────────────────────────────────────────────────────────────────

const whatsappCredentialsSchema = z.object({
  phoneNumberId: z.string().min(1, 'Phone Number ID مطلوب'),
  businessAccountId: z.string().min(1, 'Business Account ID مطلوب'),
  accessToken: z.string().min(1, 'Access Token مطلوب'),
  webhookVerifyToken: z.string().min(1, 'Webhook Verify Token مطلوب'),
  appSecret: z.string().optional(),
});

channelsRoutes.post('/whatsapp', zValidator('json', whatsappCredentialsSchema), async (c) => {
  try {
    const credentials = c.req.valid('json');
    
    // Check if exists
    const existing = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'whatsapp'),
    });
    
    const webhookUrl = `${env.API_URL}/webhooks/whatsapp`;
    
    if (existing) {
      const [updated] = await db.update(schema.channelConnections)
        .set({
          credentials,
          webhookUrl,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(schema.channelConnections.id, existing.id))
        .returning();
      
      return c.json({
        success: true,
        data: updated,
        message: 'تم تحديث إعدادات WhatsApp بنجاح',
        webhookUrl,
      });
    } else {
      const [created] = await db.insert(schema.channelConnections)
        .values({
          channel: 'whatsapp',
          credentials,
          webhookUrl,
          isActive: true,
        })
        .returning();
      
      return c.json({
        success: true,
        data: created,
        message: 'تم إضافة WhatsApp بنجاح. يرجى إضافة الـ Webhook URL في Meta Dashboard',
        webhookUrl,
      });
    }
  } catch (error) {
    console.error('WhatsApp setup error:', error);
    return c.json({ success: false, error: 'فشل في إعداد WhatsApp' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Telegram Connection Schema
// ─────────────────────────────────────────────────────────────────────────────────

const telegramCredentialsSchema = z.object({
  botToken: z.string().min(1, 'Bot Token مطلوب'),
  webhookSecret: z.string().optional(),
});

channelsRoutes.post('/telegram', zValidator('json', telegramCredentialsSchema), async (c) => {
  try {
    const credentials = c.req.valid('json');
    
    const webhookUrl = `${env.API_URL}/webhooks/telegram`;
    
    // Set webhook with Telegram
    const setWebhookResponse = await fetch(
      `https://api.telegram.org/bot${credentials.botToken}/setWebhook`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ['message', 'callback_query'],
          secret_token: credentials.webhookSecret,
        }),
      }
    );
    
    const webhookResult = await setWebhookResponse.json();
    
    if (!webhookResult.ok) {
      return c.json({
        success: false,
        error: `فشل في إعداد Webhook: ${webhookResult.description}`,
      }, 400);
    }
    
    // Save to database
    const existing = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'telegram'),
    });
    
    if (existing) {
      await db.update(schema.channelConnections)
        .set({
          credentials,
          webhookUrl,
          webhookStatus: 'active',
          isActive: true,
          isConnected: true,
          updatedAt: new Date(),
        })
        .where(eq(schema.channelConnections.id, existing.id));
    } else {
      await db.insert(schema.channelConnections)
        .values({
          channel: 'telegram',
          credentials,
          webhookUrl,
          webhookStatus: 'active',
          isActive: true,
          isConnected: true,
        });
    }
    
    return c.json({
      success: true,
      message: 'تم ربط Telegram بنجاح! ✅',
      webhookUrl,
    });
  } catch (error) {
    console.error('Telegram setup error:', error);
    return c.json({ success: false, error: 'فشل في إعداد Telegram' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Facebook Messenger Connection
// ─────────────────────────────────────────────────────────────────────────────────

const messengerCredentialsSchema = z.object({
  pageAccessToken: z.string().min(1, 'Page Access Token مطلوب'),
  appSecret: z.string().min(1, 'App Secret مطلوب'),
  pageId: z.string().min(1, 'Page ID مطلوب'),
});

channelsRoutes.post('/messenger', zValidator('json', messengerCredentialsSchema), async (c) => {
  try {
    const credentials = c.req.valid('json');
    
    const webhookUrl = `${env.API_URL}/webhooks/messenger`;
    
    const existing = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'messenger'),
    });
    
    if (existing) {
      await db.update(schema.channelConnections)
        .set({
          credentials,
          webhookUrl,
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(schema.channelConnections.id, existing.id));
    } else {
      await db.insert(schema.channelConnections)
        .values({
          channel: 'messenger',
          credentials,
          webhookUrl,
          isActive: true,
        });
    }
    
    return c.json({
      success: true,
      message: 'تم إضافة Messenger. يرجى إعداد الـ Webhook في Facebook App Dashboard',
      webhookUrl,
      verifyToken: env.FACEBOOK_VERIFY_TOKEN || 'your-verify-token',
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إعداد Messenger' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Instagram Connection
// ─────────────────────────────────────────────────────────────────────────────────

const instagramCredentialsSchema = z.object({
  accessToken: z.string().min(1, 'Access Token مطلوب'),
  businessAccountId: z.string().min(1, 'Business Account ID مطلوب'),
});

channelsRoutes.post('/instagram', zValidator('json', instagramCredentialsSchema), async (c) => {
  try {
    const credentials = c.req.valid('json');
    
    const existing = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'instagram'),
    });
    
    if (existing) {
      await db.update(schema.channelConnections)
        .set({
          credentials: {
            accessToken: credentials.accessToken,
            businessAccountId: credentials.businessAccountId,
          },
          isActive: true,
          updatedAt: new Date(),
        })
        .where(eq(schema.channelConnections.id, existing.id));
    } else {
      await db.insert(schema.channelConnections)
        .values({
          channel: 'instagram',
          credentials: {
            accessToken: credentials.accessToken,
            businessAccountId: credentials.businessAccountId,
          },
          isActive: true,
        });
    }
    
    return c.json({
      success: true,
      message: 'تم إضافة Instagram بنجاح',
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إعداد Instagram' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Toggle Channel Active Status
// ─────────────────────────────────────────────────────────────────────────────────

channelsRoutes.patch('/:channel/toggle', async (c) => {
  try {
    const channel = c.req.param('channel');
    
    const existing = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, channel as any),
    });
    
    if (!existing) {
      return c.json({ success: false, error: 'القناة غير موجودة' }, 404);
    }
    
    const [updated] = await db.update(schema.channelConnections)
      .set({
        isActive: !existing.isActive,
        updatedAt: new Date(),
      })
      .where(eq(schema.channelConnections.id, existing.id))
      .returning();
    
    return c.json({
      success: true,
      data: updated,
      message: updated.isActive ? 'تم تفعيل القناة' : 'تم إيقاف القناة',
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في تحديث القناة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Delete Channel Connection
// ─────────────────────────────────────────────────────────────────────────────────

channelsRoutes.delete('/:channel', async (c) => {
  try {
    const channel = c.req.param('channel');
    
    await db.delete(schema.channelConnections)
      .where(eq(schema.channelConnections.channel, channel as any));
    
    return c.json({ success: true, message: 'تم حذف القناة' });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في حذف القناة' }, 500);
  }
});
