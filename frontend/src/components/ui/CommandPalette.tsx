// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Command Palette (Spotlight Search)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Command,
  Home,
  MessageSquare,
  ShoppingCart,
  Package,
  Users,
  BarChart2,
  Settings,
  Bot,
  Link2,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Plus,
  FileText,
  Bell,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  icon: any;
  shortcut?: string;
  action?: () => void;
  href?: string;
  category: string;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: CommandItem[] = [
    // Navigation
    { id: 'home', label: 'الرئيسية', icon: Home, href: '/dashboard', category: 'التنقل', keywords: ['home', 'dashboard'] },
    { id: 'inbox', label: 'صندوق الوارد', icon: MessageSquare, href: '/dashboard/inbox', category: 'التنقل', keywords: ['inbox', 'messages', 'chat'] },
    { id: 'orders', label: 'الطلبات', icon: ShoppingCart, href: '/dashboard/orders', category: 'التنقل', keywords: ['orders', 'sales'] },
    { id: 'products', label: 'المنتجات', icon: Package, href: '/dashboard/products', category: 'التنقل', keywords: ['products', 'items'] },
    { id: 'customers', label: 'العملاء', icon: Users, href: '/dashboard/customers', category: 'التنقل', keywords: ['customers', 'clients'] },
    { id: 'analytics', label: 'التحليلات', icon: BarChart2, href: '/dashboard/analytics', category: 'التنقل', keywords: ['analytics', 'reports'] },
    { id: 'channels', label: 'القنوات', icon: Link2, href: '/dashboard/channels', category: 'التنقل', keywords: ['channels', 'whatsapp', 'telegram'] },
    { id: 'training', label: 'تدريب البوت', icon: Bot, href: '/dashboard/training', category: 'التنقل', keywords: ['training', 'bot', 'ai'] },
    { id: 'settings', label: 'الإعدادات', icon: Settings, href: '/dashboard/settings', category: 'التنقل', keywords: ['settings', 'preferences'] },
    
    // Actions
    { id: 'new-order', label: 'إنشاء طلب جديد', icon: Plus, href: '/dashboard/orders?new=true', category: 'إجراءات سريعة', shortcut: 'N' },
    { id: 'new-product', label: 'إضافة منتج', icon: Package, href: '/dashboard/products?new=true', category: 'إجراءات سريعة' },
    { id: 'export-report', label: 'تصدير تقرير', icon: FileText, href: '/dashboard/analytics?export=true', category: 'إجراءات سريعة' },
    
    // Help
    { id: 'help', label: 'المساعدة والدعم', icon: HelpCircle, category: 'مساعدة', action: () => window.open('https://t.me/IDRV72', '_blank') },
    { id: 'notifications', label: 'الإشعارات', icon: Bell, href: '/dashboard/notifications', category: 'مساعدة' },
  ];

  const filteredCommands = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.keywords?.some((k) => k.includes(query.toLowerCase()))
      )
    : commands;

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  const flatCommands = Object.values(groupedCommands).flat();

  const handleSelect = useCallback(
    (command: CommandItem) => {
      if (command.action) {
        command.action();
      } else if (command.href) {
        router.push(command.href);
      }
      onClose();
      setQuery('');
    },
    [router, onClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % flatCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + flatCommands.length) % flatCommands.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (flatCommands[selectedIndex]) {
            handleSelect(flatCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    },
    [isOpen, flatCommands, selectedIndex, handleSelect, onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50"
          >
            <div className="glass-card overflow-hidden shadow-2xl">
              {/* Search Input */}
              <div className="flex items-center gap-3 p-4 border-b border-[var(--border-default)]">
                <Search className="w-5 h-5 text-[var(--text-tertiary)]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث أو اكتب أمر..."
                  className="flex-1 bg-transparent border-none outline-none text-[var(--text-primary)] placeholder:text-[var(--text-muted)]"
                />
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[var(--bg-tertiary)] text-xs text-[var(--text-tertiary)]">
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </div>
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto p-2">
                {Object.entries(groupedCommands).map(([category, items]) => (
                  <div key={category} className="mb-2">
                    <p className="px-3 py-2 text-xs text-[var(--text-tertiary)] font-medium">
                      {category}
                    </p>
                    {items.map((item, index) => {
                      const globalIndex = flatCommands.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            isSelected
                              ? 'bg-[var(--primary-500)]/10 text-[var(--primary-400)]'
                              : 'hover:bg-[var(--bg-tertiary)]'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="flex-1 text-right">{item.label}</span>
                          {item.shortcut && (
                            <span className="px-2 py-0.5 rounded bg-[var(--bg-tertiary)] text-xs text-[var(--text-tertiary)]">
                              {item.shortcut}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {flatCommands.length === 0 && (
                  <div className="py-8 text-center text-[var(--text-tertiary)]">
                    لا توجد نتائج لـ "{query}"
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border-default)] text-xs text-[var(--text-tertiary)]">
                <div className="flex items-center gap-4">
                  <span>↑↓ للتنقل</span>
                  <span>↵ للفتح</span>
                  <span>Esc للإغلاق</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to open command palette with Cmd+K
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return { isOpen, setIsOpen, toggle: () => setIsOpen((prev) => !prev) };
}
