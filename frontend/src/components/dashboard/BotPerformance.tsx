// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Bot Performance Widget
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, CheckCircle, XCircle, ArrowRight, Zap } from 'lucide-react';

const metrics = [
  {
    label: 'الردود الناجحة',
    value: 1234,
    total: 1389,
    percentage: 89,
    color: '#22c55e',
  },
  {
    label: 'تحويلات للإنسان',
    value: 155,
    total: 1389,
    percentage: 11,
    color: '#f59e0b',
  },
  {
    label: 'طلبات مغلقة',
    value: 432,
    total: 1234,
    percentage: 35,
    color: '#6366f1',
  },
];

const recentBotActions = [
  { id: '1', action: 'رد على سؤال عن الأسعار', customer: 'أحمد محمد', time: 'منذ 2 دقيقة', success: true },
  { id: '2', action: 'أتم طلب كامل', customer: 'منى علي', time: 'منذ 5 دقائق', success: true },
  { id: '3', action: 'حول لإنسان (غضب)', customer: 'محمد الشريف', time: 'منذ 8 دقائق', success: false },
  { id: '4', action: 'أرسل عرض خصم', customer: 'سارة أحمد', time: 'منذ 12 دقيقة', success: true },
];

export function BotPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--success)] border-2 border-[var(--bg-secondary)]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg">أداء البوت</h3>
            <p className="text-sm text-[var(--text-tertiary)]">آخر 24 ساعة</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[var(--warning)]" />
          <span className="text-sm text-[var(--success)]">نشط</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4 mb-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-[var(--text-secondary)]">{metric.label}</span>
              <span className="text-sm font-medium">
                {metric.value.toLocaleString()} / {metric.total.toLocaleString()}
              </span>
            </div>
            <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${metric.percentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full rounded-full"
                style={{ backgroundColor: metric.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Actions */}
      <div>
        <h4 className="text-sm font-medium text-[var(--text-secondary)] mb-3">آخر الإجراءات</h4>
        <div className="space-y-2">
          {recentBotActions.map((action) => (
            <div
              key={action.id}
              className="flex items-center gap-3 p-2 rounded-lg bg-[var(--bg-tertiary)]/50"
            >
              {action.success ? (
                <CheckCircle className="w-4 h-4 text-[var(--success)]" />
              ) : (
                <XCircle className="w-4 h-4 text-[var(--warning)]" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{action.action}</p>
                <p className="text-xs text-[var(--text-tertiary)]">
                  {action.customer} • {action.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All */}
      <button className="w-full mt-4 py-2 rounded-lg bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] transition-colors flex items-center justify-center gap-2">
        عرض سجل كامل
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}
