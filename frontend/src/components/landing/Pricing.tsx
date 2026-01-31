'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
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
      'نماذج AI مخصصة (Fine-tuned)',
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
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            خطط أسعار تناسب <span className="gradient-text">حجم نموك</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            ابدأ مجاناً وقم بالترقية عندما تحتاج للمزيد. لا عقود مخفية.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-card p-8 rounded-3xl border transition-all duration-500 ${
                plan.popular 
                  ? 'border-[var(--primary-500)] bg-[var(--bg-elevated)]/50 shadow-[0_0_50px_-10px_rgba(139,92,246,0.3)] scale-105 z-10' 
                  : 'border-[var(--border-default)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-elevated)]/30 opacity-80 hover:opacity-100 hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--primary-600)] to-[var(--secondary-600)] text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg shadow-[var(--primary-500)]/40 flex items-center gap-1">
                  <span className="relative flex h-2 w-2 mr-1">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                  </span>
                  الأكثر شيوعاً
                </div>
              )}

              <div className="text-center mb-8 pt-4">
                <h3 className={`text-xl font-bold mb-2 ${plan.popular ? 'text-[var(--primary-400)]' : 'text-white'}`}>{plan.name}</h3>
                <p className="text-[var(--text-tertiary)] text-sm mb-6">{plan.desc}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className={`text-5xl font-bold tracking-tighter ${plan.popular ? 'gradient-text' : 'text-white'}`}>{plan.price}</span>
                  <span className="text-[var(--text-secondary)] text-sm mb-2 font-medium">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${plan.popular ? 'bg-[var(--primary-500)]/20' : 'bg-[var(--bg-tertiary)]'}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-[var(--primary-400)]' : 'text-[var(--text-tertiary)]'}`} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/login" 
                className={`btn w-full justify-center py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'btn-primary shadow-[var(--primary-500)]/25' 
                    : 'btn-secondary bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] border border-[var(--border-default)]'
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
