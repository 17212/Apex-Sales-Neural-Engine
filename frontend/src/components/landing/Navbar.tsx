'use client';

import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Bot, Menu, X, ChevronLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-default)] py-2' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[var(--text-primary)] flex items-center justify-center text-[var(--bg-primary)] transition-transform group-hover:rotate-12">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-lg tracking-tight">Apex Sales</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#features" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">المميزات</Link>
          <Link href="#pricing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">الأسعار</Link>
          <Link href="#testimonials" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">قصص نجاح</Link>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
            دخول
          </Link>
          <Link href="/login" className="btn btn-primary px-4 py-2 h-auto text-sm rounded-lg">
            ابدأ مجاناً
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-[var(--text-primary)]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-[var(--bg-primary)] border-b border-[var(--border-default)]"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Link href="#features" className="p-3 hover:bg-[var(--bg-secondary)] rounded-lg text-sm font-medium">المميزات</Link>
            <Link href="#pricing" className="p-3 hover:bg-[var(--bg-secondary)] rounded-lg text-sm font-medium">الأسعار</Link>
            <div className="h-px bg-[var(--border-default)] my-2" />
            <Link href="/login" className="p-3 hover:bg-[var(--bg-secondary)] rounded-lg text-sm font-medium text-center">تسجيل الدخول</Link>
            <Link href="/login" className="btn btn-primary w-full justify-center">ابدأ الآن</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
