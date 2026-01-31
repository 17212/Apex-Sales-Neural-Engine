import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api.types.js';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  message?: string;
}

export function rateLimiter(options: RateLimitOptions) {
  const { windowMs, maxRequests, message } = options;
  
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip || req.headers['x-forwarded-for'] as string || 'unknown';
    const now = Date.now();
    
    // Clean up expired entries
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }
    
    if (!store[key]) {
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
      next();
      return;
    }
    
    store[key].count++;
    
    if (store[key].count > maxRequests) {
      const retryAfter = Math.ceil((store[key].resetTime - now) / 1000);
      
      res.set('Retry-After', String(retryAfter));
      res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: message || 'Too many requests, please try again later',
          details: { retryAfter },
        },
      } satisfies ApiResponse);
      return;
    }
    
    next();
  };
}
