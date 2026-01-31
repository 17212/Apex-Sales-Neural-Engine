import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../config/database.js';
import { generateToken } from '../middleware/auth.middleware.js';
import { asyncHandler, AppError } from '../middleware/error-handler.middleware.js';
import { ApiResponse, LoginRequest, RegisterRequest, AuthTokens, JwtPayload } from '../types/api.types.js';

/**
 * Register new tenant and admin user
 */
export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, name, tenantName, subdomain } = req.body as RegisterRequest;

  // Validate input
  if (!email || !password || !name || !tenantName || !subdomain) {
    throw new AppError('All fields are required', 400, 'VALIDATION_ERROR');
  }

  // Check if email exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError('Email already registered', 400, 'EMAIL_EXISTS');
  }

  // Check if subdomain exists
  const existingTenant = await prisma.tenant.findUnique({ where: { subdomain } });
  if (existingTenant) {
    throw new AppError('Subdomain already taken', 400, 'SUBDOMAIN_EXISTS');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create tenant and user in transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create tenant
    const tenant = await tx.tenant.create({
      data: {
        name: tenantName,
        subdomain: subdomain.toLowerCase(),
        settings: {},
      },
    });

    // Create admin user
    const user = await tx.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        name,
        role: 'OWNER',
        tenantId: tenant.id,
      },
    });

    return { tenant, user };
  });

  // Generate token
  const payload: JwtPayload = {
    userId: result.user.id,
    tenantId: result.tenant.id,
    role: result.user.role,
    email: result.user.email,
  };
  
  const accessToken = generateToken(payload);

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
      },
      tenant: {
        id: result.tenant.id,
        name: result.tenant.name,
        subdomain: result.tenant.subdomain,
      },
      tokens: {
        accessToken,
        expiresIn: 7 * 24 * 60 * 60, // 7 days in seconds
      } as AuthTokens,
    },
  } satisfies ApiResponse);
});

/**
 * Login user
 */
export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as LoginRequest;

  // Validate input
  if (!email || !password) {
    throw new AppError('Email and password are required', 400, 'VALIDATION_ERROR');
  }

  // Find user with tenant
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { tenant: true },
  });

  if (!user) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  // Check if user is active
  if (!user.isActive) {
    throw new AppError('Account is disabled', 403, 'ACCOUNT_DISABLED');
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS');
  }

  // Update last login
  await prisma.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  // Generate token
  const payload: JwtPayload = {
    userId: user.id,
    tenantId: user.tenantId,
    role: user.role,
    email: user.email,
  };
  
  const accessToken = generateToken(payload);

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
      },
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
        subdomain: user.tenant.subdomain,
        logo: user.tenant.logo,
      },
      tokens: {
        accessToken,
        expiresIn: 7 * 24 * 60 * 60,
      } as AuthTokens,
    },
  } satisfies ApiResponse);
});

/**
 * Get current user profile
 */
export const getProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const userId = req.user!.userId;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { tenant: true },
  });

  if (!user) {
    throw new AppError('User not found', 404, 'NOT_FOUND');
  }

  res.json({
    success: true,
    data: {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
      tenant: {
        id: user.tenant.id,
        name: user.tenant.name,
        subdomain: user.tenant.subdomain,
        logo: user.tenant.logo,
        aiPersona: user.tenant.aiPersona,
      },
    },
  } satisfies ApiResponse);
});

/**
 * Logout (client-side token invalidation)
 */
export const logout = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
  // In a stateless JWT setup, logout is handled client-side
  // For enhanced security, you could implement token blacklisting with Redis
  
  res.json({
    success: true,
    data: { message: 'Logged out successfully' },
  } satisfies ApiResponse);
});
