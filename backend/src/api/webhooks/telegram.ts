// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Telegram Webhook Handler
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { eq } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { generateSalesResponse, analyzeSentiment } from '../../core/ai/gemini-engine.js';
import { broadcast } from '../../core/realtime/pusher.js';

export const telegramWebhook = new Hono();

// ─────────────────────────────────────────────────────────────────────────────────
// Webhook Handler
// ─────────────────────────────────────────────────────────────────────────────────

telegramWebhook.post('/', async (c) => {
  try {
    const update = await c.req.json();
    
    // Get credentials
    const connection = await db.query.channelConnections.findFirst({
      where: eq(schema.channelConnections.channel, 'telegram'),
    });
    
    if (!connection?.isActive) {
      return c.json({ ok: true });
    }
    
    const credentials = connection.credentials as any;
    
    // Verify secret token if set
    const secretToken = c.req.header('X-Telegram-Bot-Api-Secret-Token');
    if (credentials.webhookSecret && secretToken !== credentials.webhookSecret) {
      return c.json({ ok: false }, 401);
    }
    
    // Handle message
    if (update.message) {
      await processTelegramMessage(update.message, credentials);
    }
    
    // Handle callback query (button clicks)
    if (update.callback_query) {
      await handleCallbackQuery(update.callback_query, credentials);
    }
    
    // Update stats
    await db.update(schema.channelConnections)
      .set({
        totalMessages: (connection.totalMessages || 0) + 1,
        lastMessageAt: new Date(),
      })
      .where(eq(schema.channelConnections.id, connection.id));
    
    return c.json({ ok: true });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    return c.json({ ok: true }); // Always return ok to prevent retries
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Process Telegram Message
// ─────────────────────────────────────────────────────────────────────────────────

async function processTelegramMessage(message: any, credentials: any) {
  const telegramId = String(message.from.id);
  const chatId = String(message.chat.id);
  const messageText = message.text || '';
  
  // Find or create customer
  let customer = await db.query.customers.findFirst({
    where: eq(schema.customers.telegramId, telegramId),
  });
  
  if (!customer) {
    const name = [message.from.first_name, message.from.last_name]
      .filter(Boolean)
      .join(' ') || 'عميل Telegram';
    
    [customer] = await db.insert(schema.customers)
      .values({
        telegramId,
        name,
        preferredChannel: 'telegram',
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
        channel: 'telegram',
        isActive: true,
        context: { preferences: { telegramChatId: chatId } },
      })
      .returning();
    
    await broadcast.newConversation({
      id: conversation.id,
      customerName: customer.name || 'عميل',
      channel: 'telegram',
      preview: messageText.substring(0, 50),
    });
  }
  
  // Save message
  const [savedMessage] = await db.insert(schema.messages)
    .values({
      conversationId: conversation.id,
      sender: 'customer',
      senderId: customer.id,
      content: messageText,
      contentType: message.photo ? 'image' : message.voice ? 'audio' : 'text',
      externalId: String(message.message_id),
      isVoiceNote: !!message.voice,
    })
    .returning();
  
  // Analyze and update
  const sentiment = await analyzeSentiment(messageText);
  
  await db.update(schema.conversations)
    .set({
      lastMessageAt: new Date(),
      messageCount: (conversation.messageCount || 0) + 1,
      sentiment: sentiment.sentiment,
    })
    .where(eq(schema.conversations.id, conversation.id));
  
  await broadcast.newMessage(conversation.id, {
    id: savedMessage.id,
    sender: 'customer',
    content: messageText,
    timestamp: new Date(),
  });
  
  // Check handoff
  if (conversation.isHandedOff) return;
  
  // Get settings
  const settings = await db.query.storeSettings.findFirst();
  if (settings?.botMode === 'human_only') return;
  
  // Generate response
  const products = await db.query.products.findMany({
    where: eq(schema.products.isActive, true),
    limit: 20,
  });
  
  const aiResponse = await generateSalesResponse(messageText, {
    storeName: settings?.storeName || 'المتجر',
    personality: (settings?.botPersonality as any) || 'friendly',
    language: 'ar_EG',
    customerName: customer.name || undefined,
    products: products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock || 0,
    })),
  });
  
  // Save and send response
  await db.insert(schema.messages).values({
    conversationId: conversation.id,
    sender: 'bot',
    content: aiResponse.message,
    quickReplies: aiResponse.quickReplies,
  });
  
  await sendTelegramMessage(chatId, aiResponse.message, credentials, aiResponse.quickReplies);
}

// ─────────────────────────────────────────────────────────────────────────────────
// Handle Callback Query (Button Clicks)
// ─────────────────────────────────────────────────────────────────────────────────

async function handleCallbackQuery(query: any, credentials: any) {
  const chatId = String(query.message.chat.id);
  const data = query.data;
  
  // Answer callback to remove loading
  await fetch(`https://api.telegram.org/bot${credentials.botToken}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: query.id }),
  });
  
  // Process as normal message
  await processTelegramMessage(
    { ...query.message, text: data, from: query.from },
    credentials
  );
}

// ─────────────────────────────────────────────────────────────────────────────────
// Send Telegram Message
// ─────────────────────────────────────────────────────────────────────────────────

async function sendTelegramMessage(
  chatId: string,
  message: string,
  credentials: any,
  quickReplies?: string[]
) {
  const url = `https://api.telegram.org/bot${credentials.botToken}/sendMessage`;
  
  const body: any = {
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML',
  };
  
  // Add inline keyboard for quick replies
  if (quickReplies && quickReplies.length > 0) {
    body.reply_markup = {
      inline_keyboard: quickReplies.map(reply => [{
        text: reply,
        callback_data: reply,
      }]),
    };
  }
  
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.error('Failed to send Telegram message:', error);
  }
}
