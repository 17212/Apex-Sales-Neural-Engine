// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Empty States Components
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import {
  PackageOpen,
  Users,
  MessageSquare,
  ShoppingCart,
  Search,
  FileQuestion,
  Inbox,
  BarChart2,
  Bot,
} from 'lucide-react';

interface EmptyStateProps {
  type: 'orders' | 'products' | 'customers' | 'messages' | 'search' | 'analytics' | 'training' | 'inbox' | 'general';
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const emptyStateConfig = {
  orders: {
    icon: ShoppingCart,
    title: 'لا توجد طلبات بعد',
    description: 'ابدأ في استقبال الطلبات من خلال قنوات التواصل المتصلة',
    color: '#6366f1',
  },
  products: {
    icon: PackageOpen,
    title: 'لا توجد منتجات',
    description: 'أضف منتجاتك الأولى لتظهر للعملاء عبر البوت',
    color: '#f59e0b',
  },
  customers: {
    icon: Users,
    title: 'لا يوجد عملاء',
    description: 'سيظهر العملاء هنا بمجرد بدء المحادثات',
    color: '#22c55e',
  },
  messages: {
    icon: MessageSquare,
    title: 'لا توجد محادثات',
    description: 'ستظهر المحادثات عند وصول رسائل جديدة',
    color: '#06b6d4',
  },
  search: {
    icon: Search,
    title: 'لا توجد نتائج',
    description: 'جرب تغيير كلمات البحث أو إزالة الفلاتر',
    color: '#8b5cf6',
  },
  analytics: {
    icon: BarChart2,
    title: 'لا توجد بيانات كافية',
    description: 'ستظهر التحليلات بعد جمع بيانات كافية',
    color: '#ec4899',
  },
  training: {
    icon: Bot,
    title: 'لا توجد بيانات تدريب',
    description: 'أضف بيانات لتدريب البوت على الرد بشكل أفضل',
    color: '#14b8a6',
  },
  inbox: {
    icon: Inbox,
    title: 'صندوق الوارد فارغ',
    description: 'لا توجد محادثات في الانتظار',
    color: '#3b82f6',
  },
  general: {
    icon: FileQuestion,
    title: 'لا توجد بيانات',
    description: 'لم نعثر على أي بيانات للعرض',
    color: '#71717a',
  },
};

export function EmptyState({ type, title, description, action }: EmptyStateProps) {
  const config = emptyStateConfig[type];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      {/* Icon Container */}
      <div className="relative mb-6">
        <motion.div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: `${config.color}15` }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="w-12 h-12" style={{ color: config.color }} />
        </motion.div>
        
        {/* Decorative circles */}
        <div
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full"
          style={{ backgroundColor: `${config.color}30` }}
        />
        <div
          className="absolute -bottom-1 -left-1 w-3 h-3 rounded-full"
          style={{ backgroundColor: `${config.color}20` }}
        />
      </div>

      {/* Text */}
      <h3 className="text-xl font-semibold mb-2">{title || config.title}</h3>
      <p className="text-[var(--text-secondary)] text-center max-w-sm">
        {description || config.description}
      </p>

      {/* Action */}
      {action && (
        <button
          onClick={action.onClick}
          className="mt-6 btn btn-primary"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}

export function SearchEmptyState({ query }: { query: string }) {
  return (
    <EmptyState
      type="search"
      title={`لا توجد نتائج لـ "${query}"`}
      description="جرب البحث بكلمات مختلفة أو تحقق من الفلاتر المحددة"
    />
  );
}

export function ConnectionEmptyState({ channel }: { channel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--warning)]/10 flex items-center justify-center mb-4">
        <span className="text-3xl">🔗</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">غير متصل بـ {channel}</h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-xs">
        اربط حسابك لبدء استقبال الرسائل والطلبات
      </p>
      <button className="mt-4 btn btn-primary text-sm">
        ربط الآن
      </button>
    </motion.div>
  );
}
