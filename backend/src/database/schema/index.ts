// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Database Schema
// ═══════════════════════════════════════════════════════════════════════════════
// © 2025-2026 IDRISIUM Corp. All rights reserved.
// ═══════════════════════════════════════════════════════════════════════════════

import { 
  pgTable, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  real,
  jsonb,
  uuid,
  pgEnum,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

// ─────────────────────────────────────────────────────────────────────────────────
// Enums
// ─────────────────────────────────────────────────────────────────────────────────

export const channelEnum = pgEnum('channel', [
  'whatsapp', 'telegram', 'messenger', 'instagram', 'website'
]);

export const orderStatusEnum = pgEnum('order_status', [
  'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'cod', 'card', 'wallet', 'instapay', 'fawry'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending', 'paid', 'failed', 'refunded'
]);

export const customerSegmentEnum = pgEnum('customer_segment', [
  'vip', 'loyal', 'window_shopper', 'discount_hunter', 'high_churn_risk', 'new'
]);

export const sentimentEnum = pgEnum('sentiment', [
  'positive', 'neutral', 'negative', 'hostile'
]);

export const intentEnum = pgEnum('intent', [
  'browsing', 'comparing', 'ready_to_buy', 'support_needed', 'complaint', 'inquiry',
  'greeting', 'farewell', 'price_objection', 'shipping_inquiry', 'return_request'
]);

export const botModeEnum = pgEnum('bot_mode', [
  'active', 'vacation', 'human_only', 'suggestions_only'
]);

export const personalityEnum = pgEnum('personality', [
  'professional', 'friendly', 'witty', 'urgent'
]);

// ─────────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ─────────────────────────────────────────────────────────────────────────────────

const timestamps = {
  createdAt: timestamp('created_at', { withTimezone: true, precision: 3 }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true, precision: 3 }).defaultNow().notNull(),
};

// ─────────────────────────────────────────────────────────────────────────────────
// Admin Users Table
// ─────────────────────────────────────────────────────────────────────────────────

export const adminUsers = pgTable('admin_users', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  avatar: text('avatar'),
  role: text('role').notNull().default('admin'), // owner, admin, support_agent
  isActive: boolean('is_active').default(true),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  ...timestamps,
}, (table) => ({
  emailIdx: uniqueIndex('admin_email_idx').on(table.email),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Store Settings Table
// ─────────────────────────────────────────────────────────────────────────────────

export const storeSettings = pgTable('store_settings', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  storeName: text('store_name').notNull(),
  storeNameAr: text('store_name_ar'),
  logo: text('logo'),
  description: text('description'),
  currency: text('currency').default('EGP'),
  timezone: text('timezone').default('Africa/Cairo'),
  defaultLanguage: text('default_language').default('ar_EG'),
  
  // Bot Settings
  botMode: botModeEnum('bot_mode').default('active'),
  botPersonality: personalityEnum('bot_personality').default('friendly'),
  botName: text('bot_name').default('مساعد المبيعات'),
  maxDiscountPercent: integer('max_discount_percent').default(15),
  autoFollowUpHours: integer('auto_follow_up_hours').default(24),
  workingHoursStart: text('working_hours_start').default('09:00'),
  workingHoursEnd: text('working_hours_end').default('22:00'),
  
  // Business Info
  businessPhone: text('business_phone'),
  businessEmail: text('business_email'),
  businessAddress: text('business_address'),
  vatNumber: text('vat_number'),
  vatRate: real('vat_rate').default(14), // 14% VAT in Egypt
  
  // Social Links
  facebookUrl: text('facebook_url'),
  instagramUrl: text('instagram_url'),
  twitterUrl: text('twitter_url'),
  tiktokUrl: text('tiktok_url'),
  
  ...timestamps,
});

// ─────────────────────────────────────────────────────────────────────────────────
// Channel Connections Table (يتم إضافتها يدوياً من الموقع)
// ─────────────────────────────────────────────────────────────────────────────────

export const channelConnections = pgTable('channel_connections', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  channel: channelEnum('channel').notNull(),
  isActive: boolean('is_active').default(false),
  isConnected: boolean('is_connected').default(false),
  
  // Connection Credentials (يتم إدخالها يدوياً)
  credentials: jsonb('credentials').$type<{
    // WhatsApp
    phoneNumberId?: string;
    businessAccountId?: string;
    accessToken?: string;
    webhookVerifyToken?: string;
    appSecret?: string;
    // Telegram
    botToken?: string;
    webhookSecret?: string;
    // Facebook/Instagram
    pageAccessToken?: string;
    appId?: string;
    pageId?: string;
  }>(),
  
  // Webhook Info
  webhookUrl: text('webhook_url'),
  webhookStatus: text('webhook_status').default('pending'), // pending, active, error
  webhookLastError: text('webhook_last_error'),
  
  // Stats
  totalMessages: integer('total_messages').default(0),
  lastMessageAt: timestamp('last_message_at', { withTimezone: true }),
  
  ...timestamps,
}, (table) => ({
  channelIdx: uniqueIndex('channel_connection_idx').on(table.channel),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Customers Table
// ─────────────────────────────────────────────────────────────────────────────────

export const customers = pgTable('customers', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Identity
  name: text('name'),
  phone: text('phone'),
  email: text('email'),
  avatar: text('avatar'),
  
  // Channel-specific IDs
  whatsappId: text('whatsapp_id'),
  telegramId: text('telegram_id'),
  messengerId: text('messenger_id'),
  instagramId: text('instagram_id'),
  
  // Preferences
  preferredChannel: channelEnum('preferred_channel'),
  preferredLanguage: text('preferred_language').default('ar_EG'),
  timezone: text('timezone'),
  
  // Segmentation
  segment: customerSegmentEnum('segment').default('new'),
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // Analytics
  totalSpend: real('total_spend').default(0),
  totalOrders: integer('total_orders').default(0),
  averageOrderValue: real('average_order_value').default(0),
  lastOrderAt: timestamp('last_order_at', { withTimezone: true }),
  lastActiveAt: timestamp('last_active_at', { withTimezone: true }),
  
  // Loyalty
  loyaltyTier: text('loyalty_tier').default('bronze'), // bronze, silver, gold, platinum
  loyaltyPoints: integer('loyalty_points').default(0),
  walletBalance: real('wallet_balance').default(0),
  
  // Risk Score (for COD validation)
  trustScore: integer('trust_score').default(50), // 0-100
  failedDeliveries: integer('failed_deliveries').default(0),
  
  // Notes
  notes: text('notes'),
  
  ...timestamps,
}, (table) => ({
  phoneIdx: index('customer_phone_idx').on(table.phone),
  whatsappIdx: index('customer_whatsapp_idx').on(table.whatsappId),
  telegramIdx: index('customer_telegram_idx').on(table.telegramId),
  segmentIdx: index('customer_segment_idx').on(table.segment),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Conversations Table
// ─────────────────────────────────────────────────────────────────────────────────

export const conversations = pgTable('conversations', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  customerId: text('customer_id').references(() => customers.id),
  channel: channelEnum('channel').notNull(),
  
  // Status
  isActive: boolean('is_active').default(true),
  isHandedOff: boolean('is_handed_off').default(false),
  handedOffTo: text('handed_off_to').references(() => adminUsers.id),
  handedOffAt: timestamp('handed_off_at', { withTimezone: true }),
  
  // AI Analysis
  sentiment: sentimentEnum('sentiment').default('neutral'),
  sentimentScore: real('sentiment_score').default(0), // -1 to 1
  intent: intentEnum('intent').default('browsing'),
  intentConfidence: real('intent_confidence').default(0), // 0 to 1
  
  // Context
  context: jsonb('context').$type<{
    currentProduct?: string;
    cartItems?: string[];
    lastTopic?: string;
    preferences?: Record<string, unknown>;
  }>(),
  
  // Stats
  messageCount: integer('message_count').default(0),
  botMessageCount: integer('bot_message_count').default(0),
  humanMessageCount: integer('human_message_count').default(0),
  
  // Timestamps
  startedAt: timestamp('started_at', { withTimezone: true }).defaultNow(),
  lastMessageAt: timestamp('last_message_at', { withTimezone: true }),
  closedAt: timestamp('closed_at', { withTimezone: true }),
  
  ...timestamps,
}, (table) => ({
  customerIdx: index('conversation_customer_idx').on(table.customerId),
  channelIdx: index('conversation_channel_idx').on(table.channel),
  activeIdx: index('conversation_active_idx').on(table.isActive),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Messages Table
// ─────────────────────────────────────────────────────────────────────────────────

export const messages = pgTable('messages', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  conversationId: text('conversation_id').references(() => conversations.id).notNull(),
  
  // Sender
  sender: text('sender').notNull(), // 'bot', 'customer', 'admin'
  senderId: text('sender_id'), // customer or admin ID
  
  // Content
  content: text('content').notNull(),
  contentType: text('content_type').default('text'), // text, image, audio, video, document, location
  mediaUrl: text('media_url'),
  
  // Voice Note (transcribed)
  isVoiceNote: boolean('is_voice_note').default(false),
  voiceTranscription: text('voice_transcription'),
  
  // AI Analysis
  sentiment: sentimentEnum('sentiment'),
  sentimentScore: real('sentiment_score'),
  
  // Quick Replies (Bot only)
  quickReplies: jsonb('quick_replies').$type<string[]>(),
  
  // Flutter UI Components
  uiComponents: jsonb('ui_components').$type<{
    type: 'product_carousel' | 'chips' | 'order_card' | 'payment_button';
    data: unknown;
  }[]>(),
  
  // Status
  isRead: boolean('is_read').default(false),
  isDelivered: boolean('is_delivered').default(false),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  readAt: timestamp('read_at', { withTimezone: true }),
  
  // External IDs (for channel sync)
  externalId: text('external_id'),
  
  ...timestamps,
}, (table) => ({
  conversationIdx: index('message_conversation_idx').on(table.conversationId),
  senderIdx: index('message_sender_idx').on(table.sender),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Products Table
// ─────────────────────────────────────────────────────────────────────────────────

export const products = pgTable('products', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Basic Info
  name: text('name').notNull(),
  nameAr: text('name_ar'),
  description: text('description'),
  descriptionAr: text('description_ar'),
  sku: text('sku').unique(),
  
  // Pricing
  price: real('price').notNull(),
  compareAtPrice: real('compare_at_price'), // Original price for discounts
  costPrice: real('cost_price'), // For profit calculation
  
  // Inventory
  stock: integer('stock').default(0),
  lowStockThreshold: integer('low_stock_threshold').default(5),
  trackInventory: boolean('track_inventory').default(true),
  
  // Media
  images: jsonb('images').$type<string[]>().default([]),
  thumbnail: text('thumbnail'),
  
  // Categorization
  category: text('category'),
  tags: jsonb('tags').$type<string[]>().default([]),
  
  // AI Training
  keywords: jsonb('keywords').$type<string[]>().default([]),
  salesPitch: text('sales_pitch'), // Bot will use this
  objectionHandlers: jsonb('objection_handlers').$type<Record<string, string>>(),
  
  // Status
  isActive: boolean('is_active').default(true),
  isFeatured: boolean('is_featured').default(false),
  
  // Stats
  viewCount: integer('view_count').default(0),
  salesCount: integer('sales_count').default(0),
  
  ...timestamps,
}, (table) => ({
  skuIdx: uniqueIndex('product_sku_idx').on(table.sku),
  categoryIdx: index('product_category_idx').on(table.category),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Orders Table
// ─────────────────────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  orderNumber: text('order_number').unique().$defaultFn(() => `ORD-${Date.now()}`),
  customerId: text('customer_id').references(() => customers.id),
  conversationId: text('conversation_id').references(() => conversations.id),
  
  // Status
  status: orderStatusEnum('status').default('pending'),
  
  // Items
  items: jsonb('items').$type<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
    total: number;
  }[]>().notNull(),
  
  // Pricing
  subtotal: real('subtotal').notNull(),
  discount: real('discount').default(0),
  discountCode: text('discount_code'),
  vatAmount: real('vat_amount').default(0),
  shippingCost: real('shipping_cost').default(0),
  total: real('total').notNull(),
  
  // Profit Tracking
  costOfGoods: real('cost_of_goods').default(0),
  netProfit: real('net_profit').default(0),
  
  // Payment
  paymentMethod: paymentMethodEnum('payment_method'),
  paymentStatus: paymentStatusEnum('payment_status').default('pending'),
  paymentId: text('payment_id'), // External payment ID
  paidAt: timestamp('paid_at', { withTimezone: true }),
  
  // Shipping
  shippingAddress: jsonb('shipping_address').$type<{
    name: string;
    phone: string;
    address: string;
    city: string;
    area: string;
    postalCode?: string;
    notes?: string;
    coordinates?: { lat: number; lng: number };
  }>(),
  
  // Courier
  courierId: text('courier_id'),
  courierName: text('courier_name'),
  trackingNumber: text('tracking_number'),
  shippedAt: timestamp('shipped_at', { withTimezone: true }),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  
  // Notes
  customerNotes: text('customer_notes'),
  adminNotes: text('admin_notes'),
  
  // Attribution
  channel: channelEnum('channel'),
  attributedToBot: boolean('attributed_to_bot').default(true),
  
  ...timestamps,
}, (table) => ({
  orderNumberIdx: uniqueIndex('order_number_idx').on(table.orderNumber),
  customerIdx: index('order_customer_idx').on(table.customerId),
  statusIdx: index('order_status_idx').on(table.status),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Abandoned Carts Table
// ─────────────────────────────────────────────────────────────────────────────────

export const abandonedCarts = pgTable('abandoned_carts', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  customerId: text('customer_id').references(() => customers.id),
  conversationId: text('conversation_id').references(() => conversations.id),
  
  // Cart Items
  items: jsonb('items').$type<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[]>().notNull(),
  
  total: real('total').notNull(),
  
  // Recovery
  isRecovered: boolean('is_recovered').default(false),
  recoveredOrderId: text('recovered_order_id').references(() => orders.id),
  
  // Follow-up
  followUpCount: integer('follow_up_count').default(0),
  lastFollowUpAt: timestamp('last_follow_up_at', { withTimezone: true }),
  nextFollowUpAt: timestamp('next_follow_up_at', { withTimezone: true }),
  
  ...timestamps,
}, (table) => ({
  customerIdx: index('cart_customer_idx').on(table.customerId),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Bot Training Data Table
// ─────────────────────────────────────────────────────────────────────────────────

export const botTrainingData = pgTable('bot_training_data', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Content
  type: text('type').notNull(), // faq, product_info, policy, custom_response
  title: text('title').notNull(),
  content: text('content').notNull(),
  contentAr: text('content_ar'),
  
  // Matching
  keywords: jsonb('keywords').$type<string[]>().default([]),
  triggerPhrases: jsonb('trigger_phrases').$type<string[]>().default([]),
  
  // Priority
  priority: integer('priority').default(0), // Higher = checked first
  
  // Status
  isActive: boolean('is_active').default(true),
  
  ...timestamps,
});

// ─────────────────────────────────────────────────────────────────────────────────
// Bot Rules Table (Ironclad Rules)
// ─────────────────────────────────────────────────────────────────────────────────

export const botRules = pgTable('bot_rules', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  name: text('name').notNull(),
  description: text('description'),
  
  // Rule Definition
  ruleType: text('rule_type').notNull(), // max_discount, no_refund, keywords_block, mandatory_response
  condition: jsonb('condition').$type<{
    type: string;
    value: unknown;
  }>().notNull(),
  action: jsonb('action').$type<{
    type: string;
    value: unknown;
  }>().notNull(),
  
  // Priority
  priority: integer('priority').default(0),
  
  // Status
  isActive: boolean('is_active').default(true),
  
  ...timestamps,
});

// ─────────────────────────────────────────────────────────────────────────────────
// Referral System Table
// ─────────────────────────────────────────────────────────────────────────────────

export const referrals = pgTable('referrals', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  referrerId: text('referrer_id').references(() => customers.id).notNull(),
  referredId: text('referred_id').references(() => customers.id),
  
  // Code
  referralCode: text('referral_code').unique().notNull(),
  
  // Status
  status: text('status').default('pending'), // pending, converted, expired
  
  // Rewards
  referrerReward: real('referrer_reward').default(0),
  referredReward: real('referred_reward').default(0),
  rewardType: text('reward_type').default('percentage'), // percentage, fixed
  
  // Stats
  clickCount: integer('click_count').default(0),
  
  // Timestamps
  convertedAt: timestamp('converted_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  
  ...timestamps,
}, (table) => ({
  codeIdx: uniqueIndex('referral_code_idx').on(table.referralCode),
  referrerIdx: index('referral_referrer_idx').on(table.referrerId),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Analytics Events Table
// ─────────────────────────────────────────────────────────────────────────────────

export const analyticsEvents = pgTable('analytics_events', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  
  // Event
  eventType: text('event_type').notNull(), // page_view, add_to_cart, checkout, order, message, etc.
  eventData: jsonb('event_data').$type<Record<string, unknown>>(),
  
  // Attribution
  customerId: text('customer_id').references(() => customers.id),
  sessionId: text('session_id'),
  channel: channelEnum('channel'),
  
  // Timestamps
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
  
  ...timestamps,
}, (table) => ({
  eventTypeIdx: index('analytics_event_type_idx').on(table.eventType),
  customerIdx: index('analytics_customer_idx').on(table.customerId),
  timestampIdx: index('analytics_timestamp_idx').on(table.timestamp),
}));

// ─────────────────────────────────────────────────────────────────────────────────
// Relations
// ─────────────────────────────────────────────────────────────────────────────────

export const customersRelations = relations(customers, ({ many }) => ({
  conversations: many(conversations),
  orders: many(orders),
  referralsMade: many(referrals),
}));

export const conversationsRelations = relations(conversations, ({ one, many }) => ({
  customer: one(customers, {
    fields: [conversations.customerId],
    references: [customers.id],
  }),
  messages: many(messages),
  orders: many(orders),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  conversation: one(conversations, {
    fields: [messages.conversationId],
    references: [conversations.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  customer: one(customers, {
    fields: [orders.customerId],
    references: [customers.id],
  }),
  conversation: one(conversations, {
    fields: [orders.conversationId],
    references: [conversations.id],
  }),
}));

export const referralsRelations = relations(referrals, ({ one }) => ({
  referrer: one(customers, {
    fields: [referrals.referrerId],
    references: [customers.id],
  }),
  referred: one(customers, {
    fields: [referrals.referredId],
    references: [customers.id],
  }),
}));
