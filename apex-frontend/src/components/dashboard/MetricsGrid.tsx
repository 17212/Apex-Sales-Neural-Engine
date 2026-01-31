'use client';

import { motion } from 'framer-motion';
import styles from './MetricsGrid.module.css';

const metrics = [
  {
    label: 'إيرادات اليوم',
    value: '12,450',
    unit: 'ج.م',
    change: '+15%',
    changeType: 'positive',
    icon: '💰',
  },
  {
    label: 'الطلبات',
    value: '34',
    unit: 'طلب',
    change: '+8',
    changeType: 'positive',
    icon: '🛒',
  },
  {
    label: 'المحادثات النشطة',
    value: '12',
    unit: '',
    change: '-3',
    changeType: 'negative',
    icon: '💬',
  },
  {
    label: 'رضا العملاء',
    value: '94',
    unit: '%',
    change: '+2%',
    changeType: 'positive',
    icon: '⭐',
  },
  {
    label: 'AI Success Rate',
    value: '89',
    unit: '%',
    change: '+5%',
    changeType: 'positive',
    icon: '🤖',
  },
  {
    label: 'منتجات Low Stock',
    value: '7',
    unit: '',
    change: '+2',
    changeType: 'warning',
    icon: '⚠️',
  },
];

export default function MetricsGrid() {
  return (
    <div className={styles.grid}>
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <div className={styles.header}>
            <span className={styles.icon}>{metric.icon}</span>
            <span className={`${styles.change} ${styles[metric.changeType]}`}>
              {metric.change}
            </span>
          </div>
          <div className={styles.value}>
            <span className={styles.number}>{metric.value}</span>
            {metric.unit && <span className={styles.unit}>{metric.unit}</span>}
          </div>
          <div className={styles.label}>{metric.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
