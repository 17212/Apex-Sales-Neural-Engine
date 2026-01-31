'use client';

import { Bot, Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-default)] pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">Apex Sales</span>
            </Link>
            <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">
              أول منصة عربية لإدارة المبيعات بالذكاء الاصطناعي. حول محادثاتك إلى مبيعات حقيقية بضغطة زر.
            </p>
            <div className="flex gap-4">
              <SocialLink icon={Github} href="https://github.com/IDRISIUM" />
              <SocialLink icon={Twitter} href="#" />
              <SocialLink icon={Linkedin} href="#" />
              <SocialLink icon={Mail} href="mailto:idris.ghamid@gmail.com" />
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold mb-6">المنتج</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="#features" className="hover:text-[var(--primary-500)]">المميزات</Link></li>
              <li><Link href="#pricing" className="hover:text-[var(--primary-500)]">الأسعار</Link></li>
              <li><Link href="/dashboard" className="hover:text-[var(--primary-500)]">التجربة الحية</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-500)]">خارطة الطريق</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6">الشركة</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/about" className="hover:text-[var(--primary-500)]">عن الشركة</Link></li>
              <li><Link href="/contact" className="hover:text-[var(--primary-500)]">اتصل بنا</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-500)]">الوظائف</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-500)]">المدونة</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold mb-6">قانوني</h4>
            <ul className="space-y-4 text-sm text-[var(--text-secondary)]">
              <li><Link href="/legal/privacy" className="hover:text-[var(--primary-500)]">سياسة الخصوصية</Link></li>
              <li><Link href="/legal/terms" className="hover:text-[var(--primary-500)]">شروط الاستخدام</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary-500)]">الأمان</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border-default)] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-tertiary)]">
            © 2025-2026 IDRISIUM Corp. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--text-tertiary)]">
            <span>صنع بـ</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>بواسطة</span>
            <Link href="https://github.com/IDRISIUM" className="text-[var(--text-primary)] hover:underline">Idris Ghamid</Link>
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
