// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Auth API Routes
// ═══════════════════════════════════════════════════════════════════════════════

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db, schema } from '../../database/index.js';
import { env } from '../../core/config/index.js';
import { authMiddleware, type AuthContext } from '../../middleware/auth.js';

export const authRoutes = new Hono<AuthContext>();

// Helper function to parse expiry string to seconds
function parseExpiryToSeconds(expiry: string): number {
  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return 604800; // Default: 7 days
  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 24 * 60 * 60;
    default: return 604800;
  }
}

// ─────────────────────────────────────────────────────────────────────────────────
// Schemas
// ─────────────────────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});

const registerSchema = z.object({
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
  name: z.string().min(2, 'الاسم يجب أن يكون حرفين على الأقل'),
});

// ─────────────────────────────────────────────────────────────────────────────────
// Routes
// ─────────────────────────────────────────────────────────────────────────────────

// Login
authRoutes.post('/login', zValidator('json', loginSchema), async (c) => {
  const { email, password } = c.req.valid('json');
  
  try {
    // Find user
    const user = await db.query.adminUsers.findFirst({
      where: eq(schema.adminUsers.email, email),
    });
    
    if (!user) {
      return c.json({ success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, 401);
    }
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return c.json({ success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' }, 401);
    }
    
    // Check if active
    if (!user.isActive) {
      return c.json({ success: false, error: 'الحساب معطل' }, 403);
    }
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      env.JWT_SECRET,
      { expiresIn: parseExpiryToSeconds(env.JWT_EXPIRES_IN) }
    );
    
    // Update last login
    await db.update(schema.adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(schema.adminUsers.id, user.id));
    
    return c.json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ success: false, error: 'حدث خطأ في تسجيل الدخول' }, 500);
  }
});

// Register (First admin only or by existing admin)
authRoutes.post('/register', zValidator('json', registerSchema), async (c) => {
  const { email, password, name } = c.req.valid('json');
  
  try {
    // Check if any admin exists
    const existingAdmins = await db.query.adminUsers.findMany({ limit: 1 });
    
    // If admins exist, require auth
    if (existingAdmins.length > 0) {
      // Check for auth header
      const authHeader = c.req.header('Authorization');
      if (!authHeader) {
        return c.json({ success: false, error: 'غير مصرح' }, 401);
      }
      
      // Verify token
      try {
        const token = authHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, env.JWT_SECRET) as { role: string };
        if (decoded.role !== 'owner') {
          return c.json({ success: false, error: 'فقط المالك يمكنه إضافة مستخدمين' }, 403);
        }
      } catch {
        return c.json({ success: false, error: 'توكن غير صالح' }, 401);
      }
    }
    
    // Check if email exists
    const existingUser = await db.query.adminUsers.findFirst({
      where: eq(schema.adminUsers.email, email),
    });
    
    if (existingUser) {
      return c.json({ success: false, error: 'البريد الإلكتروني مستخدم بالفعل' }, 400);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create user
    const [newUser] = await db.insert(schema.adminUsers)
      .values({
        email,
        password: hashedPassword,
        name,
        role: existingAdmins.length === 0 ? 'owner' : 'admin',
      })
      .returning();
    
    // Generate token
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email, role: newUser.role },
      env.JWT_SECRET,
      { expiresIn: parseExpiryToSeconds(env.JWT_EXPIRES_IN) }
    );
    
    return c.json({
      success: true,
      data: {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ success: false, error: 'حدث خطأ في إنشاء الحساب' }, 500);
  }
});

// Get current user
authRoutes.get('/me', authMiddleware, async (c) => {
  const user = c.get('user');
  return c.json({ success: true, data: user });
});

// Logout (client-side - just for API completeness)
authRoutes.post('/logout', (c) => {
  return c.json({ success: true, message: 'تم تسجيل الخروج بنجاح' });
});
