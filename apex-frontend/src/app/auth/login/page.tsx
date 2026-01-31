'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Demo login - direct redirect for now
      // TODO: Connect to backend API
      if (formData.email && formData.password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/dashboard');
      }
    } catch {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials auto-fill
  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@apex-ai.com',
      password: 'demo123456',
    });
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
            <h1 className={styles.title}>مرحباً بعودتك</h1>
            <p className={styles.subtitle}>سجل دخولك للوصول إلى لوحة التحكم</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}

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
                dir="ltr"
              />
            </div>

            <div className={styles.options}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>تذكرني</span>
              </label>
              <Link href="/auth/forgot-password" className={styles.forgotLink}>
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className={styles.demoSection}>
            <button onClick={fillDemoCredentials} className={styles.demoBtn}>
              استخدم بيانات تجريبية
            </button>
            <p className={styles.demoHint}>
              Email: demo@apex-ai.com | Password: demo123456
            </p>
          </div>

          <div className={styles.footer}>
            <span>ليس لديك حساب؟</span>
            <Link href="/auth/register" className={styles.footerLink}>
              إنشاء حساب جديد
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
