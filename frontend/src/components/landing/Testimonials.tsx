'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: 'زادت مبيعاتنا 340% في أول 3 شهور. النظام بيرد على العملاء بسرعة ويفهم احتياجاتهم بشكل مذهل.',
    author: 'أحمد محمد',
    role: 'مؤسس متجر إلكتروني',
    avatar: 'أ',
  },
  {
    quote: 'وفرنا 80% من وقت فريق خدمة العملاء. البوت بيتعامل مع الاستفسارات الروتينية وبيحول للموظفين بس لما الموضوع يحتاج.',
    author: 'سارة أحمد',
    role: 'مديرة عمليات',
    avatar: 'س',
  },
  {
    quote: 'التكامل مع واتساب كان سلس جداً. عملاءنا بيحبوا سرعة الرد والتجربة الشخصية.',
    author: 'محمد علي',
    role: 'صاحب براند ملابس',
    avatar: 'م',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-zinc-500 mb-4"
          >
            قصص نجاح
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            عملاؤنا يتحدثون
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-zinc-400"
          >
            اكتشف كيف ساعدنا المئات من الشركات
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-white/5 bg-zinc-900/30 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-white">{testimonial.author}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed">
                &quot;{testimonial.quote}&quot;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
