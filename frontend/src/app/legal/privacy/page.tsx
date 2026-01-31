'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { FileText, Lock, ShieldCheck, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--primary-500)]/10 mb-6">
            <Lock className="w-8 h-8 text-[var(--primary-500)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">سياسة الخصوصية</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            آخر تحديث: 31 يناير 2026
          </p>
        </motion.div>

        <div className="glass-card p-8 md:p-12 space-y-12">
          <Section title="1. مقدمة">
            <p>
              نحن في IDRISIUM Corp ("نحن"، "الشركة") نولي اهتماماً كبيراً لخصوصيتك. 
              تشرح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا لمعلوماتك الشخصية عند استخدامك لمنصة Apex Sales Neural Engine.
            </p>
          </Section>

          <Section title="2. المعلومات التي نجمعها">
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
              <li>المعلومات الشخصية (الاسم، البريد الإلكتروني، رقم الهاتف).</li>
              <li>بيانات الاستخدام والتحليلات.</li>
              <li>محتوى المحادثات والرسائل التي تتم معالجتها عبر البوت (يتم تشفيرها).</li>
              <li>معلومات الدفع والفواتير.</li>
            </ul>
          </Section>

          <Section title="3. كيفية استخدام المعلومات">
            <p>
              نستخدم المعلومات لـ:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-[var(--text-secondary)]">
              <li>تقديم وتشغيل وصيانة خدماتنا.</li>
              <li>تحسين وتطوير وتخصيص تجربتك.</li>
              <li>فهم وتحليل كيفية استخدامك لخدماتنا.</li>
              <li>التواصل معك، إما مباشرة أو عبر أحد شركائنا.</li>
            </ul>
          </Section>

          <Section title="4. أمن البيانات">
            <p>
              نحن نستخدم إجراءات أمان تقنية وإدارية ومادية مصممة لحماية معلوماتك الشخصية من الفقدان والسرقة وسوء الاستخدام. 
              جميع البيانات حساسة يتم تشفيرها باستخدام تقنيات SSL/TLS.
            </p>
          </Section>

          <Section title="5. اتصل بنا">
            <p className="mb-4">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:
            </p>
            <Link href="mailto:idris.ghamid@gmail.com" className="inline-flex items-center gap-2 text-[var(--primary-500)] hover:underline">
              <Mail className="w-4 h-4" />
              idris.ghamid@gmail.com
            </Link>
          </Section>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-[var(--primary-500)]" />
        {title}
      </h2>
      <div className="text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
