'use client';

import { Bot, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-default)] pt-20 pb-10 relative overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[var(--primary-500)]/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center shadow-lg group-hover:shadow-[var(--primary-500)]/30 transition-all">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">Apex Sales</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed max-w-xs">
              أول منصة عربية لإدارة المبيعات بالذكاء الاصطناعي (Gemini 2.5). تواصل، بع، وتوسع بلا حدود.
            </p>
            <div className="flex gap-3">
              <SocialLink icon={Github} href="https://github.com/IDRISIUM" />
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Linkedin} href="#" />
              <SocialLink icon={Mail} href="mailto:idris.ghamid@gmail.com" />
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold text-white mb-6">المنتج</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="#features" className="hover:text-[var(--primary-400)] transition-colors">المميزات</Link></li>
              <li><Link href="#pricing" className="hover:text-[var(--primary-400)] transition-colors">الأسعار</Link></li>
              <li><Link href="/dashboard" className="hover:text-[var(--primary-400)] transition-colors">التجربة الحية</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-400)] transition-colors">خارطة الطريق</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold text-white mb-6">الشركة</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/about" className="hover:text-[var(--primary-400)] transition-colors">عن الشركة</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary-400)] transition-colors">اتصل بنا</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-400)] transition-colors">الوظائف</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-400)] transition-colors">المدونة</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold text-white mb-6">قانوني</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/legal/privacy" className="hover:text-[var(--primary-400)] transition-colors">سياسة الخصوصية</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[var(--primary-400)] transition-colors">شروط الاستخدام</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-400)] transition-colors">الأمان</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-default)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-tertiary)]">
            © 2025-2026 IDRISIUM Corp. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-4 py-2 rounded-full border border-[var(--border-default)]">
            <span>صنع بحب</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            <span>في مصر</span>
            <Link href="https://github.com/IDRISIUM" className="text-[var(--text-primary)] hover:text-[var(--primary-400)] font-medium transition-colors ml-1">By Idris Ghamid</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ icon: Icon, href }: { icon: any, href: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:bg-[var(--primary-500)] hover:text-white transition-all"
    >
      <Icon className="w-5 h-5" />
    </a>
  );
}
