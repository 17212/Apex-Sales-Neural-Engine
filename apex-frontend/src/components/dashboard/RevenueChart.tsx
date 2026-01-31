'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RevenueChart.module.css';

// Mock data - would come from API
const mockData = [
  { date: 'السبت', revenue: 8500, orders: 28 },
  { date: 'الأحد', revenue: 9200, orders: 32 },
  { date: 'الاثنين', revenue: 7800, orders: 24 },
  { date: 'الثلاثاء', revenue: 11500, orders: 38 },
  { date: 'الأربعاء', revenue: 10200, orders: 35 },
  { date: 'الخميس', revenue: 12450, orders: 42 },
  { date: 'الجمعة', revenue: 9800, orders: 30 },
];

type Period = '7d' | '30d' | '90d';

export default function RevenueChart() {
  const [period, setPeriod] = useState<Period>('7d');

  const maxRevenue = Math.max(...mockData.map(d => d.revenue));
  const totalRevenue = mockData.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = mockData.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h3 className={styles.title}>📈 الإيرادات</h3>
          <div className={styles.summary}>
            <span className={styles.summaryValue}>{totalRevenue.toLocaleString()} ج.م</span>
            <span className={styles.summaryLabel}>إجمالي {totalOrders} طلب</span>
          </div>
        </div>
        <div className={styles.periodButtons}>
          {(['7d', '30d', '90d'] as Period[]).map((p) => (
            <button
              key={p}
              className={`${styles.periodBtn} ${period === p ? styles.active : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p === '7d' ? '7 أيام' : p === '30d' ? '30 يوم' : '90 يوم'}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className={styles.chart}>
        {mockData.map((item, index) => (
          <motion.div
            key={item.date}
            className={styles.bar}
            initial={{ height: 0 }}
            animate={{ height: `${(item.revenue / maxRevenue) * 100}%` }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
          >
            <div className={styles.barInner}>
              <div className={styles.tooltip}>
                <span className={styles.tooltipValue}>{item.revenue.toLocaleString()} ج.م</span>
                <span className={styles.tooltipOrders}>{item.orders} طلب</span>
              </div>
            </div>
            <span className={styles.barLabel}>{item.date}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
