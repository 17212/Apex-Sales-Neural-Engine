// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Orders API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq, desc, and } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';
import { broadcast } from '../../core/realtime/pusher.js';

export const ordersRoutes = new Hono<AuthContext>();
ordersRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get All Orders
// ─────────────────────────────────────────────────────────────────────────────────

ordersRoutes.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const status = c.req.query('status');
    const channel = c.req.query('channel');
    
    let whereConditions = [];
    
    if (status) {
      whereConditions.push(eq(schema.orders.status, status as any));
    }
    if (channel) {
      whereConditions.push(eq(schema.orders.channel, channel as any));
    }
    
    const orders = await db.query.orders.findMany({
      where: whereConditions.length > 0 ? and(...whereConditions) : undefined,
      limit,
      offset: (page - 1) * limit,
      orderBy: [desc(schema.orders.createdAt)],
      with: {
        customer: {
          columns: { id: true, name: true, phone: true },
        },
      },
    });
    
    return c.json({
      success: true,
      data: orders,
      pagination: { page, limit, hasMore: orders.length === limit },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return c.json({ success: false, error: 'فشل في جلب الطلبات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Single Order
// ─────────────────────────────────────────────────────────────────────────────────

ordersRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const order = await db.query.orders.findFirst({
      where: eq(schema.orders.id, id),
      with: {
        customer: true,
        conversation: true,
      },
    });
    
    if (!order) {
      return c.json({ success: false, error: 'الطلب غير موجود' }, 404);
    }
    
    return c.json({ success: true, data: order });
  } catch (error) {
    console.error('Get order error:', error);
    return c.json({ success: false, error: 'فشل في جلب الطلب' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Update Order Status
// ─────────────────────────────────────────────────────────────────────────────────

const updateStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']),
  trackingNumber: z.string().optional(),
  courierName: z.string().optional(),
  adminNotes: z.string().optional(),
});

ordersRoutes.patch('/:id/status', zValidator('json', updateStatusSchema), async (c) => {
  try {
    const id = c.req.param('id');
    const { status, trackingNumber, courierName, adminNotes } = c.req.valid('json');
    
    const updateData: any = {
      status,
      updatedAt: new Date(),
    };
    
    if (trackingNumber) updateData.trackingNumber = trackingNumber;
    if (courierName) updateData.courierName = courierName;
    if (adminNotes) updateData.adminNotes = adminNotes;
    
    if (status === 'shipped') {
      updateData.shippedAt = new Date();
    } else if (status === 'delivered') {
      updateData.deliveredAt = new Date();
    }
    
    const [updated] = await db.update(schema.orders)
      .set(updateData)
      .where(eq(schema.orders.id, id))
      .returning();
    
    // Broadcast update
    await broadcast.orderUpdated({
      id: updated.id,
      status: updated.status ?? 'pending',
      updatedAt: updated.updatedAt,
    });
    
    // TODO: Send notification to customer via channel
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update status error:', error);
    return c.json({ success: false, error: 'فشل في تحديث الحالة' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Create Order (Manual)
// ─────────────────────────────────────────────────────────────────────────────────

const createOrderSchema = z.object({
  customerId: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    name: z.string(),
    price: z.number(),
    quantity: z.number(),
    total: z.number(),
  })),
  subtotal: z.number(),
  discount: z.number().default(0),
  shippingCost: z.number().default(0),
  total: z.number(),
  paymentMethod: z.enum(['cod', 'card', 'wallet', 'instapay', 'fawry']),
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    area: z.string(),
    postalCode: z.string().optional(),
    notes: z.string().optional(),
  }),
  customerNotes: z.string().optional(),
});

ordersRoutes.post('/', zValidator('json', createOrderSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    // Calculate VAT
    const vatRate = 0.14; // 14% Egypt
    const vatAmount = data.subtotal * vatRate;
    
    const [order] = await db.insert(schema.orders)
      .values({
        ...data,
        vatAmount,
        paymentStatus: 'pending',
        attributedToBot: false,
      })
      .returning();
    
    // Update customer stats
    await db.update(schema.customers)
      .set({
        totalOrders: sql`${schema.customers.totalOrders} + 1`,
        lastOrderAt: new Date(),
      })
      .where(eq(schema.customers.id, data.customerId));
    
    // Broadcast new order
    const customer = await db.query.customers.findFirst({
      where: eq(schema.customers.id, data.customerId),
    });
    
    await broadcast.newOrder({
      id: order.id,
      orderNumber: order.orderNumber!,
      customerName: customer?.name || 'عميل',
      total: order.total,
      channel: order.channel || 'website',
    });
    
    return c.json({ success: true, data: order }, 201);
  } catch (error) {
    console.error('Create order error:', error);
    return c.json({ success: false, error: 'فشل في إنشاء الطلب' }, 500);
  }
});

// Import sql for raw queries
import { sql } from 'drizzle-orm';
