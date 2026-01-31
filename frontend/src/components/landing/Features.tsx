'use client';

import { motion } from 'framer-motion';
import { Bot, MessageSquare, BarChart3, Zap, Globe, Shield, Clock, Users } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'ذكاء اصطناعي متطور',
    desc: 'يستخدم Gemini 2.5 لفهم لهجات العملاء والرد عليهم بدقة وكأنك أنت من يتحدث.',
    color: 'var(--primary-500)',
  },
  {
    icon: MessageSquare,
    title: 'تعدد القنوات',
    desc: 'ربط موحد لـ WhatsApp, Messenger, Instagram, و Telegram في لوحة تحكم واحدة.',
    color: '#25D366',
  },
  {
    icon: BarChart3,
    title: 'تحليلات دقيقة',
    desc: 'تقارير مفصلة عن المبيعات، أداء البوت، وسلوك العملاء لاتخاذ قرارات مدروسة.',
    color: '#F59E0B',
  },
  {
    icon: Zap,
    title: 'رد فوري 24/7',
    desc: 'لا تفقد أي عميل. البوت يعمل على مدار الساعة للرد والحجز وإتمام الصفقات.',
    color: '#EAB308',
  },
  {
    icon: Globe,
    title: 'دعم متعدد اللغات',
    desc: 'يفهم ويتحدث العربية (بكل لهجاتها)، الإنجليزية، الفرنسية، والمزيد.',
    color: '#3B82F6',
  },
  {
    icon: Shield,
    title: 'أمان وخصوصية',
    desc: 'تشفير كامل للبيانات وحماية معلومات عملائك وفق أعلى المعايير العالمية.',
    color: '#10B981',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[var(--bg-secondary)]/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            كل ما تحتاجه لإدارة مبيعاتك <br />
            <span className="gradient-text">في منصة واحدة</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[var(--text-secondary)] text-lg"
          >
            استغنى عن أدواتك القديمة. Apex يوفر لك نظاماً متكاملاً لإدارة المحادثات، المبيعات، والفريق.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group hover:bg-[var(--bg-elevated)] transition-all duration-300 border border-[var(--border-default)] hover:border-[var(--primary-500)]/30"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: feature.color }} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
