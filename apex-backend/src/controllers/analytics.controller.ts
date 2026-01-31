import { Request, Response } from 'express';
import { prisma } from '../config/database.js';
import { asyncHandler, AppError } from '../middleware/error-handler.middleware.js';
import { ApiResponse, DashboardMetrics } from '../types/api.types.js';

/**
 * Get dashboard metrics
 */
export const getDashboardMetrics = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tenantId = req.tenantId!;
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  // Parallel queries for all metrics
  const [
    todayRevenue,
    yesterdayRevenue,
    thisMonthRevenue,
    lastMonthRevenue,
    orderStats,
    conversationStats,
    customerStats,
    aiStats,
    inventoryStats,
  ] = await Promise.all([
    // Today's revenue
    prisma.order.aggregate({
      where: { tenantId, createdAt: { gte: today }, paymentStatus: 'PAID' },
      _sum: { total: true },
    }),
    
    // Yesterday's revenue
    prisma.order.aggregate({
      where: { 
        tenantId, 
        createdAt: { gte: yesterday, lt: today }, 
        paymentStatus: 'PAID' 
      },
      _sum: { total: true },
    }),
    
    // This month's revenue
    prisma.order.aggregate({
      where: { tenantId, createdAt: { gte: thisMonthStart }, paymentStatus: 'PAID' },
      _sum: { total: true },
    }),
    
    // Last month's revenue
    prisma.order.aggregate({
      where: { 
        tenantId, 
        createdAt: { gte: lastMonthStart, lte: lastMonthEnd }, 
        paymentStatus: 'PAID' 
      },
      _sum: { total: true },
    }),
    
    // Order statistics
    prisma.order.groupBy({
      by: ['status'],
      where: { tenantId },
      _count: true,
    }),
    
    // Conversation statistics
    prisma.conversation.groupBy({
      by: ['status'],
      where: { tenantId },
      _count: true,
    }),
    
    // Customer statistics
    Promise.all([
      prisma.customer.count({ where: { tenantId } }),
      prisma.customer.count({ 
        where: { tenantId, createdAt: { gte: thisMonthStart } } 
      }),
      prisma.customer.count({ 
        where: { tenantId, orderCount: { gt: 1 } } 
      }),
    ]),
    
    // AI statistics
    Promise.all([
      prisma.conversation.count({ 
        where: { tenantId, isAiHandled: true, status: 'RESOLVED' } 
      }),
      prisma.conversation.count({ 
        where: { tenantId, isAiHandled: true } 
      }),
      prisma.conversation.aggregate({
        where: { tenantId, sentimentScore: { not: null } },
        _avg: { sentimentScore: true },
      }),
    ]),
    
    // Inventory statistics
    Promise.all([
      prisma.product.count({ where: { tenantId, isActive: true } }),
      prisma.product.count({ 
        where: { 
          tenantId, 
          isActive: true,
          stock: { lte: prisma.product.fields.lowStockThreshold }
        }
      }),
      prisma.product.count({ 
        where: { tenantId, isActive: true, stock: 0 } 
      }),
    ]),
  ]);

  // Process order stats
  const orderStatusMap = Object.fromEntries(
    orderStats.map(s => [s.status, s._count])
  );

  // Process conversation stats
  const convStatusMap = Object.fromEntries(
    conversationStats.map(s => [s.status, s._count])
  );

  // Calculate revenue trend
  const lastMonthVal = lastMonthRevenue._sum.total || 0;
  const thisMonthVal = thisMonthRevenue._sum.total || 0;
  const trend = lastMonthVal > 0 
    ? ((thisMonthVal - lastMonthVal) / lastMonthVal) * 100 
    : 0;

  // AI success rate
  const [resolvedByAi, totalAi] = [aiStats[0], aiStats[1]];
  const aiSuccessRate = totalAi > 0 ? (resolvedByAi / totalAi) * 100 : 0;

  const metrics: DashboardMetrics = {
    revenue: {
      today: todayRevenue._sum.total || 0,
      yesterday: yesterdayRevenue._sum.total || 0,
      thisMonth: thisMonthVal,
      lastMonth: lastMonthVal,
      trend: Math.round(trend * 100) / 100,
    },
    orders: {
      total: Object.values(orderStatusMap).reduce((a, b) => a + b, 0),
      pending: orderStatusMap['PENDING'] || 0,
      processing: orderStatusMap['PROCESSING'] || 0,
      shipped: orderStatusMap['SHIPPED'] || 0,
      delivered: orderStatusMap['DELIVERED'] || 0,
    },
    conversations: {
      active: convStatusMap['ACTIVE'] || 0,
      waiting: convStatusMap['WAITING'] || 0,
      resolved: convStatusMap['RESOLVED'] || 0,
      avgResponseTime: 30, // TODO: Calculate from message timestamps
    },
    customers: {
      total: customerStats[0],
      new: customerStats[1],
      returning: customerStats[2],
    },
    ai: {
      handledConversations: totalAi,
      successRate: Math.round(aiSuccessRate * 100) / 100,
      avgSentiment: aiStats[2]._avg.sentimentScore || 0,
    },
    inventory: {
      totalProducts: inventoryStats[0],
      lowStock: inventoryStats[1],
      outOfStock: inventoryStats[2],
    },
  };

  res.json({
    success: true,
    data: metrics,
  } satisfies ApiResponse);
});

/**
 * Get revenue chart data
 */
export const getRevenueData = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tenantId = req.tenantId!;
  const { period = '7d' } = req.query;
  
  let days = 7;
  if (period === '30d') days = 30;
  if (period === '90d') days = 90;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const orders = await prisma.order.findMany({
    where: {
      tenantId,
      createdAt: { gte: startDate },
      paymentStatus: 'PAID',
    },
    select: {
      total: true,
      createdAt: true,
    },
  });

  // Group by date
  const dataMap = new Map<string, { revenue: number; orders: number }>();
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const key = date.toISOString().split('T')[0];
    dataMap.set(key, { revenue: 0, orders: 0 });
  }

  orders.forEach(order => {
    const key = order.createdAt.toISOString().split('T')[0];
    const existing = dataMap.get(key);
    if (existing) {
      existing.revenue += order.total;
      existing.orders += 1;
    }
  });

  const chartData = Array.from(dataMap.entries())
    .map(([date, data]) => ({
      date,
      revenue: Math.round(data.revenue * 100) / 100,
      orders: data.orders,
    }))
    .reverse();

  res.json({
    success: true,
    data: chartData,
  } satisfies ApiResponse);
});

/**
 * Get pulse feed (live activity)
 */
export const getPulseFeed = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const tenantId = req.tenantId!;
  const { limit = 20 } = req.query;

  // Get recent activities
  const [recentOrders, recentConversations] = await Promise.all([
    prisma.order.findMany({
      where: { tenantId },
      include: { customer: { select: { name: true } } },
      orderBy: { createdAt: 'desc' },
      take: Number(limit) / 2,
    }),
    prisma.conversation.findMany({
      where: { tenantId },
      include: { 
        customer: { select: { name: true } },
        messages: { orderBy: { createdAt: 'desc' }, take: 1 },
      },
      orderBy: { updatedAt: 'desc' },
      take: Number(limit) / 2,
    }),
  ]);

  // Combine and sort
  const pulseEvents = [
    ...recentOrders.map(order => ({
      id: `order-${order.id}`,
      type: 'order' as const,
      icon: order.status === 'DELIVERED' ? '✅' : order.status === 'SHIPPED' ? '📦' : '🛒',
      title: `طلب جديد #${order.orderNumber}`,
      description: `${order.customer.name || 'عميل'} - ${order.total} جنيه`,
      metadata: { orderId: order.id, status: order.status },
      timestamp: order.createdAt.toISOString(),
    })),
    ...recentConversations.map(conv => ({
      id: `conv-${conv.id}`,
      type: conv.isAiHandled ? 'ai_action' as const : 'conversation' as const,
      icon: conv.isAiHandled ? '🤖' : '💬',
      title: conv.isAiHandled ? 'AI أجاب على استفسار' : 'محادثة جديدة',
      description: `${conv.customer.name || 'عميل'} - ${conv.messages[0]?.content.slice(0, 50) || '...'}`,
      metadata: { conversationId: conv.id },
      timestamp: conv.updatedAt.toISOString(),
    })),
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
   .slice(0, Number(limit));

  res.json({
    success: true,
    data: pulseEvents,
  } satisfies ApiResponse);
});
