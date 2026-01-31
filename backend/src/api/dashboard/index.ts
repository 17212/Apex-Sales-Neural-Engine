// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Dashboard API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { sql, desc, eq, and, gte, count, sum } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const dashboardRoutes = new Hono<AuthContext>();

// Auth required for all routes
dashboardRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get Dashboard Stats
// ─────────────────────────────────────────────────────────────────────────────────

dashboardRoutes.get('/stats', async (c) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    // Get today's orders
    const todayOrders = await db.query.orders.findMany({
      where: gte(schema.orders.createdAt, today),
    });
    
    // Get monthly orders
    const monthlyOrders = await db.query.orders.findMany({
      where: gte(schema.orders.createdAt, thisMonth),
    });
    
    // Active conversations
    const activeConversations = await db.query.conversations.findMany({
      where: eq(schema.conversations.isActive, true),
    });
    
    // Pending orders
    const pendingOrders = await db.query.orders.findMany({
      where: eq(schema.orders.status, 'pending'),
    });
    
    // Calculate metrics
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);
    const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.total, 0);
    const todayProfit = todayOrders.reduce((sum, o) => sum + (o.netProfit || 0), 0);
    
    // Conversion rate (orders / unique conversations this month)
    const monthConversations = await db.query.conversations.findMany({
      where: gte(schema.conversations.createdAt, thisMonth),
    });
    const conversionRate = monthConversations.length > 0
      ? (monthlyOrders.length / monthConversations.length) * 100
      : 0;
    
    // Bot vs Human stats
    const botOrders = monthlyOrders.filter(o => o.attributedToBot).length;
    const humanOrders = monthlyOrders.length - botOrders;
    
    return c.json({
      success: true,
      data: {
        // Today
        todayRevenue,
        todayOrders: todayOrders.length,
        todayProfit,
        
        // Monthly
        monthlyRevenue,
        monthlyOrders: monthlyOrders.length,
        
        // Real-time
        activeConversations: activeConversations.length,
        pendingOrders: pendingOrders.length,
        conversionRate: Math.round(conversionRate * 100) / 100,
        
        // Attribution
        botOrders,
        humanOrders,
        botPercentage: monthlyOrders.length > 0 
          ? Math.round((botOrders / monthlyOrders.length) * 100) 
          : 0,
      },
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return c.json({ success: false, error: 'فشل في جلب الإحصائيات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Recent Activity
// ─────────────────────────────────────────────────────────────────────────────────

dashboardRoutes.get('/activity', async (c) => {
  try {
    // Recent orders
    const recentOrders = await db.query.orders.findMany({
      limit: 5,
      orderBy: [desc(schema.orders.createdAt)],
      with: {
        customer: {
          columns: { name: true, phone: true },
        },
      },
    });
    
    // Recent conversations
    const recentConversations = await db.query.conversations.findMany({
      limit: 5,
      where: eq(schema.conversations.isActive, true),
      orderBy: [desc(schema.conversations.lastMessageAt)],
      with: {
        customer: {
          columns: { name: true, phone: true, avatar: true },
        },
      },
    });
    
    // Handoff requests (conversations needing human)
    const handoffRequests = await db.query.conversations.findMany({
      where: and(
        eq(schema.conversations.isHandedOff, true),
        eq(schema.conversations.isActive, true)
      ),
      limit: 10,
      with: {
        customer: {
          columns: { name: true, phone: true },
        },
      },
    });
    
    return c.json({
      success: true,
      data: {
        recentOrders: recentOrders.map(o => ({
          id: o.id,
          orderNumber: o.orderNumber,
          customer: o.customer?.name || 'عميل',
          total: o.total,
          status: o.status,
          channel: o.channel,
          createdAt: o.createdAt,
        })),
        recentConversations: recentConversations.map(c => ({
          id: c.id,
          customer: c.customer?.name || 'عميل',
          avatar: c.customer?.avatar,
          channel: c.channel,
          sentiment: c.sentiment,
          lastMessageAt: c.lastMessageAt,
        })),
        handoffRequests: handoffRequests.map(h => ({
          id: h.id,
          customer: h.customer?.name || 'عميل',
          sentiment: h.sentiment,
          handedOffAt: h.handedOffAt,
        })),
      },
    });
  } catch (error) {
    console.error('Dashboard activity error:', error);
    return c.json({ success: false, error: 'فشل في جلب النشاط' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Revenue Chart Data
// ─────────────────────────────────────────────────────────────────────────────────

dashboardRoutes.get('/chart/revenue', async (c) => {
  try {
    const days = parseInt(c.req.query('days') || '7');
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const orders = await db.query.orders.findMany({
      where: gte(schema.orders.createdAt, startDate),
      columns: {
        total: true,
        netProfit: true,
        createdAt: true,
      },
    });
    
    // Group by date
    const grouped: Record<string, { revenue: number; profit: number; orders: number }> = {};
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      grouped[key] = { revenue: 0, profit: 0, orders: 0 };
    }
    
    orders.forEach(order => {
      const key = order.createdAt.toISOString().split('T')[0];
      if (grouped[key]) {
        grouped[key].revenue += order.total;
        grouped[key].profit += order.netProfit || 0;
        grouped[key].orders += 1;
      }
    });
    
    const chartData = Object.entries(grouped)
      .map(([date, data]) => ({
        date,
        revenue: data.revenue,
        profit: data.profit,
        orders: data.orders,
      }))
      .reverse();
    
    return c.json({
      success: true,
      data: chartData,
    });
  } catch (error) {
    console.error('Chart error:', error);
    return c.json({ success: false, error: 'فشل في جلب بيانات الرسم البياني' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Channel Distribution
// ─────────────────────────────────────────────────────────────────────────────────

dashboardRoutes.get('/chart/channels', async (c) => {
  try {
    const orders = await db.query.orders.findMany({
      columns: {
        channel: true,
        total: true,
      },
    });
    
    const channelStats: Record<string, { orders: number; revenue: number }> = {
      whatsapp: { orders: 0, revenue: 0 },
      telegram: { orders: 0, revenue: 0 },
      messenger: { orders: 0, revenue: 0 },
      instagram: { orders: 0, revenue: 0 },
      website: { orders: 0, revenue: 0 },
    };
    
    orders.forEach(order => {
      if (order.channel && channelStats[order.channel]) {
        channelStats[order.channel].orders += 1;
        channelStats[order.channel].revenue += order.total;
      }
    });
    
    return c.json({
      success: true,
      data: Object.entries(channelStats).map(([channel, stats]) => ({
        channel,
        orders: stats.orders,
        revenue: stats.revenue,
      })),
    });
  } catch (error) {
    console.error('Channels chart error:', error);
    return c.json({ success: false, error: 'فشل في جلب بيانات القنوات' }, 500);
  }
});
