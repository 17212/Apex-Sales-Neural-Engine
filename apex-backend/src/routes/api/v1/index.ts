import { Router } from 'express';
import { authMiddleware } from '../../../middleware/auth.middleware.js';
import * as authController from '../../../controllers/auth.controller.js';
import * as chatController from '../../../controllers/chat.controller.js';
import * as analyticsController from '../../../controllers/analytics.controller.js';

const router = Router();

// ============================================
// Health check
// ============================================
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    data: { 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    }
  });
});

// ============================================
// Authentication Routes (Public)
// ============================================
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// ============================================
// Protected Routes
// ============================================
router.use(authMiddleware);

// Auth
router.get('/auth/profile', authController.getProfile);
router.post('/auth/logout', authController.logout);

// Chat
router.post('/chat/send', chatController.sendMessage);
router.get('/chat/conversations', chatController.getConversations);
router.get('/chat/conversations/:id', chatController.getConversation);
router.post('/chat/conversations/:id/handoff', chatController.handoffToHuman);

// Analytics
router.get('/analytics/dashboard', analyticsController.getDashboardMetrics);
router.get('/analytics/revenue', analyticsController.getRevenueData);
router.get('/analytics/pulse', analyticsController.getPulseFeed);

export default router;
