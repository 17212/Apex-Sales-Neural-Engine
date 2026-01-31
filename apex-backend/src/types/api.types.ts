// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// ============================================
// Auth Types
// ============================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  tenantName: string;
  subdomain: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface JwtPayload {
  userId: string;
  tenantId: string;
  role: string;
  email: string;
}

// ============================================
// Dashboard Metrics Types
// ============================================

export interface DashboardMetrics {
  revenue: {
    today: number;
    yesterday: number;
    thisMonth: number;
    lastMonth: number;
    trend: number; // percentage change
  };
  orders: {
    total: number;
    pending: number;
    processing: number;
    shipped: number;
    delivered: number;
  };
  conversations: {
    active: number;
    waiting: number;
    resolved: number;
    avgResponseTime: number; // seconds
  };
  customers: {
    total: number;
    new: number;
    returning: number;
  };
  ai: {
    handledConversations: number;
    successRate: number;
    avgSentiment: number;
  };
  inventory: {
    totalProducts: number;
    lowStock: number;
    outOfStock: number;
  };
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface ConversionData {
  visitors: number;
  conversations: number;
  orders: number;
  conversionRate: number;
}

// ============================================
// Real-time Event Types
// ============================================

export type SocketEvent = 
  | 'conversation:new'
  | 'conversation:update'
  | 'message:new'
  | 'order:new'
  | 'order:update'
  | 'notification:new'
  | 'metrics:update';

export interface SocketMessage<T = unknown> {
  event: SocketEvent;
  data: T;
  timestamp: string;
  tenantId: string;
}

// ============================================
// Pulse Feed Types (Live Activity)
// ============================================

export interface PulseEvent {
  id: string;
  type: 'order' | 'conversation' | 'ai_action' | 'customer' | 'alert';
  icon: string;
  title: string;
  description: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}
