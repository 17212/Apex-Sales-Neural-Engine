'use client';

import { motion, AnimatePresence } from 'framer-motion';
import styles from './PulseFeed.module.css';

// Mock data - would come from real-time API/WebSocket
const pulseEvents = [
  {
    id: '1',
    type: 'order',
    icon: '🛒',
    title: 'طلب جديد #APX-1234',
    description: 'أحمد محمود - 1,250 ج.م',
    time: 'منذ 2 دقيقة',
  },
  {
    id: '2',
    type: 'ai',
    icon: '🤖',
    title: 'AI أتم محادثة',
    description: 'سارة أحمد - تم تحويل لطلب',
    time: 'منذ 5 دقائق',
  },
  {
    id: '3',
    type: 'conversation',
    icon: '💬',
    title: 'محادثة جديدة',
    description: 'محمد علي - استفسار عن المنتج',
    time: 'منذ 8 دقائق',
  },
  {
    id: '4',
    type: 'order',
    icon: '✅',
    title: 'طلب تم تسليمه',
    description: 'نورا حسن - #APX-1198',
    time: 'منذ 15 دقيقة',
  },
  {
    id: '5',
    type: 'alert',
    icon: '⚠️',
    title: 'مخزون منخفض',
    description: 'iPhone 15 Pro - 3 وحدات متبقية',
    time: 'منذ 20 دقيقة',
  },
  {
    id: '6',
    type: 'customer',
    icon: '⭐',
    title: 'تقييم جديد',
    description: 'عميل جديد أعطى 5 نجوم',
    time: 'منذ 25 دقيقة',
  },
];

export default function PulseFeed() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.pulseIcon}>⚡</span>
          Live Pulse
        </h3>
        <span className={styles.status}>
          <span className={styles.statusDot}></span>
          حي
        </span>
      </div>

      {/* Events List */}
      <div className={styles.events}>
        <AnimatePresence>
          {pulseEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className={styles.event}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={`${styles.eventIcon} ${styles[event.type]}`}>
                {event.icon}
              </div>
              <div className={styles.eventContent}>
                <span className={styles.eventTitle}>{event.title}</span>
                <span className={styles.eventDesc}>{event.description}</span>
              </div>
              <span className={styles.eventTime}>{event.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* View All */}
      <button className={styles.viewAll}>
        عرض كل النشاطات →
      </button>
    </div>
  );
}
