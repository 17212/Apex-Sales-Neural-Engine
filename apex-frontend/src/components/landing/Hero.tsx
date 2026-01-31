'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Grid */}
      <div className={styles.bgGrid}></div>
      
      <div className={styles.container}>
        {/* Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Powered by Gemini 2.5 AI
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className={styles.titleLine}>مبيعات أكثر.</span>
          <span className={styles.titleLine}>جهد أقل.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          ذكاء اصطناعي يفهم عملاءك بالعربي، يرد عليهم 24/7،
          ويحول المحادثات لمبيعات تلقائياً.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/auth/register" className={styles.primaryBtn}>
            ابدأ مجاناً
          </Link>
          <a href="#demo" className={styles.secondaryBtn}>
            شاهد العرض
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>95%</span>
            <span className={styles.statLabel}>رضا العملاء</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>3x</span>
            <span className={styles.statLabel}>زيادة المبيعات</span>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>24/7</span>
            <span className={styles.statLabel}>خدمة مستمرة</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
