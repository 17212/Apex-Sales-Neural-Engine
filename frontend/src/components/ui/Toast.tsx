// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Toast Notifications
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
  Bell,
  MessageSquare,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'warning' | 'info' | 'order' | 'message' | 'payment';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }));
    
    // Auto remove after duration
    const duration = toast.duration || 5000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));

const toastConfig: Record<ToastType, { icon: any; color: string; bgColor: string }> = {
  success: { icon: CheckCircle, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
  error: { icon: XCircle, color: '#ef4444', bgColor: 'rgba(239, 68, 68, 0.1)' },
  warning: { icon: AlertTriangle, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)' },
  info: { icon: Info, color: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.1)' },
  order: { icon: ShoppingCart, color: '#6366f1', bgColor: 'rgba(99, 102, 241, 0.1)' },
  message: { icon: MessageSquare, color: '#06b6d4', bgColor: 'rgba(6, 182, 212, 0.1)' },
  payment: { icon: DollarSign, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)' },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 left-4 z-[100] flex flex-col-reverse gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => {
          const config = toastConfig[toast.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: -100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.9 }}
              className="glass-card p-4 flex items-start gap-3 shadow-2xl min-w-[300px]"
              style={{ borderLeft: `4px solid ${config.color}` }}
            >
              <div
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: config.bgColor }}
              >
                <Icon className="w-5 h-5" style={{ color: config.color }} />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <p className="font-medium text-sm">{toast.title}</p>
                {toast.message && (
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">
                    {toast.message}
                  </p>
                )}
                {toast.action && (
                  <button
                    onClick={toast.action.onClick}
                    className="text-xs font-medium mt-2"
                    style={{ color: config.color }}
                  >
                    {toast.action.label}
                  </button>
                )}
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

// Helper functions
export const toast = {
  success: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'success', title, message }),
  error: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'error', title, message }),
  warning: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'warning', title, message }),
  info: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'info', title, message }),
  order: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'order', title, message }),
  message: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'message', title, message }),
  payment: (title: string, message?: string) => 
    useToastStore.getState().addToast({ type: 'payment', title, message }),
};
