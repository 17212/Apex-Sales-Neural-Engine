// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Analytics API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { desc, eq, gte, and, sql } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const analyticsRoutes = new Hono<AuthContext>();
analyticsRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get Overview Analytics
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/overview', async (c) => {
  try {
    const period = c.req.query('period') || '7d';
    const days = period === '30d' ? 30 : period === '7d' ? 7 : 1;
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    // Orders in period
    const orders = await db.query.orders.findMany({
      where: gte(schema.orders.createdAt, startDate),
    });
    
    // Conversations in period
    const conversations = await db.query.conversations.findMany({
      where: gte(schema.conversations.createdAt, startDate),
    });
    
    // Customers in period
    const newCustomers = await db.query.customers.findMany({
      where: gte(schema.customers.createdAt, startDate),
    });
    
    // Calculate metrics
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalProfit = orders.reduce((sum, o) => sum + (o.netProfit || 0), 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const conversionRate = conversations.length > 0 
      ? (orders.length / conversations.length) * 100 
      : 0;
    
    // Bot efficiency
    const botOrders = orders.filter(o => o.attributedToBot).length;
    const botEfficiency = orders.length > 0 ? (botOrders / orders.length) * 100 : 0;
    
    return c.json({
      success: true,
      data: {
        period,
        totalRevenue,
        totalProfit,
        totalOrders: orders.length,
        avgOrderValue: Math.round(avgOrderValue),
        conversionRate: Math.round(conversionRate * 100) / 100,
        totalConversations: conversations.length,
        newCustomers: newCustomers.length,
        botEfficiency: Math.round(botEfficiency),
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب التحليلات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Sales by Channel
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/channels', async (c) => {
  try {
    const orders = await db.query.orders.findMany();
    
    const byChannel: Record<string, { orders: number; revenue: number }> = {};
    
    orders.forEach(order => {
      const channel = order.channel || 'unknown';
      if (!byChannel[channel]) {
        byChannel[channel] = { orders: 0, revenue: 0 };
      }
      byChannel[channel].orders += 1;
      byChannel[channel].revenue += order.total;
    });
    
    return c.json({
      success: true,
      data: Object.entries(byChannel).map(([channel, data]) => ({
        channel,
        ...data,
      })),
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب بيانات القنوات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Top Products
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/top-products', async (c) => {
  try {
    const products = await db.query.products.findMany({
      orderBy: [desc(schema.products.salesCount)],
      limit: 10,
      columns: {
        id: true,
        name: true,
        price: true,
        salesCount: true,
        thumbnail: true,
      },
    });
    
    return c.json({ success: true, data: products });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب المنتجات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Customer Segments Distribution
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/segments', async (c) => {
  try {
    const customers = await db.query.customers.findMany({
      columns: { segment: true },
    });
    
    const bySegment: Record<string, number> = {};
    customers.forEach(c => {
      const seg = c.segment || 'new';
      bySegment[seg] = (bySegment[seg] || 0) + 1;
    });
    
    return c.json({
      success: true,
      data: Object.entries(bySegment).map(([segment, count]) => ({
        segment,
        count,
        percentage: Math.round((count / customers.length) * 100),
      })),
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب الشرائح' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Revenue Timeline
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/revenue-timeline', async (c) => {
  try {
    const days = parseInt(c.req.query('days') || '30');
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
    const byDate: Record<string, { revenue: number; profit: number; orders: number }> = {};
    
    for (let i = 0; i < days; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toISOString().split('T')[0];
      byDate[key] = { revenue: 0, profit: 0, orders: 0 };
    }
    
    orders.forEach(order => {
      const key = order.createdAt.toISOString().split('T')[0];
      if (byDate[key]) {
        byDate[key].revenue += order.total;
        byDate[key].profit += order.netProfit || 0;
        byDate[key].orders += 1;
      }
    });
    
    return c.json({
      success: true,
      data: Object.entries(byDate)
        .map(([date, data]) => ({ date, ...data }))
        .reverse(),
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب البيانات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Export for Flutter (JSON-ready metrics)
// ─────────────────────────────────────────────────────────────────────────────────

analyticsRoutes.get('/flutter-export', async (c) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    
    // Today's data
    const todayOrders = await db.query.orders.findMany({
      where: gte(schema.orders.createdAt, today),
    });
    
    // Monthly data
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
    
    return c.json({
      success: true,
      exportedAt: new Date().toISOString(),
      data: {
        today: {
          revenue: todayOrders.reduce((s, o) => s + o.total, 0),
          orders: todayOrders.length,
          profit: todayOrders.reduce((s, o) => s + (o.netProfit || 0), 0),
        },
        monthly: {
          revenue: monthlyOrders.reduce((s, o) => s + o.total, 0),
          orders: monthlyOrders.length,
        },
        realtime: {
          activeConversations: activeConversations.length,
          pendingOrders: pendingOrders.length,
        },
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'Export failed' }, 500);
  }
});
