'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    storeName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      setLoading(false);
      return;
    }

    try {
      // Demo registration - direct redirect for now
      // TODO: Connect to backend API
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch {
      setError('حدث خطأ أثناء إنشاء الحساب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>APEX</span>
        </Link>

        <div className={styles.formCard}>
          <div className={styles.formHeader}>
            <h1 className={styles.title}>إنشاء حساب جديد</h1>
            <p className={styles.subtitle}>ابدأ تجربتك المجانية الآن</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.label}>الاسم الكامل</label>
                <input
                  type="text"
                  id="name"
                  className={styles.input}
                  placeholder="أحمد محمد"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="storeName" className={styles.label}>اسم المتجر</label>
                <input
                  type="text"
                  id="storeName"
                  className={styles.input}
                  placeholder="متجر أحمد"
                  value={formData.storeName}
                  onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>البريد الإلكتروني</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="example@domain.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                dir="ltr"
              />
            </div>

            <div className={styles.inputRow}>
              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.label}>كلمة المرور</label>
                <input
                  type="password"
                  id="password"
                  className={styles.input}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  dir="ltr"
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.label}>تأكيد كلمة المرور</label>
                <input
                  type="password"
                  id="confirmPassword"
                  className={styles.input}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  dir="ltr"
                />
              </div>
            </div>

            <label className={styles.checkbox}>
              <input type="checkbox" required />
              <span>أوافق على <Link href="/terms">شروط الاستخدام</Link> و <Link href="/privacy">سياسة الخصوصية</Link></span>
            </label>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'جاري إنشاء الحساب...' : 'إنشاء الحساب'}
            </button>
          </form>

          <div className={styles.footer}>
            <span>لديك حساب بالفعل؟</span>
            <Link href="/auth/login" className={styles.footerLink}>
              تسجيل الدخول
            </Link>
          </div>
        </div>

        {/* Branding */}
        <p className={styles.branding}>
          © 2024 IDRISIUM Corp - Apex Sales Neural Engine
        </p>
      </div>
    </div>
  );
}
