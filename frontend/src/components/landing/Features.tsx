'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, BarChart3, Zap, Globe, Shield, Database, Smartphone } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'وكيل ذكاء اصطناعي',
    desc: 'يعمل بمحرك Gemini 2.5 المتطور. يفهم السياق، يعالج الاعتراضات، ويقفل الصفقات ببراعة بشرية.',
    colSpan: 'md:col-span-2',
  },
  {
    icon: MessageSquare,
    title: 'مركز رسائل موحد',
    desc: 'واتساب، تيليجرام، وفيسبوك في انبوكس واحد.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: Database,
    title: 'CRM مدمج',
    desc: 'قاعدة بيانات للعملاء مع تصنيف تلقائي وتاريخ مشتريات كامل.',
    colSpan: 'md:col-span-1',
  },
  {
    icon: BarChart3,
    title: 'تحليلات النمو',
    desc: 'رؤى فورية حول المبيعات، معدلات التحويل، وأداء المنتجات.',
    colSpan: 'md:col-span-2',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-[var(--bg-primary)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            منصة مبيعات متكاملة
            <span className="block text-[var(--text-tertiary)] mt-2">تعمل لأجلك 24/7</span>
          </h2>
          <p className="text-[var(--text-secondary)] text-lg">
            كل الأدوات التي تحتاجها للتحكم في عمليات البيع وتوسيع نشاطك التجاري.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${feature.colSpan} group relative p-8 rounded-3xl bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-[var(--text-tertiary)] transition-colors overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 transition-opacity group-hover:opacity-10">
                  <Icon className="w-32 h-32" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[var(--bg-secondary)] flex items-center justify-center mb-6 border border-[var(--border-default)]">
                    <Icon className="w-6 h-6 text-[var(--text-primary)]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
