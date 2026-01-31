// Application Constants

export const APP_CONFIG = {
  name: 'Apex Sales Neural Engine',
  version: '1.0.0',
  description: 'AI-Powered E-Commerce Sales Automation',
} as const;

// JWT Configuration
export const JWT_CONFIG = {
  secret: process.env.JWT_SECRET || 'fallback-secret-change-in-production',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshExpiresIn: '30d',
} as const;

// Pagination defaults
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

// AI Configuration
export const AI_CONFIG = {
  defaultModel: 'flash' as const,
  defaultPersona: 'professional' as const,
  maxConversationHistory: 50, // messages to keep in context
  confidenceThreshold: 0.6, // below this, escalate to human
  sentimentEscalationThreshold: -0.5, // negative sentiment threshold
} as const;

// Rate Limiting
export const RATE_LIMIT = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  aiMaxRequests: 30, // AI endpoints are more expensive
} as const;

// Order Configuration
export const ORDER_CONFIG = {
  orderNumberPrefix: 'APX',
  vatRate: 0.14, // 14% Egyptian VAT
  defaultCurrency: 'EGP',
} as const;

// Loyalty Configuration
export const LOYALTY_CONFIG = {
  pointsPerPound: 1, // 1 point per 1 EGP spent
  tiers: {
    BRONZE: { minPoints: 0, discount: 0 },
    SILVER: { minPoints: 1000, discount: 0.05 },
    GOLD: { minPoints: 5000, discount: 0.10 },
    PLATINUM: { minPoints: 15000, discount: 0.15 },
  },
} as const;

// Channel Configuration
export const CHANNELS = {
  WEB: { name: 'Web Chat', icon: '💬' },
  WHATSAPP: { name: 'WhatsApp', icon: '📱' },
  TELEGRAM: { name: 'Telegram', icon: '✈️' },
  INSTAGRAM: { name: 'Instagram', icon: '📸' },
  MESSENGER: { name: 'Messenger', icon: '💭' },
} as const;

// IDRISIUM Branding
export const IDRISIUM = {
  founder: 'Idris Ghamid',
  founderArabic: 'إدريس غامد',
  email: 'idris.ghamid@gmail.com',
  tiktok: '@idris.ghamid',
  instagram: '@idris.ghamid',
  telegram: '@IDRV72',
  website: 'http://idrisium.linkpc.net/',
  github: 'https://github.com/IDRISIUM',
} as const;
