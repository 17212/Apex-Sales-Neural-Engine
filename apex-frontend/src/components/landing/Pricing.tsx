'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'Starter',
    nameAr: 'المبتدئ',
    price: 0,
    period: 'شهرياً',
    description: 'مثالي للتجربة والمتاجر الصغيرة',
    features: [
      '100 محادثة/شهر',
      'قناة واحدة (Web Chat)',
      'AI أساسي',
      'Dashboard بسيط',
      'دعم عبر البريد',
    ],
    cta: 'ابدأ مجاناً',
    popular: false,
  },
  {
    name: 'Pro',
    nameAr: 'الاحترافي',
    price: 499,
    period: 'شهرياً',
    description: 'للمتاجر المتوسطة والنامية',
    features: [
      '2,000 محادثة/شهر',
      '3 قنوات (Web + WhatsApp + Telegram)',
      'AI متقدم (Gemini 2.5)',
      'Analytics كاملة',
      'نظام الولاء والمحفظة',
      'دعم أولوية 24/7',
    ],
    cta: 'ابدأ الآن',
    popular: true,
  },
  {
    name: 'Enterprise',
    nameAr: 'المؤسسي',
    price: null,
    period: '',
    description: 'للشركات الكبيرة والحلول المخصصة',
    features: [
      'محادثات غير محدودة',
      'كل القنوات',
      'AI مخصص (Fine-tuned)',
      'API كاملة',
      'تكامل ERP',
      'مدير حساب مخصص',
      'SLA مضمون',
    ],
    cta: 'تواصل معنا',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>💰 الأسعار</span>
          <h2 className={styles.title}>
            خطة لكل
            <span className={styles.gradient}> حجم</span>
          </h2>
          <p className={styles.subtitle}>
            ابدأ مجاناً وارتقِ حسب نمو عملك
          </p>
        </motion.div>

        {/* Plans Grid */}
        <div className={styles.grid}>
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`${styles.card} ${plan.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className={styles.popularBadge}>الأكثر شعبية ⭐</div>
              )}
              
              <div className={styles.cardHeader}>
                <h3 className={styles.planName}>{plan.nameAr}</h3>
                <p className={styles.planDesc}>{plan.description}</p>
              </div>

              <div className={styles.priceWrapper}>
                {plan.price !== null ? (
                  <>
                    <span className={styles.currency}>ج.م</span>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.period}>/{plan.period}</span>
                  </>
                ) : (
                  <span className={styles.customPrice}>سعر مخصص</span>
                )}
              </div>

              <ul className={styles.features}>
                {plan.features.map((feature) => (
                  <li key={feature} className={styles.feature}>
                    <span className={styles.checkIcon}>✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.price === null ? '/contact' : '/auth/register'}
                className={`${styles.ctaButton} ${plan.popular ? styles.ctaPrimary : styles.ctaSecondary}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Money Back */}
        <motion.p
          className={styles.guarantee}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          🛡️ ضمان استرداد الأموال خلال 14 يوم - بدون أي أسئلة
        </motion.p>
      </div>
    </section>
  );
}
