// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Products API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq, desc, like, or } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const productsRoutes = new Hono<AuthContext>();
productsRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get All Products
// ─────────────────────────────────────────────────────────────────────────────────

productsRoutes.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const category = c.req.query('category');
    const search = c.req.query('search');
    
    let whereConditions = [];
    
    if (category) {
      whereConditions.push(eq(schema.products.category, category));
    }
    if (search) {
      whereConditions.push(
        or(
          like(schema.products.name, `%${search}%`),
          like(schema.products.nameAr, `%${search}%`),
          like(schema.products.sku, `%${search}%`)
        )
      );
    }
    
    const products = await db.query.products.findMany({
      where: whereConditions.length > 0 
        ? whereConditions.length === 1 
          ? whereConditions[0] 
          : or(...whereConditions)
        : undefined,
      limit,
      offset: (page - 1) * limit,
      orderBy: [desc(schema.products.createdAt)],
    });
    
    return c.json({
      success: true,
      data: products,
      pagination: { page, limit, hasMore: products.length === limit },
    });
  } catch (error) {
    console.error('Get products error:', error);
    return c.json({ success: false, error: 'فشل في جلب المنتجات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Single Product
// ─────────────────────────────────────────────────────────────────────────────────

productsRoutes.get('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    const product = await db.query.products.findFirst({
      where: eq(schema.products.id, id),
    });
    
    if (!product) {
      return c.json({ success: false, error: 'المنتج غير موجود' }, 404);
    }
    
    return c.json({ success: true, data: product });
  } catch (error) {
    console.error('Get product error:', error);
    return c.json({ success: false, error: 'فشل في جلب المنتج' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Create Product
// ─────────────────────────────────────────────────────────────────────────────────

const productSchema = z.object({
  name: z.string().min(1, 'اسم المنتج مطلوب'),
  nameAr: z.string().optional(),
  description: z.string().optional(),
  descriptionAr: z.string().optional(),
  sku: z.string().optional(),
  price: z.number().positive('السعر يجب أن يكون رقم موجب'),
  compareAtPrice: z.number().optional(),
  costPrice: z.number().optional(),
  stock: z.number().default(0),
  lowStockThreshold: z.number().default(5),
  images: z.array(z.string()).default([]),
  thumbnail: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).default([]),
  keywords: z.array(z.string()).default([]),
  salesPitch: z.string().optional(),
  objectionHandlers: z.record(z.string()).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

productsRoutes.post('/', zValidator('json', productSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    const [product] = await db.insert(schema.products)
      .values(data)
      .returning();
    
    return c.json({ success: true, data: product }, 201);
  } catch (error) {
    console.error('Create product error:', error);
    return c.json({ success: false, error: 'فشل في إنشاء المنتج' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Update Product
// ─────────────────────────────────────────────────────────────────────────────────

productsRoutes.patch('/:id', zValidator('json', productSchema.partial()), async (c) => {
  try {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    
    const [updated] = await db.update(schema.products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.products.id, id))
      .returning();
    
    if (!updated) {
      return c.json({ success: false, error: 'المنتج غير موجود' }, 404);
    }
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error('Update product error:', error);
    return c.json({ success: false, error: 'فشل في تحديث المنتج' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Delete Product
// ─────────────────────────────────────────────────────────────────────────────────

productsRoutes.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    await db.delete(schema.products)
      .where(eq(schema.products.id, id));
    
    return c.json({ success: true, message: 'تم حذف المنتج' });
  } catch (error) {
    console.error('Delete product error:', error);
    return c.json({ success: false, error: 'فشل في حذف المنتج' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Low Stock Products (Alerts)
// ─────────────────────────────────────────────────────────────────────────────────

productsRoutes.get('/alerts/low-stock', async (c) => {
  try {
    const products = await db.query.products.findMany({
      where: eq(schema.products.trackInventory, true),
    });
    
    const lowStock = products.filter(p => (p.stock ?? 0) <= (p.lowStockThreshold || 5));
    
    return c.json({
      success: true,
      data: lowStock.map(p => ({
        id: p.id,
        name: p.name,
        sku: p.sku,
        stock: p.stock,
        threshold: p.lowStockThreshold,
      })),
    });
  } catch (error) {
    console.error('Low stock error:', error);
    return c.json({ success: false, error: 'فشل في جلب المنتجات' }, 500);
  }
});
