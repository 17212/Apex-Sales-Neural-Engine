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
              className={`relative glass-card p-8 rounded-3xl border ${
                plan.popular 
                  ? 'border-[var(--primary-500)] shadow-[0_0_30px_rgba(var(--primary-500-rgb),0.2)]' 
                  : 'border-[var(--border-default)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary-500)] text-white px-4 py-1 rounded-full text-sm font-medium">
                  الأكثر شيوعاً
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-[var(--text-tertiary)] text-sm mb-6">{plan.desc}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[var(--text-secondary)] text-sm mb-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-[var(--primary-500)]' : 'text-[var(--text-tertiary)]'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/login" 
                className={`btn w-full justify-center py-3 ${
                  plan.popular ? 'btn-primary' : 'btn-secondary'
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
