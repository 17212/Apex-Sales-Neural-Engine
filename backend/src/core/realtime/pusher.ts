// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Real-time Service (Pusher)
// ═══════════════════════════════════════════════════════════════════════════════

import Pusher from 'pusher';
import { env } from '../config/index.js';

// ─────────────────────────────────────────────────────────────────────────────────
// Initialize Pusher
// ─────────────────────────────────────────────────────────────────────────────────

let pusher: Pusher | null = null;

export const initPusher = () => {
  if (!env.PUSHER_APP_ID || !env.PUSHER_KEY || !env.PUSHER_SECRET) {
    console.warn('⚠️ Pusher not configured - real-time features disabled');
    return null;
  }
  
  pusher = new Pusher({
    appId: env.PUSHER_APP_ID,
    key: env.PUSHER_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.PUSHER_CLUSTER,
    useTLS: true,
  });
  
  console.log('✅ Pusher initialized');
  return pusher;
};

// ─────────────────────────────────────────────────────────────────────────────────
// Channel Names
// ─────────────────────────────────────────────────────────────────────────────────

export const CHANNELS = {
  // Dashboard channels
  dashboard: 'dashboard',
  inbox: 'inbox',
  orders: 'orders',
  analytics: 'analytics',
  
  // Private channels
  privateConversation: (id: string) => `private-conversation-${id}`,
  privateCustomer: (id: string) => `private-customer-${id}`,
};

// ─────────────────────────────────────────────────────────────────────────────────
// Event Types
// ─────────────────────────────────────────────────────────────────────────────────

export const EVENTS = {
  // Messages
  NEW_MESSAGE: 'new-message',
  MESSAGE_READ: 'message-read',
  TYPING: 'typing',
  
  // Orders
  NEW_ORDER: 'new-order',
  ORDER_UPDATED: 'order-updated',
  
  // Conversations
  NEW_CONVERSATION: 'new-conversation',
  CONVERSATION_UPDATED: 'conversation-updated',
  HANDOFF_REQUESTED: 'handoff-requested',
  
  // Analytics
  METRICS_UPDATED: 'metrics-updated',
  ALERT: 'alert',
  
  // System
  BOT_STATUS_CHANGED: 'bot-status-changed',
};

// ─────────────────────────────────────────────────────────────────────────────────
// Broadcasting Functions
// ─────────────────────────────────────────────────────────────────────────────────

export const broadcast = {
  // Send new message notification
  newMessage: async (conversationId: string, message: {
    id: string;
    sender: string;
    content: string;
    timestamp: Date;
  }) => {
    await pusher?.trigger(CHANNELS.inbox, EVENTS.NEW_MESSAGE, {
      conversationId,
      message,
    });
    await pusher?.trigger(
      CHANNELS.privateConversation(conversationId),
      EVENTS.NEW_MESSAGE,
      message
    );
  },
  
  // Send new order notification
  newOrder: async (order: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    channel: string;
  }) => {
    await pusher?.trigger(CHANNELS.orders, EVENTS.NEW_ORDER, order);
    await pusher?.trigger(CHANNELS.dashboard, EVENTS.NEW_ORDER, {
      id: order.id,
      total: order.total,
    });
  },
  
  // Update order status
  orderUpdated: async (order: {
    id: string;
    status: string;
    updatedAt: Date;
  }) => {
    await pusher?.trigger(CHANNELS.orders, EVENTS.ORDER_UPDATED, order);
  },
  
  // New conversation started
  newConversation: async (conversation: {
    id: string;
    customerName: string;
    channel: string;
    preview: string;
  }) => {
    await pusher?.trigger(CHANNELS.inbox, EVENTS.NEW_CONVERSATION, conversation);
  },
  
  // Handoff to human requested
  handoffRequested: async (data: {
    conversationId: string;
    customerName: string;
    reason: string;
    sentiment: string;
  }) => {
    await pusher?.trigger(CHANNELS.inbox, EVENTS.HANDOFF_REQUESTED, data);
    // Also send alert to dashboard
    await pusher?.trigger(CHANNELS.dashboard, EVENTS.ALERT, {
      type: 'handoff',
      title: 'تحويل لموظف مطلوب',
      message: `${data.customerName}: ${data.reason}`,
      severity: data.sentiment === 'hostile' ? 'critical' : 'warning',
    });
  },
  
  // Update real-time metrics
  metricsUpdated: async (metrics: {
    totalRevenue: number;
    ordersToday: number;
    activeConversations: number;
    conversionRate: number;
  }) => {
    await pusher?.trigger(CHANNELS.dashboard, EVENTS.METRICS_UPDATED, metrics);
  },
  
  // System alert
  alert: async (alert: {
    type: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
  }) => {
    await pusher?.trigger(CHANNELS.dashboard, EVENTS.ALERT, alert);
  },
  
  // Bot status changed
  botStatusChanged: async (status: {
    mode: string;
    personality: string;
    updatedBy: string;
  }) => {
    await pusher?.trigger(CHANNELS.dashboard, EVENTS.BOT_STATUS_CHANGED, status);
  },
};

export { pusher };
