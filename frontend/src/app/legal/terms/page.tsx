'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle } from 'lucide-react';

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-[var(--primary-500)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">شروط الاستخدام</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            تحكم هذه الشروط استخدامك لمنصة Apex Sales
          </p>
        </motion.div>

        <div className="glass-card p-8 md:p-12 space-y-12">
          <Section title="1. قبول الشروط">
            <p>
              بوصولك إلى الموقع واستخدام الخدمة، فإنك تقر بأنك قرأت وفهمت ووافقت على الالتزام بهذه الشروط. 
              إذا كنت لا توافق على هذه الشروط، فلا يحق لك استخدام الخدمة.
            </p>
          </Section>

          <Section title="2. وصف الخدمة">
            <p>
              توفر Apex Sales Neural Engine أدوات إدارة مبيعات مدعومة بالذكاء الاصطناعي. 
              نحتفظ بالحق في تعديل أو إيقاف الخدمة (أو أي جزء منها) في أي وقت مع أو بدون إشعار.
            </p>
          </Section>

          <Section title="3. حساب المستخدم">
            <p>
              يجب عليك التسجيل وإنشاء حساب لاستخدام ميزات معينة في الخدمة. 
              أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك وعن جميع الأنشطة التي تحدث تحت حسابك.
            </p>
          </Section>

          <Section title="4. الملكية الفكرية">
            <p>
              الخدمة ومحتواها الأصلي والميزات والوظائف هي وستظل ملكية حصرية لشركة IDRISIUM Corp ومرخصيها. 
              الخدمة محمية بموجب حقوق النشر والعلامات التجارية والقوانين الأخرى.
            </p>
          </Section>

          <Section title="5. إنهاء الخدمة">
            <p>
              يجوز لنا إنهاء أو تعليق حسابك ومنع الوصول إلى الخدمة فوراً، دون إشعار مسبق أو مسؤولية، 
              لأي سبب من الأسباب، بما في ذلك ودون حصر إذا انتهكت الشروط.
            </p>
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
        <Scale className="w-6 h-6 text-[var(--primary-500)]" />
        {title}
      </h2>
      <div className="text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </section>
  );
}
