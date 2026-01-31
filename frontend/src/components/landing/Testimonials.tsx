'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "النظام وفر علينا تكلفة فريق دعم كامل. الردود سريعة ودقيقة جداً، والعملاء لاحظوا الفرق.",
    author: "أحمد حسن",
    role: "مدير المبيعات - Fashion Brand",
    avatar: "/avatars/1.png", // Use local or generic if possible, keeping simple
    rating: 5,
  },
  {
    content: "أفضل استثمار لشركتنا الناشئة. البوت بيقفل صفقات واحنا نايمين حرفياً.",
    author: "سارة محمد",
    role: "Found, Tech Startups",
    rating: 5,
  },
  {
    content: "الدقة في اللهجة المصرية مذهلة. مكنتش متخيل ان AI ممكن يفهم 'يا باشا' و 'يا ريس' ويرد صح.",
    author: "كريم واكد",
    role: "مالك متجر إلكتروني",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[var(--bg-secondary)]/30 border-y border-[var(--border-default)]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            شركاء النجاح
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-default)] relative"
            >
              <Quote className="absolute top-6 left-6 w-6 h-6 text-[var(--text-tertiary)] opacity-50" />
              
              <div className="flex gap-0.5 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[var(--text-primary)] fill-current" />
                ))}
              </div>

              <p className="text-lg mb-8 leading-relaxed text-[var(--text-secondary)]">
                "{item.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center font-bold text-[var(--text-secondary)]">
                  {item.author[0]}
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
