import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { initializeSocket } from './socket/index.js';
import apiRoutes from './routes/api/v1/index.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.middleware.js';
import { rateLimiter } from './middleware/rate-limiter.middleware.js';
import { RATE_LIMIT, APP_CONFIG, IDRISIUM } from './config/constants.js';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Store io instance for use in controllers
app.set('io', io);

// ============================================
// Middleware
// ============================================

// CORS
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use('/api', rateLimiter({
  windowMs: RATE_LIMIT.windowMs,
  maxRequests: RATE_LIMIT.maxRequests,
}));

// ============================================
// Routes
// ============================================

// API v1
app.use('/api/v1', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    data: {
      name: APP_CONFIG.name,
      version: APP_CONFIG.version,
      description: APP_CONFIG.description,
      endpoints: {
        api: '/api/v1',
        health: '/api/v1/health',
        docs: '/api/v1/docs',
      },
      branding: {
        company: 'IDRISIUM Corp',
        founder: IDRISIUM.founder,
        website: IDRISIUM.website,
      },
    },
  });
});

// ============================================
// Error Handling
// ============================================

app.use(notFoundHandler);
app.use(errorHandler);

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 3001;

httpServer.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║         🧠 Apex Sales Neural Engine - Backend            ║
╠══════════════════════════════════════════════════════════╣
║  Server running on port ${PORT}                            ║
║  Environment: ${process.env.NODE_ENV || 'development'}                          ║
╠══════════════════════════════════════════════════════════╣
║  Endpoints:                                              ║
║  • API:    http://localhost:${PORT}/api/v1                 ║
║  • Health: http://localhost:${PORT}/api/v1/health          ║
║  • Socket: ws://localhost:${PORT}                          ║
╠══════════════════════════════════════════════════════════╣
║  🌟 IDRISIUM Corp - ${IDRISIUM.founder}                   ║
╚══════════════════════════════════════════════════════════╝
  `);
});

export { app, io };
