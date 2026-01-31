'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background Effects */}
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGrid}></div>
      
      <div className={styles.container}>
        {/* Badge */}
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.badgeIcon}>✨</span>
          <span>مدعوم بـ Gemini 2.5 Pro AI</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className={styles.titleLine}>بيع أكثر.</span>
          <span className={styles.titleLine}>اشتغل أقل.</span>
          <span className={`${styles.titleLine} ${styles.gradient}`}>
            خلّي الذكاء الاصطناعي يشتغل عنك.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          نظام ذكاء اصطناعي متكامل يفهم عملاءك بالعربي، يرد عليهم 24/7،
          <br />
          ويحول المحادثات لمبيعات - زي موظف مبيعات خارق!
        </motion.p>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>95%</span>
            <span className={styles.statLabel}>معدل رضا العملاء</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>3x</span>
            <span className={styles.statLabel}>زيادة في المبيعات</span>
          </div>
          <div className={styles.statDivider}></div>
          <div className={styles.stat}>
            <span className={styles.statValue}>24/7</span>
            <span className={styles.statLabel}>خدمة بدون توقف</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Link href="/auth/register" className={styles.primaryBtn}>
            <span>ابدأ تجربتك المجانية</span>
            <span className={styles.btnIcon}>🚀</span>
          </Link>
          <a href="#demo" className={styles.secondaryBtn}>
            <span className={styles.playIcon}>▶</span>
            <span>شاهد العرض التوضيحي</span>
          </a>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className={styles.trust}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <span className={styles.trustText}>موثوق من أكثر من</span>
          <span className={styles.trustNumber}>500+</span>
          <span className={styles.trustText}>متجر في مصر والخليج</span>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className={`${styles.floatingCard} ${styles.floatingCard1}`}
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className={styles.floatingIcon}>💬</span>
        <span className={styles.floatingText}>رد تلقائي في 2 ثانية</span>
      </motion.div>

      <motion.div
        className={`${styles.floatingCard} ${styles.floatingCard2}`}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className={styles.floatingIcon}>🛒</span>
        <span className={styles.floatingText}>طلب جديد: 450 ج.م</span>
      </motion.div>

      <motion.div
        className={`${styles.floatingCard} ${styles.floatingCard3}`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <span className={styles.floatingIcon}>⭐</span>
        <span className={styles.floatingText}>تقييم 5 نجوم</span>
      </motion.div>
    </section>
  );
}
