'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: 'المميزات', href: '#features' },
      { label: 'الأسعار', href: '#pricing' },
      { label: 'العرض التوضيحي', href: '#demo' },
      { label: 'التحديثات', href: '/changelog' },
    ],
    company: [
      { label: 'من نحن', href: '/about' },
      { label: 'المدونة', href: '/blog' },
      { label: 'الوظائف', href: '/careers' },
      { label: 'تواصل معنا', href: '/contact' },
    ],
    legal: [
      { label: 'سياسة الخصوصية', href: '/privacy' },
      { label: 'شروط الاستخدام', href: '/terms' },
      { label: 'سياسة الاسترداد', href: '/refund' },
    ],
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer */}
        <div className={styles.main}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>🧠</span>
              <span className={styles.logoText}>APEX</span>
            </Link>
            <p className={styles.brandDesc}>
              نظام ذكاء اصطناعي متكامل لإدارة المبيعات والتجارة الإلكترونية
            </p>
            <div className={styles.social}>
              <a href="https://instagram.com/idris.ghamid" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                📸
              </a>
              <a href="https://tiktok.com/@idris.ghamid" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                🎵
              </a>
              <a href="https://t.me/IDRV72" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                ✈️
              </a>
              <a href="https://github.com/IDRISIUM" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                💻
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className={styles.linksGroup}>
            <div className={styles.linksColumn}>
              <h4 className={styles.linksTitle}>المنتج</h4>
              <ul className={styles.linksList}>
                {footerLinks.product.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksColumn}>
              <h4 className={styles.linksTitle}>الشركة</h4>
              <ul className={styles.linksList}>
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.linksColumn}>
              <h4 className={styles.linksTitle}>قانوني</h4>
              <ul className={styles.linksList}>
                {footerLinks.legal.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={styles.link}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Bottom Footer */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {currentYear} IDRISIUM Corp. جميع الحقوق محفوظة.
          </p>
          <div className={styles.founder}>
            <span>صُنع بـ ❤️ بواسطة</span>
            <a href="https://github.com/IDRISIUM" target="_blank" rel="noopener noreferrer" className={styles.founderLink}>
              إدريس غامد
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
