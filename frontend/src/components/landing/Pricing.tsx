'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: 'مجاني',
    period: 'للأبد',
    desc: 'للمتاجر الناشئة والتجربة',
    features: [
      'بوت واحد (WhatsApp)',
      '100 محادثة / شهر',
      'لوحة تحكم أساسية',
      'دعم عبر البريد',
      'تحليلات بسيطة',
    ],
    cta: 'ابدأ مجاناً',
    popular: false,
  },
  {
    name: 'Pro',
    price: '499',
    period: 'ج.م / شهر',
    desc: 'للشركات الصغيرة والمتوسطة',
    features: [
      '3 بوتات (كل القنوات)',
      '5000 محادثة / شهر',
      'AI متقدم (Gemini Pro)',
      'إزالة علامة Apex المائية',
      'دعم فني أولوي',
      'تحليلات متقدمة',
      'API Access',
    ],
    cta: 'اشترك الآن',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'تواصل معنا',
    period: '',
    desc: 'للشركات الكبرى والأحجام الضخمة',
    features: [
      'عدد لا محدود من البوتات',
      'محادثات غير محدودة',
      'نماذج AI مخصصة',
      'تكامل مخصص (Custom Integration)',
      'مدير حساب خاص',
      'SLA مضمونة 99.9%',
      'On-premise Deployment',
    ],
    cta: 'تواصل للمبيعات',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            خطط تناسب طموحك
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            ابدأ صغيراً واكبر معنا. لا تكاليف خفية، إلغاء في أي وقت.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.popular 
                  ? 'bg-[var(--bg-elevated)] border-[var(--text-primary)] shadow-2xl z-10 scale-105' 
                  : 'bg-[var(--bg-primary)] border-[var(--border-default)] hover:border-[var(--text-tertiary)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  الأكثر طلباً
                </div>
              )}

              <div className="text-center mb-8 pt-2">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-[200px] mx-auto">{plan.desc}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold tracking-tighter">{plan.price}</span>
                  {plan.period && <span className="text-[var(--text-tertiary)] text-sm font-medium">{plan.period}</span>}
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] text-right">
                    <Check className="w-5 h-5 text-[var(--success)] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/login" 
                className={`flex items-center justify-center w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular 
                    ? 'btn-primary' 
                    : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-default)]'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
