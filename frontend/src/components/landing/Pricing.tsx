'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    nameAr: 'المبتدئ',
    price: 'مجاناً',
    period: '',
    description: 'للمتاجر الصغيرة والتجربة',
    features: [
      '500 محادثة/شهر',
      'قناة واحدة (واتساب أو تيليجرام)',
      'تحليلات أساسية',
      'دعم بالبريد الإلكتروني',
    ],
    cta: 'ابدأ مجاناً',
    featured: false,
  },
  {
    name: 'Pro',
    nameAr: 'الاحترافي',
    price: '299',
    period: '/شهر',
    description: 'للمتاجر المتوسطة والنامية',
    features: [
      '10,000 محادثة/شهر',
      'جميع القنوات (واتساب + تيليجرام + ماسنجر)',
      'تحليلات متقدمة + تقارير',
      'تدريب الـ AI على منتجاتك',
      'أولوية الدعم',
      'تكامل مع Shopify و WooCommerce',
    ],
    cta: 'اشترك الآن',
    featured: true,
  },
  {
    name: 'Enterprise',
    nameAr: 'المؤسسي',
    price: 'مخصص',
    period: '',
    description: 'للمؤسسات والشركات الكبيرة',
    features: [
      'محادثات غير محدودة',
      'جميع القنوات + API مخصص',
      'مدير حساب مخصص',
      'SLA مضمون 99.9%',
      'تدريب وتخصيص كامل',
      'تكامل مع أي نظام',
    ],
    cta: 'تواصل معنا',
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-zinc-500 mb-4"
          >
            الأسعار
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            خطط تناسب كل الأحجام
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400"
          >
            ابدأ مجاناً وارتقِ حسب احتياجاتك
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl border ${
                plan.featured
                  ? 'border-white/20 bg-zinc-900/50'
                  : 'border-white/5 bg-zinc-900/30'
              } hover:border-white/20 transition-all duration-300`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black text-xs font-medium">
                  الأكثر شعبية
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-sm text-zinc-500 mb-1">{plan.name}</p>
                <h3 className="text-xl font-semibold text-white mb-2">{plan.nameAr}</h3>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>
              
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-zinc-400">{plan.period}</span>}
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href="/dashboard"
                className={`block w-full text-center py-3 rounded-xl font-medium transition-all ${
                  plan.featured
                    ? 'bg-white text-black hover:bg-zinc-200'
                    : 'border border-white/10 text-white hover:bg-white/5'
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
