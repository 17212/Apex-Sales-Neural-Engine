'use client';

import { motion } from 'framer-motion';
import styles from './Features.module.css';

const features = [
  {
    title: 'ذكاء اصطناعي متقدم',
    description: 'Gemini 2.5 Pro يفهم السياق واللهجات العربية',
  },
  {
    title: 'محادثات طبيعية',
    description: 'رد تلقائي بالمصري والخليجي والفصحى',
  },
  {
    title: 'تحليلات لحظية',
    description: 'Dashboard حي بالمبيعات والمحادثات',
  },
  {
    title: 'إدارة الطلبات',
    description: 'من السلة للتوصيل - كل شيء متتبع',
  },
  {
    title: 'نظام الولاء',
    description: 'كاش باك ونقاط للعملاء المميزين',
  },
  {
    title: 'Real-time',
    description: 'إشعارات فورية ومتابعة لحظية',
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.title}>كل ما تحتاجه</h2>
          <p className={styles.subtitle}>أدوات متكاملة لإدارة مبيعاتك بذكاء</p>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
