// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Customers Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Filter,
  Eye,
  MessageSquare,
  Star,
  Crown,
  Users,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
} from 'lucide-react';

const mockCustomers = [
  {
    id: '1',
    name: 'أحمد محمد',
    phone: '+201001234567',
    email: 'ahmed@example.com',
    segment: 'vip',
    totalSpend: 234500,
    ordersCount: 12,
    lastOrder: '2026-01-31',
    loyaltyPoints: 2345,
    preferredChannel: 'whatsapp',
    joinedAt: '2025-06-15',
    avatar: null,
  },
  {
    id: '2',
    name: 'منى علي',
    phone: '+201112345678',
    email: 'mona@example.com',
    segment: 'regular',
    totalSpend: 45800,
    ordersCount: 5,
    lastOrder: '2026-01-28',
    loyaltyPoints: 458,
    preferredChannel: 'telegram',
    joinedAt: '2025-09-20',
    avatar: null,
  },
  {
    id: '3',
    name: 'محمد الشريف',
    phone: '+201223456789',
    email: 'mohamed@example.com',
    segment: 'new',
    totalSpend: 89999,
    ordersCount: 1,
    lastOrder: '2026-01-30',
    loyaltyPoints: 899,
    preferredChannel: 'messenger',
    joinedAt: '2026-01-30',
    avatar: null,
  },
  {
    id: '4',
    name: 'سارة أحمد',
    phone: '+201334567890',
    email: 'sara@example.com',
    segment: 'vip',
    totalSpend: 567000,
    ordersCount: 34,
    lastOrder: '2026-01-29',
    loyaltyPoints: 5670,
    preferredChannel: 'whatsapp',
    joinedAt: '2024-12-01',
    avatar: null,
  },
  {
    id: '5',
    name: 'عمر حسين',
    phone: '+201445678901',
    email: 'omar@example.com',
    segment: 'at_risk',
    totalSpend: 123000,
    ordersCount: 8,
    lastOrder: '2025-11-15',
    loyaltyPoints: 1230,
    preferredChannel: 'instagram',
    joinedAt: '2025-03-10',
    avatar: null,
  },
];

const segmentConfig: Record<string, { color: string; label: string; icon: any }> = {
  vip: { color: '#f59e0b', label: 'VIP', icon: Crown },
  regular: { color: '#22c55e', label: 'عادي', icon: Users },
  new: { color: '#3b82f6', label: 'جديد', icon: Star },
  at_risk: { color: '#ef4444', label: 'معرض للخسارة', icon: TrendingUp },
};

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  telegram: '#0088CC',
  messenger: '#0084FF',
  instagram: '#E4405F',
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');

  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchQuery) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSegment = segmentFilter === 'all' || customer.segment === segmentFilter;
    return matchesSearch && matchesSegment;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">العملاء</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إدارة قاعدة عملائك وتتبع سلوكهم
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          إضافة عميل
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-500)]/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">2,456</p>
              <p className="text-sm text-[var(--text-tertiary)]">إجمالي العملاء</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--warning)]/20 flex items-center justify-center">
              <Crown className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-[var(--text-tertiary)]">عملاء VIP</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--success)]/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">4.5M</p>
              <p className="text-sm text-[var(--text-tertiary)]">إجمالي المبيعات</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--info)]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[var(--info)]" />
            </div>
            <div>
              <p className="text-2xl font-bold">+12%</p>
              <p className="text-sm text-[var(--text-tertiary)]">نمو هذا الشهر</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="بحث بالاسم أو الهاتف أو البريد..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-10 text-sm"
          />
        </div>

        <div className="flex gap-2">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'vip', label: 'VIP' },
            { id: 'regular', label: 'عادي' },
            { id: 'new', label: 'جديد' },
            { id: 'at_risk', label: 'معرض للخسارة' },
          ].map((seg) => (
            <button
              key={seg.id}
              onClick={() => setSegmentFilter(seg.id)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                segmentFilter === seg.id
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {seg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredCustomers.map((customer, index) => {
            const segment = segmentConfig[customer.segment];
            const SegmentIcon = segment.icon;

            return (
              <motion.div
                key={customer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-5 group hover:border-[var(--primary-500)]/30 transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-bold text-lg">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{customer.name}</h3>
                      <p className="text-sm text-[var(--text-tertiary)]">{customer.phone}</p>
                    </div>
                  </div>
                  <span
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${segment.color}20`,
                      color: segment.color,
                    }}
                  >
                    <SegmentIcon className="w-3 h-3" />
                    {segment.label}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-lg bg-[var(--bg-tertiary)]">
                    <p className="text-lg font-bold">{customer.ordersCount}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">طلب</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--bg-tertiary)]">
                    <p className="text-lg font-bold">{(customer.totalSpend / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-[var(--text-tertiary)]">ج.م</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--bg-tertiary)]">
                    <p className="text-lg font-bold">{customer.loyaltyPoints}</p>
                    <p className="text-xs text-[var(--text-tertiary)]">نقطة</p>
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-tertiary)]">القناة المفضلة</span>
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-white"
                      style={{ backgroundColor: channelColors[customer.preferredChannel] }}
                    >
                      {customer.preferredChannel === 'whatsapp' ? '📱' : customer.preferredChannel === 'telegram' ? '✈️' : '💬'}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-tertiary)]">آخر طلب</span>
                    <span>{new Date(customer.lastOrder).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-default)]">
                  <button className="btn btn-secondary flex-1 text-sm">
                    <Eye className="w-4 h-4" />
                    عرض
                  </button>
                  <button className="btn btn-primary flex-1 text-sm">
                    <MessageSquare className="w-4 h-4" />
                    محادثة
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
