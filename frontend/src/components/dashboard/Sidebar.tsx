// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Sidebar Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  MessageSquare,
  ShoppingCart,
  Package,
  Users,
  Settings,
  BarChart3,
  Bot,
  Plug,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  Megaphone,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';

const menuItems = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'inbox', label: 'صندوق الوارد', icon: MessageSquare, href: '/dashboard/inbox', badge: true },
  { id: 'orders', label: 'الطلبات', icon: ShoppingCart, href: '/dashboard/orders' },
  { id: 'products', label: 'المنتجات', icon: Package, href: '/dashboard/products' },
  { id: 'customers', label: 'العملاء', icon: Users, href: '/dashboard/customers' },
  { id: 'analytics', label: 'التحليلات', icon: BarChart3, href: '/dashboard/analytics' },
  { id: 'broadcast', label: 'الرسائل الجماعية', icon: Megaphone, href: '/dashboard/broadcast' },
  { id: 'divider1', type: 'divider' },
  { id: 'bot', label: 'تدريب البوت', icon: Bot, href: '/dashboard/training' },
  { id: 'channels', label: 'القنوات', icon: Plug, href: '/dashboard/channels' },
  { id: 'payments', label: 'المدفوعات', icon: CreditCard, href: '/dashboard/payments' },
  { id: 'divider2', type: 'divider' },
  { id: 'settings', label: 'الإعدادات', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="h-screen bg-[var(--bg-secondary)] border-l border-[var(--border-default)] flex flex-col relative"
    >
      {/* Logo */}
      <div className="p-4 border-b border-[var(--border-default)]">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center shadow-lg">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              <h1 className="font-bold text-lg gradient-text">Apex Sales</h1>
              <p className="text-xs text-[var(--text-tertiary)]">Neural Engine</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => {
            if (item.type === 'divider') {
              return <li key={item.id} className="my-4 border-t border-[var(--border-default)]" />;
            }

            const Icon = item.icon!;
            const isActive = pathname === item.href;

            return (
              <li key={item.id}>
                <Link
                  href={item.href!}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-[var(--primary-500)]/10 text-[var(--primary-400)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--primary-500)] rounded-l-full"
                    />
                  )}
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-[var(--primary-400)]' : ''}`} />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {item.badge && !collapsed && (
                    <span className="w-2 h-2 rounded-full bg-[var(--error)] animate-pulse" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-[var(--border-default)]">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-[var(--text-secondary)] hover:bg-[var(--error)]/10 hover:text-[var(--error)] transition-all"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>تسجيل الخروج</span>}
        </button>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-20 w-6 h-6 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </motion.aside>
  );
}
