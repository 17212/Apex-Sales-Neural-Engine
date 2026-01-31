// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Skeleton Loader Components
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-xl bg-[var(--bg-elevated)]" />
        <div className="flex-1">
          <div className="h-4 w-24 bg-[var(--bg-elevated)] rounded mb-2" />
          <div className="h-3 w-16 bg-[var(--bg-elevated)] rounded" />
        </div>
      </div>
      <div className="h-8 w-32 bg-[var(--bg-elevated)] rounded mb-2" />
      <div className="h-3 w-full bg-[var(--bg-elevated)] rounded" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-[var(--border-default)]">
        <div className="h-8 w-48 bg-[var(--bg-elevated)] rounded animate-pulse" />
      </div>
      <div className="divide-y divide-[var(--border-default)]">
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4 animate-pulse">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-elevated)]" />
            <div className="flex-1">
              <div className="h-4 w-32 bg-[var(--bg-elevated)] rounded mb-2" />
              <div className="h-3 w-24 bg-[var(--bg-elevated)] rounded" />
            </div>
            <div className="h-6 w-16 bg-[var(--bg-elevated)] rounded-full" />
            <div className="h-4 w-20 bg-[var(--bg-elevated)] rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonChart() {
  return (
    <div className="glass-card p-5 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="h-5 w-32 bg-[var(--bg-elevated)] rounded" />
        <div className="flex gap-2">
          <div className="h-8 w-16 bg-[var(--bg-elevated)] rounded" />
          <div className="h-8 w-16 bg-[var(--bg-elevated)] rounded" />
        </div>
      </div>
      <div className="h-64 bg-[var(--bg-elevated)] rounded-xl" />
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-8 w-48 bg-[var(--bg-elevated)] rounded mb-2" />
          <div className="h-4 w-64 bg-[var(--bg-elevated)] rounded" />
        </div>
        <div className="h-10 w-32 bg-[var(--bg-elevated)] rounded-lg" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <SkeletonChart />
        </div>
        <SkeletonCard />
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} rounded-full border-2 border-[var(--primary-500)] border-t-transparent`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-[var(--text-secondary)]">جاري التحميل...</p>
      </div>
    </motion.div>
  );
}
