// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Orders Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  MoreHorizontal,
} from 'lucide-react';

const mockOrders = [
  {
    id: 'ORD-1234',
    customer: { name: 'أحمد محمد', phone: '+201001234567' },
    items: [{ name: 'iPhone 15 Pro Max', qty: 1, price: 58999 }],
    total: 58999,
    status: 'confirmed',
    paymentStatus: 'paid',
    channel: 'whatsapp',
    createdAt: '2026-01-31T10:30:00',
    shippingAddress: 'القاهرة - مدينة نصر',
  },
  {
    id: 'ORD-1233',
    customer: { name: 'منى علي', phone: '+201112345678' },
    items: [
      { name: 'AirPods Pro 2', qty: 2, price: 8999 },
      { name: 'iPhone Case', qty: 1, price: 499 },
    ],
    total: 18497,
    status: 'shipped',
    paymentStatus: 'paid',
    channel: 'telegram',
    createdAt: '2026-01-30T15:20:00',
    shippingAddress: 'الإسكندرية - سيدي جابر',
  },
  {
    id: 'ORD-1232',
    customer: { name: 'محمد الشريف', phone: '+201223456789' },
    items: [{ name: 'MacBook Pro 14"', qty: 1, price: 89999 }],
    total: 89999,
    status: 'pending',
    paymentStatus: 'unpaid',
    channel: 'messenger',
    createdAt: '2026-01-30T09:15:00',
    shippingAddress: 'الجيزة - 6 أكتوبر',
  },
  {
    id: 'ORD-1231',
    customer: { name: 'سارة أحمد', phone: '+201334567890' },
    items: [{ name: 'Apple Watch Ultra 2', qty: 1, price: 34999 }],
    total: 34999,
    status: 'delivered',
    paymentStatus: 'paid',
    channel: 'instagram',
    createdAt: '2026-01-29T14:00:00',
    shippingAddress: 'المنصورة - حي الجامعة',
  },
  {
    id: 'ORD-1230',
    customer: { name: 'عمر حسين', phone: '+201445678901' },
    items: [{ name: 'iPad Pro 12.9"', qty: 1, price: 44999 }],
    total: 44999,
    status: 'cancelled',
    paymentStatus: 'refunded',
    channel: 'whatsapp',
    createdAt: '2026-01-28T11:30:00',
    shippingAddress: 'طنطا - شارع البحر',
  },
];

const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
  pending: { color: '#f59e0b', label: 'قيد الانتظار', icon: Clock },
  confirmed: { color: '#3b82f6', label: 'مؤكد', icon: CheckCircle },
  processing: { color: '#8b5cf6', label: 'جاري التجهيز', icon: Package },
  shipped: { color: '#06b6d4', label: 'تم الشحن', icon: Truck },
  delivered: { color: '#22c55e', label: 'تم التسليم', icon: CheckCircle },
  cancelled: { color: '#ef4444', label: 'ملغي', icon: XCircle },
};

const paymentStatusColors: Record<string, string> = {
  paid: '#22c55e',
  unpaid: '#f59e0b',
  refunded: '#8b5cf6',
  failed: '#ef4444',
};

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  telegram: '#0088CC',
  messenger: '#0084FF',
  instagram: '#E4405F',
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الطلبات</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إدارة ومتابعة جميع الطلبات
          </p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            تصدير
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            طلب جديد
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'إجمالي الطلبات', value: '1,234', color: 'var(--primary-500)' },
          { label: 'قيد الانتظار', value: '47', color: '#f59e0b' },
          { label: 'جاري الشحن', value: '23', color: '#06b6d4' },
          { label: 'تم التسليم', value: '1,089', color: '#22c55e' },
          { label: 'ملغي', value: '75', color: '#ef4444' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-sm text-[var(--text-tertiary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="بحث برقم الطلب أو اسم العميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-10 text-sm"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                statusFilter === status
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {status === 'all' ? 'الكل' : statusConfig[status]?.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  رقم الطلب
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  العميل
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  المنتجات
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  الإجمالي
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  الحالة
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  الدفع
                </th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">
                  القناة
                </th>
                <th className="text-center p-4 text-sm font-medium text-[var(--text-secondary)]">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredOrders.map((order, index) => {
                  const status = statusConfig[order.status];
                  const StatusIcon = status.icon;

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] transition-colors"
                    >
                      <td className="p-4">
                        <span className="font-mono font-medium">{order.id}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{order.customer.name}</p>
                          <p className="text-xs text-[var(--text-tertiary)]">
                            {order.customer.phone}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {order.items.slice(0, 2).map((item, i) => (
                            <p key={i} className="text-sm">
                              {item.name} × {item.qty}
                            </p>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-xs text-[var(--text-tertiary)]">
                              +{order.items.length - 2} منتجات أخرى
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold">
                          {order.total.toLocaleString()} ج.م
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            backgroundColor: `${status.color}15`,
                            color: status.color,
                          }}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${paymentStatusColors[order.paymentStatus]}15`,
                            color: paymentStatusColors[order.paymentStatus],
                          }}
                        >
                          {order.paymentStatus === 'paid'
                            ? 'مدفوع'
                            : order.paymentStatus === 'unpaid'
                            ? 'غير مدفوع'
                            : order.paymentStatus === 'refunded'
                            ? 'مسترجع'
                            : 'فشل'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                          style={{ backgroundColor: channelColors[order.channel] }}
                        >
                          {order.channel === 'whatsapp'
                            ? '📱'
                            : order.channel === 'telegram'
                            ? '✈️'
                            : order.channel === 'messenger'
                            ? '💬'
                            : '📸'}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 rounded-lg hover:bg-[var(--error)]/10 text-[var(--error)]">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-[var(--border-default)] flex items-center justify-between">
          <p className="text-sm text-[var(--text-tertiary)]">
            عرض 1-{filteredOrders.length} من {mockOrders.length} طلب
          </p>
          <div className="flex gap-2">
            <button className="btn btn-ghost text-sm" disabled>
              السابق
            </button>
            <button className="btn btn-ghost text-sm">
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
