// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Bot Training API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq, desc } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const trainingRoutes = new Hono<AuthContext>();
trainingRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get Training Data
// ─────────────────────────────────────────────────────────────────────────────────

trainingRoutes.get('/data', async (c) => {
  try {
    const type = c.req.query('type');
    
    const data = await db.query.botTrainingData.findMany({
      where: type ? eq(schema.botTrainingData.type, type) : undefined,
      orderBy: [desc(schema.botTrainingData.priority)],
    });
    
    return c.json({ success: true, data });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب البيانات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Add Training Data
// ─────────────────────────────────────────────────────────────────────────────────

const trainingDataSchema = z.object({
  type: z.enum(['faq', 'product_info', 'policy', 'custom_response']),
  title: z.string().min(1),
  content: z.string().min(1),
  contentAr: z.string().optional(),
  keywords: z.array(z.string()).default([]),
  triggerPhrases: z.array(z.string()).default([]),
  priority: z.number().default(0),
});

trainingRoutes.post('/data', zValidator('json', trainingDataSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    const [created] = await db.insert(schema.botTrainingData)
      .values(data)
      .returning();
    
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إضافة البيانات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Upload File (Mock for MVP)
// ─────────────────────────────────────────────────────────────────────────────────

trainingRoutes.post('/upload', async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body['file'];

    if (!file || typeof file === 'string') {
      return c.json({ success: false, error: 'لم يتم رفع أي ملف' }, 400);
    }

    // In a real Vercel app, we'd use Blob Storage (Vercel Blob or AWS S3).
    // For this MVP/Demo, we will simulate processing and store metadata.
    
    // Convert current date to simulate processing
    const processedContent = `تمت معالجة الملف: ${file.name} \nتاريخ المعالجة: ${new Date().toLocaleString('ar-EG')}`;

    const [created] = await db.insert(schema.botTrainingData)
      .values({
        type: 'product_info', // Default type for uploads
        title: file.name,
        content: processedContent,
        keywords: [file.name.split('.')[0]],
        priority: 5,
        isActive: true,
      })
      .returning();

    return c.json({ success: true, data: created, message: 'تم رفع الملف ومعالجته بنجاح' }, 201);
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ success: false, error: 'فشل في رفع الملف' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Update Training Data
// ─────────────────────────────────────────────────────────────────────────────────

trainingRoutes.patch('/data/:id', zValidator('json', trainingDataSchema.partial()), async (c) => {
  try {
    const id = c.req.param('id');
    const data = c.req.valid('json');
    
    const [updated] = await db.update(schema.botTrainingData)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.botTrainingData.id, id))
      .returning();
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في تحديث البيانات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Delete Training Data
// ─────────────────────────────────────────────────────────────────────────────────

trainingRoutes.delete('/data/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    await db.delete(schema.botTrainingData)
      .where(eq(schema.botTrainingData.id, id));
    
    return c.json({ success: true, message: 'تم الحذف' });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في الحذف' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Get Bot Rules
// ─────────────────────────────────────────────────────────────────────────────────

trainingRoutes.get('/rules', async (c) => {
  try {
    const rules = await db.query.botRules.findMany({
      orderBy: [desc(schema.botRules.priority)],
    });
    
    return c.json({ success: true, data: rules });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب القواعد' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Add Bot Rule
// ─────────────────────────────────────────────────────────────────────────────────

const botRuleSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  ruleType: z.string(),
  condition: z.object({
    type: z.string(),
    value: z.any().optional().refine(val => val !== undefined, { message: "Value is required" }),
  }),
  action: z.object({
    type: z.string(),
    value: z.any().optional().refine(val => val !== undefined, { message: "Value is required" }),
  }),
  priority: z.number().default(0),
});

trainingRoutes.post('/rules', zValidator('json', botRuleSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    const [created] = await db.insert(schema.botRules)
      .values(data)
      .returning();
    
    return c.json({ success: true, data: created }, 201);
  } catch (error) {
    return c.json({ success: false, error: 'فشل في إضافة القاعدة' }, 500);
  }
});

// Toggle Rule
trainingRoutes.patch('/rules/:id/toggle', async (c) => {
  try {
    const id = c.req.param('id');
    
    const rule = await db.query.botRules.findFirst({
      where: eq(schema.botRules.id, id),
    });
    
    if (!rule) {
      return c.json({ success: false, error: 'القاعدة غير موجودة' }, 404);
    }
    
    const [updated] = await db.update(schema.botRules)
      .set({ isActive: !rule.isActive, updatedAt: new Date() })
      .where(eq(schema.botRules.id, id))
      .returning();
    
    return c.json({ success: true, data: updated });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في تحديث القاعدة' }, 500);
  }
});

// Delete Rule
trainingRoutes.delete('/rules/:id', async (c) => {
  try {
    const id = c.req.param('id');
    
    await db.delete(schema.botRules)
      .where(eq(schema.botRules.id, id));
    
    return c.json({ success: true, message: 'تم الحذف' });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في الحذف' }, 500);
  }
});
