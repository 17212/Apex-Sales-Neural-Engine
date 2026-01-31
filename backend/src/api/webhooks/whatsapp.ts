// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - WhatsApp Webhook Handler
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

import { db, schema } from '../../database/index.js';
import { generateSalesResponse, analyzeSentiment } from '../../core/ai/gemini-engine.js';
import { broadcast } from '../../core/realtime/pusher.js';

export const whatsappWebhook = new Hono();

// ─────────────────────────────────────────────────────────────────────────────────
// Webhook Verification (GET)
// ─────────────────────────────────────────────────────────────────────────────────

whatsappWebhook.get('/', async (c) => {
  const mode = c.req.query('hub.mode');
  const token = c.req.query('hub.verify_token');
  const challenge = c.req.query('hub.challenge');
  
  // Get verify token from database
  const connection = await db.query.channelConnections.findFirst({
    where: eq(schema.channelConnections.channel, 'whatsapp'),
  });
  
  const verifyToken = (connection?.credentials as any)?.webhookVerifyToken;
  
  if (mode === 'subscribe' && token === verifyToken) {
    console.log('✅ WhatsApp webhook verified');
    
    // Update status
    if (connection) {
      await db.update(schema.channelConnections)
        .set({ webhookStatus: 'active', isConnected: true })
        .where(eq(schema.channelConnections.id, connection.id));
    }
    
    return c.text(challenge || '');
  }
  
  return c.text('Verification failed', 403);
});

// ─────────────────────────────────────────────────────────────────────────────────
// Webhook Message Handler (POST)
// ─────────────────────────────────────────────────────────────────────────────────

whatsappWebhook.post('/', async (c) => {
  try {
    const body = await c.req.json();
    
    // Get credentials
    const connection = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'whatsapp'),
    });
    
    if (!connection?.isActive) {
      return c.json({ status: 'inactive' });
    }
    
    const credentials = connection.credentials as any;
    
    // Verify signature
    const signature = c.req.header('x-hub-signature-256');
    if (credentials.appSecret && signature) {
      const expectedSignature = 'sha256=' + crypto
        .createHmac('sha256', credentials.appSecret)
        .update(JSON.stringify(body))
        .digest('hex');
      
      if (signature !== expectedSignature) {
        console.warn('Invalid WhatsApp signature');
        return c.json({ error: 'Invalid signature' }, 401);
      }
    }
    
    // Process messages
    const entry = body.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;
    
    if (value?.messages) {
      for (const message of value.messages) {
        await processWhatsAppMessage(message, value.contacts?.[0], credentials);
      }
    }
    
    // Update stats
    await db.update(schema.channelConnections)
      .set({
        totalMessages: (connection.totalMessages || 0) + 1,
        lastMessageAt: new Date(),
      })
      .where(eq(schema.channelConnections.id, connection.id));
    
    return c.json({ status: 'ok' });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    return c.json({ status: 'error' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Process Individual Message
// ─────────────────────────────────────────────────────────────────────────────────

async function processWhatsAppMessage(
  message: any,
  contact: any,
  credentials: any
) {
  const whatsappId = message.from;
  const messageText = message.text?.body || '';
  const messageType = message.type;
  
  // Find or create customer
  let customer = await db.query.customers.findFirst({
    where: eq(schema.customers.whatsappId, whatsappId),
  });
  
  if (!customer) {
    [customer] = await db.insert(schema.customers)
      .values({
        whatsappId,
        name: contact?.profile?.name || 'عميل WhatsApp',
        phone: whatsappId,
        preferredChannel: 'whatsapp',
      })
      .returning();
  }
  
  // Find or create conversation
  let conversation = await db.query.conversations.findFirst({
    where: eq(schema.conversations.customerId, customer.id),
  });
  
  if (!conversation || !conversation.isActive) {
    [conversation] = await db.insert(schema.conversations)
      .values({
        customerId: customer.id,
        channel: 'whatsapp',
        isActive: true,
      })
      .returning();
    
    // Broadcast new conversation
    await broadcast.newConversation({
      id: conversation.id,
      customerName: customer.name || 'عميل',
      channel: 'whatsapp',
      preview: messageText.substring(0, 50),
    });
  }
  
  // Save customer message
  const [savedMessage] = await db.insert(schema.messages)
    .values({
      conversationId: conversation.id,
      sender: 'customer',
      senderId: customer.id,
      content: messageText,
      contentType: messageType,
      externalId: message.id,
      isVoiceNote: messageType === 'audio',
    })
    .returning();
  
  // Analyze sentiment
  const sentiment = await analyzeSentiment(messageText);
  
  // Update conversation
  await db.update(schema.conversations)
    .set({
      lastMessageAt: new Date(),
      messageCount: (conversation.messageCount || 0) + 1,
      sentiment: sentiment.sentiment,
      sentimentScore: sentiment.score,
    })
    .where(eq(schema.conversations.id, conversation.id));
  
  // Broadcast message
  await broadcast.newMessage(conversation.id, {
    id: savedMessage.id,
    sender: 'customer',
    content: messageText,
    timestamp: new Date(),
  });
  
  // Check if bot should respond
  if (conversation.isHandedOff) {
    return; // Human is handling
  }
  
  // Get store settings
  const settings = await db.query.storeSettings.findFirst();
  
  if (settings?.botMode === 'human_only') {
    return; // Bot disabled
  }
  
  // Check for hostile sentiment
  if (sentiment.sentiment === 'hostile') {
    await broadcast.handoffRequested({
      conversationId: conversation.id,
      customerName: customer.name || 'عميل',
      reason: 'عميل غاضب',
      sentiment: 'hostile',
    });
    return;
  }
  
  // Generate AI response
  const products = await db.query.products.findMany({
    where: eq(schema.products.isActive, true),
    limit: 20,
  });
  
  const aiResponse = await generateSalesResponse(messageText, {
    storeName: settings?.storeName || 'المتجر',
    personality: (settings?.botPersonality as any) || 'friendly',
    language: (settings?.defaultLanguage as any) || 'ar_EG',
    customerName: customer.name || undefined,
    customerSegment: customer.segment || undefined,
    maxDiscountPercent: settings?.maxDiscountPercent || 15,
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      nameAr: p.nameAr || undefined,
      price: p.price,
      description: p.description || undefined,
      salesPitch: p.salesPitch || undefined,
      stock: p.stock || 0,
    })),
  });
  
  // Check if handoff needed
  if (aiResponse.shouldHandoff) {
    await db.update(schema.conversations)
      .set({ isHandedOff: true })
      .where(eq(schema.conversations.id, conversation.id));
    
    await broadcast.handoffRequested({
      conversationId: conversation.id,
      customerName: customer.name || 'عميل',
      reason: aiResponse.handoffReason || 'Bot requested handoff',
      sentiment: aiResponse.sentiment,
    });
    
    return;
  }
  
  // Save bot response
  await db.insert(schema.messages)
    .values({
      conversationId: conversation.id,
      sender: 'bot',
      content: aiResponse.message,
      contentType: 'text',
      quickReplies: aiResponse.quickReplies,
      sentiment: aiResponse.sentiment,
    })
    .returning();
  
  // Send via WhatsApp API
  await sendWhatsAppMessage(
    whatsappId,
    aiResponse.message,
    credentials,
    aiResponse.quickReplies
  );
  
  // Update conversation stats
  await db.update(schema.conversations)
    .set({
      botMessageCount: (conversation.botMessageCount || 0) + 1,
      intent: aiResponse.intent,
    })
    .where(eq(schema.conversations.id, conversation.id));
}

// ─────────────────────────────────────────────────────────────────────────────────
// Send WhatsApp Message
// ─────────────────────────────────────────────────────────────────────────────────

async function sendWhatsAppMessage(
  to: string,
  message: string,
  credentials: any,
  quickReplies?: string[]
) {
  const url = `https://graph.facebook.com/v18.0/${credentials.phoneNumberId}/messages`;
  
  let body: any = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { body: message },
  };
  
  // Add quick replies as buttons if available
  if (quickReplies && quickReplies.length > 0 && quickReplies.length <= 3) {
    body = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'interactive',
      interactive: {
        type: 'button',
        body: { text: message },
        action: {
          buttons: quickReplies.map((reply, i) => ({
            type: 'reply',
            reply: {
              id: `reply_${i}`,
              title: reply.substring(0, 20),
            },
          })),
        },
      },
    };
  }
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${credentials.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('WhatsApp send error:', error);
    }
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
}
