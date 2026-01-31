// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Header Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Bot,
  Pause,
  Command,
  Info,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { CommandPalette, useCommandPalette } from '@/components/ui/CommandPalette';
import { AboutModal } from '@/components/AboutModal';

export function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [botActive, setBotActive] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const { isOpen: showCommandPalette, setIsOpen: setShowCommandPalette } = useCommandPalette();
  const { user, logout } = useAuthStore();

  return (
    <>
      {/* Command Palette */}
      <CommandPalette isOpen={showCommandPalette} onClose={() => setShowCommandPalette(false)} />
      
      {/* About Modal */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      
      <header className="h-16 bg-[var(--bg-secondary)] border-b border-[var(--border-default)] px-6 flex items-center justify-between">
        {/* Search - Opens Command Palette */}
        <div className="flex-1 max-w-md">
          <button
            onClick={() => setShowCommandPalette(true)}
            className="relative w-full text-right"
          >
            <div className="input pr-11 w-full flex items-center justify-between text-[var(--text-tertiary)] cursor-pointer hover:border-[var(--border-hover)]">
              <span className="text-sm">بحث في الطلبات، العملاء، المنتجات...</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-xs">
                <Command className="w-3 h-3" />
                <span>K</span>
              </div>
            </div>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Bot Status Toggle */}
          <button
            onClick={() => setBotActive(!botActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all ${
              botActive
                ? 'bg-[var(--success)]/10 text-[var(--success)]'
                : 'bg-[var(--warning)]/10 text-[var(--warning)]'
            }`}
          >
            {botActive ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                <Bot className="w-4 h-4" />
                <span>البوت نشط</span>
              </>
            ) : (
              <>
                <Pause className="w-4 h-4" />
                <span>البوت متوقف</span>
              </>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--error)]" />
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 w-80 glass-card p-4 z-50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">الإشعارات</h3>
                    <button className="text-sm text-[var(--primary-400)]">
                      تحديد الكل كمقروء
                    </button>
                  </div>
                  <div className="space-y-3">
                    <NotificationItem
                      title="طلب جديد #1234"
                      message="أحمد محمد طلب 3 منتجات"
                      time="منذ 5 دقائق"
                      type="order"
                    />
                    <NotificationItem
                      title="عميل VIP يحتاج مساعدة"
                      message="تحويل من البوت - عميل غاضب"
                      time="منذ 10 دقائق"
                      type="alert"
                    />
                    <NotificationItem
                      title="مخزون منخفض"
                      message="iPhone 15 Pro - باقي 3 قطع فقط"
                      time="منذ 30 دقيقة"
                      type="warning"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                <p className="text-xs text-[var(--text-tertiary)]">{user?.role || 'Owner'}</p>
              </div>
            </button>

            <AnimatePresence>
              {showProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 w-48 glass-card py-2 z-50"
                >
                  <ProfileMenuItem icon={User} label="الملف الشخصي" />
                  <ProfileMenuItem icon={Settings} label="الإعدادات" />
                  <button
                    onClick={() => setShowAbout(true)}
                    className="flex items-center gap-3 px-4 py-2 w-full text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Info className="w-4 h-4" />
                    <span>حول التطبيق</span>
                  </button>
                  <div className="my-2 border-t border-[var(--border-default)]" />
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2 w-full text-[var(--error)] hover:bg-[var(--error)]/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
    </>
  );
}

function NotificationItem({
  title,
  message,
  time,
  type,
}: {
  title: string;
  message: string;
  time: string;
  type: 'order' | 'alert' | 'warning';
}) {
  const colors = {
    order: 'var(--success)',
    alert: 'var(--error)',
    warning: 'var(--warning)',
  };

  return (
    <div className="flex gap-3 p-2 rounded-lg hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
      <div
        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
        style={{ backgroundColor: colors[type] }}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{title}</p>
        <p className="text-xs text-[var(--text-tertiary)] truncate">{message}</p>
        <p className="text-xs text-[var(--text-muted)] mt-1">{time}</p>
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <button className="flex items-center gap-3 px-4 py-2 w-full text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors">
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
