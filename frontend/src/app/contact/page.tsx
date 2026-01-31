'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      
      <div className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">تواصل معنا</h1>
          <p className="text-xl text-[var(--text-secondary)]">
            فريق الدعم جاهز للرد على استفساراتك ومساعدتك في أي وقت
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <ContactCard 
              icon={Mail}
              title="البريد الإلكتروني"
              info="idris.ghamid@gmail.com"
              desc="للرد السريع على الاستفسارات العامة"
            />
            <ContactCard 
              icon={Phone}
              title="الهاتف / واتساب"
              info="+20 100 000 0000"
              desc="متاح من 9 صباحاً حتى 5 مساءً"
            />
            <ContactCard 
              icon={MapPin}
              title="المقر الرئيسي"
              info="القاهرة، مصر"
              desc="IDRISIUM Corp HQ"
            />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold mb-6">أرسل رسالة</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">الاسم</label>
                  <input type="text" className="input w-full" placeholder="اسمك الكريم" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <input type="email" className="input w-full" placeholder="email@example.com" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">الموضوع</label>
                <input type="text" className="input w-full" placeholder="كيف يمكننا مساعدتك؟" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">الرسالة</label>
                <textarea className="input w-full h-32 resize-none" placeholder="اكتب تفاصيل استفسارك هنا..." />
              </div>

              <button className="btn btn-primary w-full py-3 flex items-center justify-center gap-2">
                <Send className="w-5 h-5" />
                إرسال الرسالة
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

function ContactCard({ icon: Icon, title, info, desc }: any) {
  return (
    <div className="glass-card p-6 flex items-start gap-4 hover:border-[var(--primary-500)]/30 transition-colors cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-[var(--primary-500)]/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-[var(--primary-500)]" />
      </div>
      <div>
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <p className="text-[var(--text-primary)] font-medium mb-1">{info}</p>
        <p className="text-sm text-[var(--text-tertiary)]">{desc}</p>
      </div>
    </div>
  );
}
