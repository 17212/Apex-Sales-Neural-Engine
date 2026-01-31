'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Pricing.module.css';

const plans = [
  {
    name: 'مجاني',
    price: 0,
    description: 'للتجربة والمتاجر الصغيرة',
    features: ['100 محادثة/شهر', 'قناة واحدة', 'AI أساسي'],
    cta: 'ابدأ مجاناً',
  },
  {
    name: 'احترافي',
    price: 499,
    description: 'للمتاجر المتوسطة',
    features: ['2,000 محادثة', '3 قنوات', 'AI متقدم', 'نظام الولاء', 'دعم 24/7'],
    cta: 'ابدأ الآن',
    popular: true,
  },
  {
    name: 'مؤسسي',
    price: null,
    description: 'للشركات الكبيرة',
    features: ['محادثات غير محدودة', 'كل القنوات', 'AI مخصص', 'API كاملة', 'مدير حساب'],
    cta: 'تواصل معنا',
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
          <h2 className={styles.title}>الأسعار</h2>
          <p className={styles.subtitle}>ابدأ مجاناً وارتقِ حسب نموك</p>
        </motion.div>

        {/* Plans */}
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
              {plan.popular && <div className={styles.badge}>الأكثر شعبية</div>}
              
              <h3 className={styles.planName}>{plan.name}</h3>
              <p className={styles.planDesc}>{plan.description}</p>

              <div className={styles.priceWrap}>
                {plan.price !== null ? (
                  <>
                    <span className={styles.price}>{plan.price}</span>
                    <span className={styles.currency}>ج.م / شهر</span>
                  </>
                ) : (
                  <span className={styles.custom}>سعر مخصص</span>
                )}
              </div>

              <ul className={styles.features}>
                {plan.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <Link
                href={plan.price === null ? '/contact' : '/auth/register'}
                className={`${styles.cta} ${plan.popular ? styles.ctaPopular : ''}`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
