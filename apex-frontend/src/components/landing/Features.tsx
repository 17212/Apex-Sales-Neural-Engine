'use client';

import { motion } from 'framer-motion';
import styles from './Features.module.css';

const features = [
  {
    icon: '🧠',
    title: 'ذكاء اصطناعي متقدم',
    description: 'مدعوم بـ Gemini 2.5 Pro - يفهم السياق، اللهجات، والنوايا الشرائية',
    highlight: true,
  },
  {
    icon: '💬',
    title: 'محادثات ذكية',
    description: 'رد تلقائي بالمصري والخليجي والفصحى - زي موظف حقيقي',
  },
  {
    icon: '📊',
    title: 'تحليلات متقدمة',
    description: 'Dashboard حي يعرض المبيعات، المحادثات، ورضا العملاء',
  },
  {
    icon: '🛒',
    title: 'إدارة الطلبات',
    description: 'من السلة للتوصيل - كل شيء مربوط ومتتبع',
  },
  {
    icon: '💰',
    title: 'محفظة إلكترونية',
    description: 'كاش باك، نقاط ولاء، واسترداد تلقائي',
  },
  {
    icon: '📱',
    title: 'Omnichannel',
    description: 'واتساب، تليجرام، إنستجرام، ماسنجر - كلهم في مكان واحد',
  },
  {
    icon: '🎯',
    title: 'تقسيم العملاء',
    description: 'VIP، عملاء جدد، محتمل يمشي - كل واحد بمعاملة خاصة',
  },
  {
    icon: '⚡',
    title: 'Real-time',
    description: 'إشعارات فورية، تحديثات مباشرة، ومتابعة لحظية',
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.badge}>المميزات</span>
          <h2 className={styles.title}>
            كل اللي محتاجه في
            <span className={styles.gradient}> مكان واحد</span>
          </h2>
          <p className={styles.subtitle}>
            أدوات متكاملة لإدارة مبيعاتك وخدمة عملائك بذكاء
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`${styles.card} ${feature.highlight ? styles.highlighted : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <div className={styles.iconWrapper}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
