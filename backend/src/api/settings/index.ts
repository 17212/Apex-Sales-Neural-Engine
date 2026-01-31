// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Settings API Routes (Manual Channel Config)
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { eq } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { authMiddleware, requireRole, type AuthContext } from '../../middleware/auth.js';

export const settingsRoutes = new Hono<AuthContext>();
settingsRoutes.use('*', authMiddleware);

// ─────────────────────────────────────────────────────────────────────────────────
// Get Store Settings
// ─────────────────────────────────────────────────────────────────────────────────

settingsRoutes.get('/store', async (c) => {
  try {
    const settings = await db.query.storeSettings.findFirst();
    return c.json({ success: true, data: settings });
  } catch (error) {
    return c.json({ success: false, error: 'فشل في جلب الإعدادات' }, 500);
  }
});

// ─────────────────────────────────────────────────────────────────────────────────
// Update Store Settings
// ─────────────────────────────────────────────────────────────────────────────────

const storeSettingsSchema = z.object({
  storeName: z.string().optional(),
  storeNameAr: z.string().optional(),
  logo: z.string().optional(),
  description: z.string().optional(),
  currency: z.string().optional(),
  timezone: z.string().optional(),
  defaultLanguage: z.string().optional(),
  botMode: z.enum(['active', 'vacation', 'human_only', 'suggestions_only']).optional(),
  botPersonality: z.enum(['professional', 'friendly', 'witty', 'urgent']).optional(),
  botName: z.string().optional(),
  maxDiscountPercent: z.number().min(0).max(100).optional(),
  autoFollowUpHours: z.number().optional(),
  workingHoursStart: z.string().optional(),
  workingHoursEnd: z.string().optional(),
  businessPhone: z.string().optional(),
  businessEmail: z.string().optional(),
  businessAddress: z.string().optional(),
  vatNumber: z.string().optional(),
  vatRate: z.number().optional(),
});

settingsRoutes.patch('/store', zValidator('json', storeSettingsSchema), async (c) => {
  try {
    const data = c.req.valid('json');
    
    const existing = await db.query.storeSettings.findFirst();
    
    if (existing) {
      const [updated] = await db.update(schema.storeSettings)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(schema.storeSettings.id, existing.id))
        .returning();
      return c.json({ success: true, data: updated });
    } else {
      const [created] = await db.insert(schema.storeSettings)
        .values({ storeName: 'My Store', ...data })
        .returning();
      return c.json({ success: true, data: created });
    }
  } catch (error) {
    return c.json({ success: false, error: 'فشل في تحديث الإعدادات' }, 500);
  }
});
