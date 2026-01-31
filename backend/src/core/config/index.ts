// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Core Configuration
// ═══════════════════════════════════════════════════════════════════════════════
// © 2025-2026 IDRISIUM Corp. All rights reserved.
// Author: Idris Ghamid (إدريس غامد)
// ═══════════════════════════════════════════════════════════════════════════════

import 'dotenv/config';
import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────────
// Environment Schema Validation
// ─────────────────────────────────────────────────────────────────────────────────

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  
  // AI Engine
  GEMINI_API_KEY: z.string().min(1),
  GEMINI_MODEL_PRO: z.string().default('gemini-2.5-pro'),
  GEMINI_MODEL_FLASH: z.string().default('gemini-2.5-flash'),
  
  // Authentication
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('7d'),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string().min(8),
  
  // WhatsApp
  WHATSAPP_PHONE_NUMBER_ID: z.string().optional(),
  WHATSAPP_BUSINESS_ACCOUNT_ID: z.string().optional(),
  WHATSAPP_ACCESS_TOKEN: z.string().optional(),
  WHATSAPP_WEBHOOK_VERIFY_TOKEN: z.string().optional(),
  WHATSAPP_APP_SECRET: z.string().optional(),
  
  // Telegram
  TELEGRAM_BOT_TOKEN: z.string().optional(),
  TELEGRAM_WEBHOOK_SECRET: z.string().optional(),
  
  // Facebook
  FACEBOOK_PAGE_ACCESS_TOKEN: z.string().optional(),
  FACEBOOK_APP_SECRET: z.string().optional(),
  FACEBOOK_VERIFY_TOKEN: z.string().optional(),
  
  // Instagram
  INSTAGRAM_ACCESS_TOKEN: z.string().optional(),
  INSTAGRAM_BUSINESS_ACCOUNT_ID: z.string().optional(),
  
  // Paymob
  PAYMOB_API_KEY: z.string().optional(),
  PAYMOB_SECRET_KEY: z.string().optional(),
  PAYMOB_HMAC_SECRET: z.string().optional(),
  PAYMOB_INTEGRATION_ID: z.string().optional(),
  
  // Fawry
  FAWRY_MERCHANT_CODE: z.string().optional(),
  FAWRY_SECURITY_KEY: z.string().optional(),
  FAWRY_ENV: z.enum(['sandbox', 'production']).default('sandbox'),
  
  // Pusher
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_KEY: z.string().optional(),
  PUSHER_SECRET: z.string().optional(),
  PUSHER_CLUSTER: z.string().default('eu'),
  
  // Server
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform(Number).default('3001'),
  FRONTEND_URL: z.string().url().default('http://localhost:3000'),
  API_URL: z.string().url().default('http://localhost:3001'),
});

// Parse and validate environment
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:');
      error.errors.forEach((err) => {
        console.error(`   - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

export const env = parseEnv();

// ─────────────────────────────────────────────────────────────────────────────────
// Application Constants
// ─────────────────────────────────────────────────────────────────────────────────

export const APP_CONFIG = {
  name: 'Apex Sales Neural Engine',
  version: '1.0.0',
  company: 'IDRISIUM Corp',
  author: {
    name: 'Idris Ghamid',
    nameArabic: 'إدريس غامد',
    email: 'idris.ghamid@gmail.com',
    telegram: '@IDRV72',
    tiktok: '@idris.ghamid',
    instagram: '@idris.ghamid',
    website: 'http://idrisium.linkpc.net/',
    github: 'https://github.com/IDRISIUM',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Bot Personality Modes
// ─────────────────────────────────────────────────────────────────────────────────

export const BOT_PERSONALITIES = {
  professional: {
    name: 'Professional',
    nameAr: 'محترف',
    tone: 'formal, respectful, efficient',
    emoji: false,
  },
  friendly: {
    name: 'Friendly',
    nameAr: 'ودود',
    tone: 'warm, casual, helpful',
    emoji: true,
  },
  witty: {
    name: 'Witty',
    nameAr: 'ذكي',
    tone: 'clever, humorous, engaging',
    emoji: true,
  },
  urgent: {
    name: 'Urgent',
    nameAr: 'عاجل',
    tone: 'direct, time-sensitive, action-oriented',
    emoji: false,
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Supported Languages & Dialects
// ─────────────────────────────────────────────────────────────────────────────────

export const LANGUAGES = {
  ar_EG: { name: 'Egyptian Arabic', nativeName: 'مصري', rtl: true },
  ar_SA: { name: 'Saudi Arabic', nativeName: 'سعودي', rtl: true },
  ar_AE: { name: 'Gulf Arabic', nativeName: 'خليجي', rtl: true },
  ar_LB: { name: 'Levantine Arabic', nativeName: 'شامي', rtl: true },
  ar: { name: 'Modern Standard Arabic', nativeName: 'العربية الفصحى', rtl: true },
  en: { name: 'English', nativeName: 'English', rtl: false },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Channel Types
// ─────────────────────────────────────────────────────────────────────────────────

export const CHANNELS = {
  whatsapp: {
    id: 'whatsapp',
    name: 'WhatsApp',
    icon: '📱',
    color: '#25D366',
  },
  telegram: {
    id: 'telegram',
    name: 'Telegram',
    icon: '📨',
    color: '#0088CC',
  },
  messenger: {
    id: 'messenger',
    name: 'Messenger',
    icon: '💬',
    color: '#0084FF',
  },
  instagram: {
    id: 'instagram',
    name: 'Instagram',
    icon: '📸',
    color: '#E4405F',
  },
  website: {
    id: 'website',
    name: 'Website Chat',
    icon: '🌐',
    color: '#6366F1',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Customer Segments
// ─────────────────────────────────────────────────────────────────────────────────

export const CUSTOMER_SEGMENTS = {
  vip: {
    id: 'vip',
    name: 'VIP',
    nameAr: 'عميل مميز',
    minSpend: 5000,
    color: '#FFD700',
  },
  loyal: {
    id: 'loyal',
    name: 'Loyal',
    nameAr: 'عميل وفي',
    minOrders: 5,
    color: '#9333EA',
  },
  window_shopper: {
    id: 'window_shopper',
    name: 'Window Shopper',
    nameAr: 'متصفح',
    conversion: 0,
    color: '#6B7280',
  },
  discount_hunter: {
    id: 'discount_hunter',
    name: 'Discount Hunter',
    nameAr: 'باحث عن خصومات',
    discountRate: 0.8,
    color: '#F59E0B',
  },
  high_churn_risk: {
    id: 'high_churn_risk',
    name: 'High Churn Risk',
    nameAr: 'خطر الفقد',
    inactiveDays: 30,
    color: '#EF4444',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Order Statuses
// ─────────────────────────────────────────────────────────────────────────────────

export const ORDER_STATUSES = {
  pending: { id: 'pending', name: 'Pending', nameAr: 'معلق', color: '#F59E0B' },
  confirmed: { id: 'confirmed', name: 'Confirmed', nameAr: 'مؤكد', color: '#3B82F6' },
  processing: { id: 'processing', name: 'Processing', nameAr: 'قيد التنفيذ', color: '#8B5CF6' },
  shipped: { id: 'shipped', name: 'Shipped', nameAr: 'تم الشحن', color: '#06B6D4' },
  delivered: { id: 'delivered', name: 'Delivered', nameAr: 'تم التوصيل', color: '#10B981' },
  cancelled: { id: 'cancelled', name: 'Cancelled', nameAr: 'ملغي', color: '#EF4444' },
  refunded: { id: 'refunded', name: 'Refunded', nameAr: 'مسترد', color: '#6B7280' },
} as const;

// ─────────────────────────────────────────────────────────────────────────────────
// Payment Methods
// ─────────────────────────────────────────────────────────────────────────────────

export const PAYMENT_METHODS = {
  cod: { id: 'cod', name: 'Cash on Delivery', nameAr: 'الدفع عند الاستلام', icon: '💵' },
  card: { id: 'card', name: 'Credit/Debit Card', nameAr: 'بطاقة ائتمان', icon: '💳' },
  wallet: { id: 'wallet', name: 'Mobile Wallet', nameAr: 'محفظة إلكترونية', icon: '📲' },
  instapay: { id: 'instapay', name: 'InstaPay', nameAr: 'انستاباي', icon: '🏦' },
  fawry: { id: 'fawry', name: 'Fawry', nameAr: 'فوري', icon: '🎫' },
} as const;

export type EnvConfig = typeof env;
export type BotPersonality = keyof typeof BOT_PERSONALITIES;
export type Language = keyof typeof LANGUAGES;
export type Channel = keyof typeof CHANNELS;
export type CustomerSegment = keyof typeof CUSTOMER_SEGMENTS;
export type OrderStatus = keyof typeof ORDER_STATUSES;
export type PaymentMethod = keyof typeof PAYMENT_METHODS;
