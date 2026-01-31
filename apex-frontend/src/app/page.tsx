'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import LiveDemo from '@/components/landing/LiveDemo';
import Pricing from '@/components/landing/Pricing';
import Footer from '@/components/landing/Footer';
import styles from './page.module.css';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <div className={styles.loaderContent}>
          <span className={styles.loaderText}>APEX</span>
          <div className={styles.loaderBar}>
            <div className={styles.loaderProgress}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Features />
      <LiveDemo />
      <Pricing />
      <Footer />
    </main>
  );
}
