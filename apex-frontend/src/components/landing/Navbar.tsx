'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'المميزات' },
    { href: '#demo', label: 'التجربة' },
    { href: '#pricing', label: 'الأسعار' },
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>APEX</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.navLink}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Buttons */}
        <div className={styles.cta}>
          <Link href="/auth/login" className={styles.loginBtn}>
            دخول
          </Link>
          <Link href="/auth/register" className={styles.registerBtn}>
            ابدأ مجاناً
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMobileMenuOpen ? styles.open : ''}`}></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className={styles.mobileCta}>
            <Link href="/auth/login" className={styles.loginBtnMobile}>
              تسجيل الدخول
            </Link>
            <Link href="/auth/register" className={styles.registerBtnMobile}>
              ابدأ مجاناً
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
