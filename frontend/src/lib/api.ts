// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - API Client
// ═══════════════════════════════════════════════════════════════════════════════

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiError {
  message: string;
  code?: string;
  status: number;
}

interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  success: boolean;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    // Try to get token from localStorage on init
    if (typeof window !== 'undefined') {
      const authData = localStorage.getItem('apex-auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        this.token = parsed.state?.token || null;
      }
    }
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: {
            message: data.error || data.message || 'An error occurred',
            status: response.status,
          },
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        error: {
          message: error instanceof Error ? error.message : 'Network error',
          status: 0,
        },
      };
    }
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request<{ token: string; user: any }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(data: { name: string; email: string; password: string }) {
    return this.request<{ token: string; user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getProfile() {
    return this.request<any>('/auth/me');
  }

  // Dashboard endpoints
  async getDashboardStats() {
    return this.request<any>('/dashboard/stats');
  }

  async getDashboardActivity() {
    return this.request<any>('/dashboard/activity');
  }

  async getDashboardCharts(period: string = '7d') {
    return this.request<any>(`/dashboard/charts?period=${period}`);
  }

  // Orders endpoints
  async getOrders(params?: { status?: string; page?: number; limit?: number }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any>(`/orders?${query}`);
  }

  async getOrder(id: string) {
    return this.request<any>(`/orders/${id}`);
  }

  async createOrder(data: any) {
    return this.request<any>('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request<any>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  // Products endpoints
  async getProducts(params?: { category?: string; page?: number; limit?: number }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any>(`/products?${query}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request<any>('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request<any>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request<any>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Customers endpoints
  async getCustomers(params?: { segment?: string; page?: number; limit?: number }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any>(`/customers?${query}`);
  }

  async getCustomer(id: string) {
    return this.request<any>(`/customers/${id}`);
  }

  // Conversations endpoints
  async getConversations(params?: { status?: string; channel?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any>(`/conversations/inbox?${query}`);
  }

  async getConversationMessages(id: string) {
    return this.request<any>(`/conversations/${id}/messages`);
  }

  async sendMessage(conversationId: string, content: string) {
    return this.request<any>(`/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // Analytics endpoints
  async getAnalytics(params?: { period?: string; type?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<any>(`/analytics?${query}`);
  }

  async getRevenueAnalytics(period: string = '30d') {
    return this.request<any>(`/analytics/revenue?period=${period}`);
  }

  async getChannelAnalytics() {
    return this.request<any>('/analytics/channels');
  }

  async getProductAnalytics() {
    return this.request<any>('/analytics/products');
  }

  // Channels endpoints
  async getChannels() {
    return this.request<any>('/channels');
  }

  async connectChannel(channel: string, config: any) {
    return this.request<any>(`/channels/${channel}/connect`, {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async disconnectChannel(channel: string) {
    return this.request<any>(`/channels/${channel}/disconnect`, {
      method: 'POST',
    });
  }

  // Training endpoints
  async getTrainingData() {
    return this.request<any>('/training');
  }

  async addTrainingData(data: any) {
    return this.request<any>('/training', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRules() {
    return this.request<any>('/training/rules');
  }

  async addRule(data: any) {
    return this.request<any>('/training/rules', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Settings endpoints
  async getSettings() {
    return this.request<any>('/settings');
  }

  async updateSettings(data: any) {
    return this.request<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Broadcast endpoints
  async sendBroadcast(data: {
    message: string;
    segment: string;
    channels: string[];
    scheduleTime?: string;
  }) {
    return this.request<any>('/broadcast', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getBroadcastHistory() {
    return this.request<any>('/broadcast/history');
  }
}

export const apiClient = new ApiClient(API_URL);

// React Query hooks helper
export const queryKeys = {
  dashboard: {
    stats: ['dashboard', 'stats'],
    activity: ['dashboard', 'activity'],
    charts: (period: string) => ['dashboard', 'charts', period],
  },
  orders: {
    all: ['orders'],
    list: (params: any) => ['orders', 'list', params],
    detail: (id: string) => ['orders', 'detail', id],
  },
  products: {
    all: ['products'],
    list: (params: any) => ['products', 'list', params],
    detail: (id: string) => ['products', 'detail', id],
  },
  customers: {
    all: ['customers'],
    list: (params: any) => ['customers', 'list', params],
    detail: (id: string) => ['customers', 'detail', id],
  },
  conversations: {
    all: ['conversations'],
    list: (params: any) => ['conversations', 'list', params],
    messages: (id: string) => ['conversations', 'messages', id],
  },
  analytics: {
    all: ['analytics'],
    revenue: (period: string) => ['analytics', 'revenue', period],
    channels: ['analytics', 'channels'],
    products: ['analytics', 'products'],
  },
  training: {
    data: ['training', 'data'],
    rules: ['training', 'rules'],
  },
  settings: ['settings'],
};
