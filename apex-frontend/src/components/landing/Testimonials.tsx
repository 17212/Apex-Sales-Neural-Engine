'use client';

import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    name: 'أحمد محمود',
    role: 'صاحب متجر إلكتروني',
    location: 'القاهرة، مصر',
    avatar: '👨‍💼',
    rating: 5,
    text: 'Apex غيّر طريقة شغلي تماماً! كنت بقضي ساعات بأرد على العملاء، دلوقتي الـ AI بيعمل كل حاجة وأنا بتابع بس. المبيعات زادت 40% في أول شهر!',
  },
  {
    name: 'سارة الخالدي',
    role: 'مديرة تسويق',
    location: 'الرياض، السعودية',
    avatar: '👩‍💻',
    rating: 5,
    text: 'أحلى حاجة إنه بيفهم اللهجة السعودية! العملاء مبسوطين من سرعة الرد والأسلوب الودود. الـ Dashboard سهل وبيوريني كل حاجة.',
  },
  {
    name: 'محمد العتيبي',
    role: 'رائد أعمال',
    location: 'دبي، الإمارات',
    avatar: '👨‍🚀',
    rating: 5,
    text: 'جربت أنظمة كتير قبل كده بس Apex مختلف. الـ AI فعلاً بيفهم نية العميل ويحوله لمشتري. ROI ممتاز!',
  },
  {
    name: 'نورا حسن',
    role: 'صاحبة براند ملابس',
    location: 'الإسكندرية، مصر',
    avatar: '👩‍🎨',
    rating: 5,
    text: 'الدعم الفني ممتاز والفريق بيساعد في كل حاجة. نظام الولاء والكاش باك خلى العملاء يرجعوا يشتروا تاني!',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className={styles.badge}>💬 آراء العملاء</span>
          <h2 className={styles.title}>
            كلام اللي
            <span className={styles.gradient}> جربوا</span>
          </h2>
          <p className={styles.subtitle}>
            أكثر من 500 متجر بيستخدموا Apex يومياً
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              {/* Rating */}
              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className={styles.star}>⭐</span>
                ))}
              </div>

              {/* Quote */}
              <blockquote className={styles.quote}>
                "{testimonial.text}"
              </blockquote>

              {/* Author */}
              <div className={styles.author}>
                <div className={styles.avatar}>{testimonial.avatar}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{testimonial.name}</span>
                  <span className={styles.authorRole}>{testimonial.role}</span>
                  <span className={styles.authorLocation}>{testimonial.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className={styles.stat}>
            <span className={styles.statValue}>500+</span>
            <span className={styles.statLabel}>متجر نشط</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>2M+</span>
            <span className={styles.statLabel}>محادثة تمت</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>98%</span>
            <span className={styles.statLabel}>رضا العملاء</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statValue}>24/7</span>
            <span className={styles.statLabel}>خدمة مستمرة</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
