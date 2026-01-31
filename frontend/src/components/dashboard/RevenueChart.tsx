// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Revenue Chart Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockData = [
  { date: '٢٥', revenue: 4500, orders: 12 },
  { date: '٢٦', revenue: 6200, orders: 18 },
  { date: '٢٧', revenue: 8100, orders: 24 },
  { date: '٢٨', revenue: 5800, orders: 15 },
  { date: '٢٩', revenue: 12400, orders: 32 },
  { date: '٣٠', revenue: 15200, orders: 41 },
  { date: '٣١', revenue: 25450, orders: 47 },
];

const periods = [
  { id: '7d', label: '٧ أيام' },
  { id: '30d', label: '٣٠ يوم' },
  { id: '90d', label: '٩٠ يوم' },
];

export function RevenueChart() {
  const [period, setPeriod] = useState('7d');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg">إحصائيات الإيرادات</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            مقارنة الإيرادات والطلبات
          </p>
        </div>
        
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
      </div>

      {/* Chart */}
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#71717a', fontSize: 12 }}
              width={60}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(26, 26, 36, 0.95)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
              labelStyle={{ color: '#fff', fontWeight: 'bold' }}
              itemStyle={{ color: '#a1a1aa' }}
              formatter={(value: number, name: string) => [
                name === 'revenue' ? `${value.toLocaleString()} ج.م` : value,
                name === 'revenue' ? 'الإيرادات' : 'الطلبات',
              ]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#22d3ee"
              strokeWidth={2}
              fill="url(#ordersGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#6366f1]" />
          <span className="text-sm text-[var(--text-secondary)]">الإيرادات</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#22d3ee]" />
          <span className="text-sm text-[var(--text-secondary)]">الطلبات</span>
        </div>
      </div>
    </motion.div>
  );
}
