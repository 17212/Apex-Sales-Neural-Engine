'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Bot, Menu, X, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--primary-500)]/30 transition-all">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl gradient-text">Apex Sales</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-[var(--text-secondary)] hover:text-[var(--primary-400)] transition-colors">المميزات</Link>
          <Link href="#pricing" className="text-[var(--text-secondary)] hover:text-[var(--primary-400)] transition-colors">الأسعار</Link>
          <Link href="#testimonials" className="text-[var(--text-secondary)] hover:text-[var(--primary-400)] transition-colors">آراء العملاء</Link>
          <Link href="/about" className="text-[var(--text-secondary)] hover:text-[var(--primary-400)] transition-colors">عن الشركة</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-[var(--text-primary)] hover:text-[var(--primary-400)] transition-colors font-medium">
            تسجيل الدخول
          </Link>
          <Link href="/login" className="btn btn-primary px-6">
            ابدأ الآن مجاناً
            <ChevronLeft className="w-4 h-4 mr-2" />
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-default)]"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="#features" className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg">المميزات</Link>
            <Link href="#pricing" className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg">الأسعار</Link>
            <Link href="/about" className="p-2 hover:bg-[var(--bg-tertiary)] rounded-lg">عن الشركة</Link>
            <div className="h-px bg-[var(--border-default)]" />
            <Link href="/login" className="btn btn-secondary w-full justify-center">تسجيل الدخول</Link>
            <Link href="/login" className="btn btn-primary w-full justify-center">ابدأ الآن</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
