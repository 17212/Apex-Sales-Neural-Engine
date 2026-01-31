// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Auth Middleware
// ═══════════════════════════════════════════════════════════════════════════════

import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';

import { db, schema } from '../database/index.js';
import { env } from '../core/config/index.js';

// ─────────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: string;
}

export interface AuthContext {
  Variables: {
    user: AuthUser;
  };
}

// ─────────────────────────────────────────────────────────────────────────────────
// Middleware
// ─────────────────────────────────────────────────────────────────────────────────

export const authMiddleware = async (c: Context<AuthContext>, next: Next) => {
  const authHeader = c.req.header('Authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ success: false, error: 'غير مصرح - توكن مفقود' }, 401);
  }
  
  const token = authHeader.replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as {
      userId: string;
      email: string;
      role: string;
    };
    
    // Get fresh user data
    const user = await db.query.adminUsers.findFirst({
      where: eq(schema.adminUsers.id, decoded.userId),
      columns: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        isActive: true,
      },
    });
    
    if (!user) {
      return c.json({ success: false, error: 'المستخدم غير موجود' }, 401);
    }
    
    if (!user.isActive) {
      return c.json({ success: false, error: 'الحساب معطل' }, 403);
    }
    
    // Set user in context
    c.set('user', {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
    });
    
    await next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return c.json({ success: false, error: 'انتهت صلاحية التوكن' }, 401);
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return c.json({ success: false, error: 'توكن غير صالح' }, 401);
    }
    return c.json({ success: false, error: 'خطأ في المصادقة' }, 401);
  }
};

// Role-based middleware
export const requireRole = (...roles: string[]) => {
  return async (c: Context<AuthContext>, next: Next) => {
    const user = c.get('user');
    
    if (!user) {
      return c.json({ success: false, error: 'غير مصرح' }, 401);
    }
    
    if (!roles.includes(user.role)) {
      return c.json({ success: false, error: 'ليس لديك صلاحية لهذا الإجراء' }, 403);
    }
    
    await next();
  };
};
