'use client';

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>APEX</Link>
            <p className={styles.desc}>
              نظام ذكاء اصطناعي لإدارة المبيعات
            </p>
          </div>

          <div className={styles.links}>
            <div className={styles.column}>
              <h4>المنتج</h4>
              <a href="#features">المميزات</a>
              <a href="#pricing">الأسعار</a>
              <a href="#demo">العرض</a>
            </div>
            <div className={styles.column}>
              <h4>الشركة</h4>
              <Link href="/about">من نحن</Link>
              <Link href="/contact">تواصل</Link>
            </div>
            <div className={styles.column}>
              <h4>قانوني</h4>
              <Link href="/privacy">الخصوصية</Link>
              <Link href="/terms">الشروط</Link>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {currentYear} IDRISIUM Corp</p>
          <div className={styles.social}>
            <a href="https://github.com/IDRISIUM" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://t.me/IDRV72" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
