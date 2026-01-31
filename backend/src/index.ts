// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Main Server Entry Point
// ═══════════════════════════════════════════════════════════════════════════════
// © 2025-2026 IDRISIUM Corp. All rights reserved.
// Author: Idris Ghamid (إدريس غامد)
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { secureHeaders } from 'hono/secure-headers';
import { serve } from '@hono/node-server';

import { env, APP_CONFIG } from './core/config/index.js';
import { initPusher } from './core/realtime/pusher.js';

// API Routes
import { authRoutes } from './api/auth/index.js';
import { dashboardRoutes } from './api/dashboard/index.js';
import { conversationsRoutes } from './api/conversations/index.js';
import { ordersRoutes } from './api/orders/index.js';
import { productsRoutes } from './api/products/index.js';
import { customersRoutes } from './api/customers/index.js';
import { settingsRoutes } from './api/settings/index.js';
import { channelsRoutes } from './api/channels/index.js';
import { analyticsRoutes } from './api/analytics/index.js';
import { trainingRoutes } from './api/training/index.js';

// Webhooks
import { whatsappWebhook } from './api/webhooks/whatsapp.js';
import { telegramWebhook } from './api/webhooks/telegram.js';
import { messengerWebhook } from './api/webhooks/messenger.js';
import { paymobWebhook } from './api/webhooks/paymob.js';

// ─────────────────────────────────────────────────────────────────────────────────
// Initialize App
// ─────────────────────────────────────────────────────────────────────────────────

const app = new Hono();

// ─────────────────────────────────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────────────────────────────────

// CORS
app.use('*', cors({
  origin: [env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Security headers
app.use('*', secureHeaders());

// Logger (development only)
if (env.NODE_ENV === 'development') {
  app.use('*', logger());
}

// Pretty JSON (development only)
if (env.NODE_ENV === 'development') {
  app.use('*', prettyJSON());
}

// ─────────────────────────────────────────────────────────────────────────────────
// Health Check
// ─────────────────────────────────────────────────────────────────────────────────

app.get('/', (c) => {
  return c.json({
    name: APP_CONFIG.name,
    version: APP_CONFIG.version,
    company: APP_CONFIG.company,
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─────────────────────────────────────────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────────────────────────────────────────

// Mount all API routes under /api/v1
const api = new Hono();

api.route('/auth', authRoutes);
api.route('/dashboard', dashboardRoutes);
api.route('/conversations', conversationsRoutes);
api.route('/orders', ordersRoutes);
api.route('/products', productsRoutes);
api.route('/customers', customersRoutes);
api.route('/settings', settingsRoutes);
api.route('/channels', channelsRoutes);
api.route('/analytics', analyticsRoutes);
api.route('/training', trainingRoutes);

app.route('/api/v1', api);

// ─────────────────────────────────────────────────────────────────────────────────
// Webhooks (No auth required)
// ─────────────────────────────────────────────────────────────────────────────────

app.route('/webhooks/whatsapp', whatsappWebhook);
app.route('/webhooks/telegram', telegramWebhook);
app.route('/webhooks/messenger', messengerWebhook);
app.route('/webhooks/paymob', paymobWebhook);

// ─────────────────────────────────────────────────────────────────────────────────
// Error Handling
// ─────────────────────────────────────────────────────────────────────────────────

app.notFound((c) => {
  return c.json({
    success: false,
    error: 'Not Found',
    message: `Route ${c.req.path} not found`,
  }, 404);
});

app.onError((err, c) => {
  console.error('Server Error:', err);
  
  return c.json({
    success: false,
    error: 'Internal Server Error',
    message: env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  }, 500);
});

// ─────────────────────────────────────────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────────────────────────────────────────

const startServer = async () => {
  // Initialize Pusher
  initPusher();
  
  // Start server
  const port = env.PORT;
  
  console.log(`
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║   🚀 ${APP_CONFIG.name}                                      ║
║   Version: ${APP_CONFIG.version}                                                         ║
║   Company: ${APP_CONFIG.company}                                                    ║
║                                                                               ║
║   Server running on http://localhost:${port}                                   ║
║   Environment: ${env.NODE_ENV}                                                  ║
║                                                                               ║
║   Author: ${APP_CONFIG.author.name} (${APP_CONFIG.author.nameArabic})                                    ║
║   Email: ${APP_CONFIG.author.email}                                  ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
  `);
  
  serve({
    fetch: app.fetch,
    port,
  });
};

// Run if not in Vercel (local development)
if (env.NODE_ENV !== 'production') {
  startServer();
}

// Export for Vercel
export default app;
