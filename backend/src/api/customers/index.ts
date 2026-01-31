// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Customers API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { eq, desc, like, or } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const customersRoutes = new Hono<AuthContext>();
customersRoutes.use('*', authMiddleware);

// Get all customers
customersRoutes.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const segment = c.req.query('segment');
    const search = c.req.query('search');
    
    const customers = await db.query.customers.findMany({
      limit,
      offset: (page - 1) * limit,
      orderBy: [desc(schema.customers.createdAt)],
    });
    
    return c.json({
      success: true,
      data: customers,
      pagination: { page, limit, hasMore: customers.length === limit },
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب العملاء' }, 500);
  }
});

// Get single customer
customersRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const customer = await db.query.customers.findFirst({
      where: eq(schema.customers.id, id),
    });
    
    if (!customer) {
      return c.json({ success: false, error: 'العميل غير موجود' }, 404);
    }
    
    // Get customer's orders
    const orders = await db.query.orders.findMany({
      where: eq(schema.orders.customerId, id),
      orderBy: [desc(schema.orders.createdAt)],
      limit: 10,
    });
    
    // Get customer's conversations
    const conversations = await db.query.conversations.findMany({
      where: eq(schema.conversations.customerId, id),
      orderBy: [desc(schema.conversations.createdAt)],
      limit: 10,
    });
    
    return c.json({
      success: true,
      data: {
        ...customer,
        recentOrders: orders,
        recentConversations: conversations,
      },
    });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب العميل' }, 500);
  }
});

// Update customer
customersRoutes.patch('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const data = await c.req.json();
    
    const [updated] = await db.update(schema.customers)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.customers.id, id))
      .returning();
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في تحديث العميل' }, 500);
  }
});

// Add wallet balance
customersRoutes.post('/:id/wallet/add', async (c) => {
  try {
    const id = c.req.param('id');
    const { amount, reason } = await c.req.json();
    
    const customer = await db.query.customers.findFirst({
      where: eq(schema.customers.id, id),
    });
    
    if (!customer) {
      return c.json({ success: false, error: 'العميل غير موجود' }, 404);
    }
    
    const [updated] = await db.update(schema.customers)
      .set({
        walletBalance: (customer.walletBalance || 0) + amount,
        updatedAt: new Date(),
      })
      .where(eq(schema.customers.id, id))
      .returning();
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إضافة الرصيد' }, 500);
  }
});

// Add loyalty points
customersRoutes.post('/:id/loyalty/add', async (c) => {
  try {
    const id = c.req.param('id');
    const { points, reason } = await c.req.json();
    
    const customer = await db.query.customers.findFirst({
      where: eq(schema.customers.id, id),
    });
    
    if (!customer) {
      return c.json({ success: false, error: 'العميل غير موجود' }, 404);
    }
    
    const newPoints = (customer.loyaltyPoints || 0) + points;
    
    // Auto-upgrade tier
    let newTier = customer.loyaltyTier;
    if (newPoints >= 10000) newTier = 'platinum';
    else if (newPoints >= 5000) newTier = 'gold';
    else if (newPoints >= 1000) newTier = 'silver';
    
    const [updated] = await db.update(schema.customers)
      .set({
        loyaltyPoints: newPoints,
        loyaltyTier: newTier,
        updatedAt: new Date(),
      })
      .where(eq(schema.customers.id, id))
      .returning();
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إضافة النقاط' }, 500);
  }
});
