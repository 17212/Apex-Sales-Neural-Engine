// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Quick Actions Widget
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import {
  Plus,
  MessageSquare,
  Package,
  Users,
  FileText,
  Megaphone,
  Upload,
  Download,
} from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    id: 'new-order',
    label: 'طلب جديد',
    icon: Plus,
    href: '/dashboard/orders?action=new',
    color: '#22c55e',
    gradient: 'from-[#22c55e] to-[#16a34a]',
  },
  {
    id: 'send-broadcast',
    label: 'رسالة جماعية',
    icon: Megaphone,
    href: '/dashboard/broadcast',
    color: '#6366f1',
    gradient: 'from-[#6366f1] to-[#4f46e5]',
  },
  {
    id: 'add-product',
    label: 'إضافة منتج',
    icon: Package,
    href: '/dashboard/products?action=new',
    color: '#f59e0b',
    gradient: 'from-[#f59e0b] to-[#d97706]',
  },
  {
    id: 'add-customer',
    label: 'إضافة عميل',
    icon: Users,
    href: '/dashboard/customers?action=new',
    color: '#06b6d4',
    gradient: 'from-[#06b6d4] to-[#0891b2]',
  },
  {
    id: 'export-report',
    label: 'تصدير تقرير',
    icon: Download,
    href: '/dashboard/analytics?export=true',
    color: '#8b5cf6',
    gradient: 'from-[#8b5cf6] to-[#7c3aed]',
  },
  {
    id: 'import-products',
    label: 'استيراد Excel',
    icon: Upload,
    href: '/dashboard/products?import=true',
    color: '#ec4899',
    gradient: 'from-[#ec4899] to-[#db2777]',
  },
];

export function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <h3 className="font-semibold text-lg mb-4">الإجراءات السريعة</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link
              href={action.href}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-all group"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg`}
              >
                <action.icon className="w-6 h-6" />
              </div>
              <span className="text-sm text-center">{action.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
