// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Stats Card Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  gradient: string;
  pulse?: boolean;
}

export function StatsCard({
  title,
  value,
  suffix,
  change,
  changeLabel,
  icon: Icon,
  gradient,
  pulse,
}: StatsCardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
      className="glass-card p-5 relative overflow-hidden group"
    >
      {/* Background Gradient */}
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-l ${gradient}`}
      />
      
      {/* Glow Effect */}
      <div
        className={`absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-10 bg-gradient-to-br ${gradient} blur-3xl transition-opacity group-hover:opacity-20`}
      />

      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} shadow-lg ${
              pulse ? 'animate-glow' : ''
            }`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {change !== undefined && (
            <div
              className={`flex items-center gap-0.5 text-sm ${
                isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>

        {/* Value */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold">{value}</span>
            {suffix && (
              <span className="text-lg text-[var(--text-secondary)]">{suffix}</span>
            )}
          </div>
          <p className="text-sm text-[var(--text-secondary)]">{title}</p>
          {changeLabel && (
            <p className="text-xs text-[var(--text-tertiary)]">{changeLabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
