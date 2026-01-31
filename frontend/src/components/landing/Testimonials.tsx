'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    content: "Apex غير طريقة شغلنا تماماً. مبيعاتنا زادت 300% في أول شهر والعملاء مبهورين بسرعة الرد.",
    author: "محمد عبد الله",
    role: "CEO, TechStore Egypt",
    avatar: "https://i.pravatar.cc/150?u=1",
    rating: 5,
  },
  {
    content: "أفضل استثمار عملناه. البوت فاهم اللهجة المصرية وبيرد كأنه بني آدم. خدمة عملاء ممتازة!",
    author: "سارة محمود",
    role: "Marketing Manager, Fashion Hub",
    avatar: "https://i.pravatar.cc/150?u=2",
    rating: 5,
  },
  {
    content: "كنت قلقان من الـ AI بس Apex أثبتلي العكس. سهولة في الاستخدام ودقة رهيبة في الحجز.",
    author: "عمر خالد",
    role: "Founder, Burger King Franchise",
    avatar: "https://i.pravatar.cc/150?u=3",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-500)]/10 text-[var(--primary-400)] text-sm font-medium mb-6"
          >
            <Star className="w-4 h-4 fill-current" />
            <span>قصص نجاح عملائنا</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            موثوق من قبل <span className="gradient-text">أكبر العلامات التجارية</span>
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-3xl relative"
            >
              <Quote className="absolute top-8 right-8 w-8 h-8 text-[var(--primary-500)]/20" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                ))}
              </div>

              <p className="text-lg mb-8 leading-relaxed text-[var(--text-secondary)]">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--primary-500)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{item.author}</h4>
                  <p className="text-xs text-[var(--text-tertiary)]">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
