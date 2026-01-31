// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Facebook Messenger Webhook
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';

import { db, schema } from '../../database/index.js';
import { generateSalesResponse } from '../../core/ai/gemini-engine.js';
import { broadcast } from '../../core/realtime/pusher.js';

export const messengerWebhook = new Hono();

// Webhook Verification
messengerWebhook.get('/', async (c) => {
  const mode = c.req.query('hub.mode');
  const token = c.req.query('hub.verify_token');
  const challenge = c.req.query('hub.challenge');
  
  const connection = await db.query.channelConnections.findFirst({
    where: eq(schema.channelConnections.channel, 'messenger'),
  });
  
  const verifyToken = (connection?.credentials as any)?.verifyToken || 'apex-sales-verify';
  
  if (mode === 'subscribe' && token === verifyToken) {
    if (connection) {
      await db.update(schema.channelConnections)
        .set({ webhookStatus: 'active', isConnected: true })
        .where(eq(schema.channelConnections.id, connection.id));
    }
    return c.text(challenge || '');
  }
  
  return c.text('Forbidden', 403);
});

// Webhook Handler
messengerWebhook.post('/', async (c) => {
  try {
    const body = await c.req.json();
    
    const connection = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'messenger'),
    });
    
    if (!connection?.isActive) {
      return c.json({ status: 'inactive' });
    }
    
    const credentials = connection.credentials as any;
    
    // Verify signature
    const signature = c.req.header('x-hub-signature-256');
    if (credentials.appSecret && signature) {
      const expected = 'sha256=' + crypto
        .createHmac('sha256', credentials.appSecret)
        .update(JSON.stringify(body))
        .digest('hex');
      
      if (signature !== expected) {
        return c.json({ error: 'Invalid signature' }, 401);
      }
    }
    
    // Process entries
    if (body.entry) {
      for (const entry of body.entry) {
        for (const event of entry.messaging || []) {
          if (event.message) {
            await processMessengerMessage(event, credentials);
          }
        }
      }
    }
    
    return c.json({ status: 'ok' });
  } catch (error) {
    console.error('Messenger webhook error:', error);
    return c.json({ status: 'error' }, 500);
  }
});

async function processMessengerMessage(event: any, credentials: any) {
  const senderId = event.sender.id;
  const messageText = event.message.text || '';
  
  // Find or create customer
  let customer = await db.query.customers.findFirst({
    where: eq(schema.customers.messengerId, senderId),
  });
  
  if (!customer) {
    // Get profile from Graph API
    let name = 'عميل Messenger';
    try {
      const profileRes = await fetch(
        `https://graph.facebook.com/${senderId}?fields=name&access_token=${credentials.pageAccessToken}`
      );
      const profile = await profileRes.json() as { name?: string };
      if (profile.name) name = profile.name;
    } catch {}
    
    [customer] = await db.insert(schema.customers)
      .values({
        messengerId: senderId,
        name,
        preferredChannel: 'messenger',
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
        channel: 'messenger',
        isActive: true,
        context: { messengerSenderId: senderId },
      })
      .returning();
  }
  
  // Save message
  await db.insert(schema.messages).values({
    conversationId: conversation.id,
    sender: 'customer',
    senderId: customer.id,
    content: messageText,
  });
  
  // Broadcast
  await broadcast.newMessage(conversation.id, {
    id: crypto.randomUUID(),
    sender: 'customer',
    content: messageText,
    timestamp: new Date(),
  });
  
  // Skip if handed off
  if (conversation.isHandedOff) return;
  
  // Generate AI response
  const settings = await db.query.storeSettings.findFirst();
  if (settings?.botMode === 'human_only') return;
  
  const products = await db.query.products.findMany({ limit: 20 });
  
  const aiResponse = await generateSalesResponse(messageText, {
    storeName: settings?.storeName || 'المتجر',
    personality: 'friendly',
    language: 'ar_EG',
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock || 0,
    })),
  });
  
  // Save and send
  await db.insert(schema.messages).values({
    conversationId: conversation.id,
    sender: 'bot',
    content: aiResponse.message,
  });
  
  await sendMessengerMessage(senderId, aiResponse.message, credentials, aiResponse.quickReplies);
}

async function sendMessengerMessage(
  recipientId: string,
  message: string,
  credentials: any,
  quickReplies?: string[]
) {
  const body: any = {
    recipient: { id: recipientId },
    message: { text: message },
  };
  
  if (quickReplies && quickReplies.length > 0) {
    body.message.quick_replies = quickReplies.map(reply => ({
      content_type: 'text',
      title: reply.substring(0, 20),
      payload: reply,
    }));
  }
  
  try {
    await fetch(
      `https://graph.facebook.com/v18.0/me/messages?access_token=${credentials.pageAccessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );
  } catch (error) {
    console.error('Messenger send error:', error);
  }
}
