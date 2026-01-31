// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Dashboard Home Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import {
  TrendingUp,
  ShoppingCart,
  Users,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Bot,
  Clock,
} from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { ChannelDistribution } from '@/components/dashboard/ChannelDistribution';
import { LiveConversations } from '@/components/dashboard/LiveConversations';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { BotPerformance } from '@/components/dashboard/BotPerformance';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            مرحباً! إليك نظرة عامة على أداء متجرك اليوم
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
          <Clock className="w-4 h-4" />
          <span>آخر تحديث: منذ دقيقة</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="إيرادات اليوم"
          value="٢٥,٤٥٠"
          suffix="ج.م"
          change={12.5}
          changeLabel="من أمس"
          icon={DollarSign}
          gradient="from-[#10b981] to-[#34d399]"
        />
        <StatsCard
          title="الطلبات اليوم"
          value="٤٧"
          change={8}
          changeLabel="من أمس"
          icon={ShoppingCart}
          gradient="from-[#6366f1] to-[#8b5cf6]"
        />
        <StatsCard
          title="محادثات نشطة"
          value="١٢"
          change={-3}
          changeLabel="الآن"
          icon={MessageSquare}
          gradient="from-[#f59e0b] to-[#fbbf24]"
          pulse
        />
        <StatsCard
          title="كفاءة البوت"
          value="٨٩"
          suffix="%"
          change={5}
          changeLabel="هذا الأسبوع"
          icon={Bot}
          gradient="from-[#06b6d4] to-[#22d3ee]"
        />
      </div>

      {/* AI Insights + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIInsights />
        <QuickActions />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <ChannelDistribution />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentOrders />
        <LiveConversations />
        <BotPerformance />
      </div>
    </div>
  );
}
