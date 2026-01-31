'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-16 border-t border-white/5 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white">
                <span className="text-lg font-bold text-black">A</span>
              </div>
              <span className="text-lg font-semibold text-white">Apex Sales</span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed">
              نظام ذكاء اصطناعي متكامل لأتمتة مبيعاتك على جميع المنصات.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">المنتج</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-zinc-500 hover:text-white transition-colors">المميزات</a></li>
              <li><a href="#pricing" className="text-sm text-zinc-500 hover:text-white transition-colors">الأسعار</a></li>
              <li><Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">الشركة</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-500 hover:text-white transition-colors">عن إدريسيوم</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-500 hover:text-white transition-colors">تواصل معنا</Link></li>
              <li><Link href="/privacy" className="text-sm text-zinc-500 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">تواصل</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://t.me/IDRV72" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.02-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.94.12.78.89z"/>
                  </svg>
                  Telegram
                </a>
              </li>
              <li>
                <a href="mailto:idris.ghamid@gmail.com" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  البريد الإلكتروني
                </a>
              </li>
              <li>
                <a href="https://github.com/IDRISIUM" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-zinc-500">
            © 2025-2026 IDRISIUM Corp. جميع الحقوق محفوظة.
          </p>
          <p className="text-sm text-zinc-600">
            صنع بـ ❤️ بواسطة <a href="https://github.com/IDRISIUM" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Idris Ghamid</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
