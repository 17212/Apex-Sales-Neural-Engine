'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './page.module.css';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import LiveDemo from '@/components/landing/LiveDemo';
import Pricing from '@/components/landing/Pricing';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <motion.div
          className={styles.loaderLogo}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className={styles.loaderIcon}>🧠</span>
          <span className={styles.loaderText}>APEX</span>
        </motion.div>
        <motion.div
          className={styles.loaderBar}
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
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
      <Testimonials />
      <Footer />
    </main>
  );
}
