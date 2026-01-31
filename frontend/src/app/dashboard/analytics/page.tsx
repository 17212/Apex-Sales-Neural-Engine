// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Analytics Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Bot,
  Calendar,
  Download,
} from 'lucide-react';

const revenueData = [
  { date: '1 يناير', revenue: 45000, profit: 12000 },
  { date: '5 يناير', revenue: 52000, profit: 15000 },
  { date: '10 يناير', revenue: 48000, profit: 13000 },
  { date: '15 يناير', revenue: 78000, profit: 24000 },
  { date: '20 يناير', revenue: 89000, profit: 28000 },
  { date: '25 يناير', revenue: 95000, profit: 32000 },
  { date: '30 يناير', revenue: 125000, profit: 45000 },
];

const channelData = [
  { name: 'واتساب', value: 45, color: '#25D366' },
  { name: 'تليجرام', value: 25, color: '#0088CC' },
  { name: 'ماسنجر', value: 20, color: '#0084FF' },
  { name: 'انستجرام', value: 10, color: '#E4405F' },
];

const hourlyData = [
  { hour: '00', orders: 2 },
  { hour: '03', orders: 1 },
  { hour: '06', orders: 5 },
  { hour: '09', orders: 25 },
  { hour: '12', orders: 42 },
  { hour: '15', orders: 38 },
  { hour: '18', orders: 55 },
  { hour: '21', orders: 35 },
];

const topProducts = [
  { name: 'iPhone 15 Pro Max', sales: 234, revenue: 13800000 },
  { name: 'AirPods Pro 2', sales: 567, revenue: 5100000 },
  { name: 'MacBook Pro 14"', sales: 89, revenue: 8000000 },
  { name: 'Apple Watch Ultra 2', sales: 156, revenue: 5460000 },
  { name: 'iPad Pro 12.9"', sales: 123, revenue: 5535000 },
];

const periods = [
  { id: '7d', label: '٧ أيام' },
  { id: '30d', label: '٣٠ يوم' },
  { id: '90d', label: '٩٠ يوم' },
  { id: 'year', label: 'سنة' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">التحليلات</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            تحليل مفصل لأداء متجرك
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 p-1 bg-[var(--bg-tertiary)] rounded-lg">
            {periods.map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  period === p.id
                    ? 'bg-[var(--primary-500)] text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary">
            <Download className="w-4 h-4" />
            تصدير تقرير
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="إجمالي الإيرادات"
          value="٥٣٢,٠٠٠"
          suffix="ج.م"
          change={18.5}
          icon={DollarSign}
          color="#22c55e"
        />
        <StatCard
          title="صافي الربح"
          value="١٦٩,٠٠٠"
          suffix="ج.م"
          change={12.3}
          icon={TrendingUp}
          color="#6366f1"
        />
        <StatCard
          title="إجمالي الطلبات"
          value="١,٢٣٤"
          change={8.7}
          icon={ShoppingCart}
          color="#f59e0b"
        />
        <StatCard
          title="كفاءة البوت"
          value="٨٩"
          suffix="%"
          change={5.2}
          icon={Bot}
          color="#06b6d4"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 glass-card p-5"
        >
          <h3 className="font-semibold text-lg mb-4">الإيرادات و الأرباح</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="profitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickFormatter={(v) => `${(v/1000)}k`} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26, 26, 36, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => [`${value.toLocaleString()} ج.م`, '']}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fill="url(#revenueGrad)" name="الإيرادات" />
                <Area type="monotone" dataKey="profit" stroke="#22c55e" fill="url(#profitGrad)" name="الربح" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Channel Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-lg mb-4">توزيع القنوات</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {channelData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {channelData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}</span>
                </div>
                <span className="text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-lg mb-4">الطلبات حسب الساعة</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} />
                <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(26, 26, 36, 0.95)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="orders" fill="#6366f1" radius={[4, 4, 0, 0]} name="الطلبات" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-5"
        >
          <h3 className="font-semibold text-lg mb-4">أفضل المنتجات</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center gap-4">
                <span className="w-6 h-6 rounded-full bg-[var(--primary-500)]/20 text-[var(--primary-500)] flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{product.sales} مبيعة</p>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">{(product.revenue / 1000000).toFixed(1)}M</p>
                  <p className="text-xs text-[var(--text-tertiary)]">ج.م</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  suffix,
  change,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  suffix?: string;
  change: number;
  icon: any;
  color: string;
}) {
  const isPositive = change > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div
          className={`flex items-center gap-1 text-sm ${
            isPositive ? 'text-[var(--success)]' : 'text-[var(--error)]'
          }`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{value}</span>
          {suffix && <span className="text-[var(--text-secondary)]">{suffix}</span>}
        </div>
        <p className="text-sm text-[var(--text-tertiary)] mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
