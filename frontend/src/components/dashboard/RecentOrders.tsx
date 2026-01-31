// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Recent Orders Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import { Eye, Package, Truck, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const orders = [
  {
    id: '#1234',
    customer: 'أحمد محمد',
    products: 3,
    total: 2450,
    status: 'confirmed',
    channel: 'whatsapp',
    time: 'منذ 5 دقائق',
  },
  {
    id: '#1233',
    customer: 'منى علي',
    products: 1,
    total: 999,
    status: 'shipped',
    channel: 'telegram',
    time: 'منذ 15 دقيقة',
  },
  {
    id: '#1232',
    customer: 'محمد الشريف',
    products: 5,
    total: 5200,
    status: 'pending',
    channel: 'messenger',
    time: 'منذ 30 دقيقة',
  },
  {
    id: '#1231',
    customer: 'سارة أحمد',
    products: 2,
    total: 1800,
    status: 'delivered',
    channel: 'whatsapp',
    time: 'منذ ساعة',
  },
  {
    id: '#1230',
    customer: 'عمر حسين',
    products: 1,
    total: 450,
    status: 'cancelled',
    channel: 'instagram',
    time: 'منذ ساعتين',
  },
];

const statusConfig: Record<string, { color: string; label: string; icon: any }> = {
  pending: { color: 'var(--warning)', label: 'قيد الانتظار', icon: Package },
  confirmed: { color: 'var(--info)', label: 'مؤكد', icon: CheckCircle },
  shipped: { color: 'var(--secondary-500)', label: 'تم الشحن', icon: Truck },
  delivered: { color: 'var(--success)', label: 'تم التسليم', icon: CheckCircle },
  cancelled: { color: 'var(--error)', label: 'ملغي', icon: XCircle },
};

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  telegram: '#0088CC',
  messenger: '#0084FF',
  instagram: '#E4405F',
};

export function RecentOrders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">آخر الطلبات</h3>
        <Link
          href="/dashboard/orders"
          className="text-sm text-[var(--primary-400)] hover:underline"
        >
          عرض الكل
        </Link>
      </div>

      <div className="space-y-3">
        {orders.map((order, index) => {
          const status = statusConfig[order.status];
          const StatusIcon = status.icon;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors group"
            >
              {/* Channel Indicator */}
              <div
                className="w-1 h-10 rounded-full"
                style={{ backgroundColor: channelColors[order.channel] }}
              />

              {/* Order Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{order.id}</span>
                  <span className="text-[var(--text-tertiary)]">•</span>
                  <span className="text-sm text-[var(--text-secondary)] truncate">
                    {order.customer}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {order.products} منتجات
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{order.time}</span>
                </div>
              </div>

              {/* Status */}
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs"
                style={{
                  backgroundColor: `${status.color}15`,
                  color: status.color,
                }}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{status.label}</span>
              </div>

              {/* Total */}
              <div className="text-left">
                <span className="font-semibold">{order.total.toLocaleString()}</span>
                <span className="text-sm text-[var(--text-tertiary)]"> ج.م</span>
              </div>

              {/* Action */}
              <button className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] transition-all">
                <Eye className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
