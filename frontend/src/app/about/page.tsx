'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { motion } from 'framer-motion';
import { Users, Target, Rocket, Heart, Bot } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] mb-8 shadow-lg"
          >
            <Bot className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            نحن نبني مستقبل <span className="gradient-text">المبيعات الذكية</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-[var(--text-secondary)] leading-relaxed"
          >
            في IDRISIUM، نؤمن بأن الذكاء الاصطناعي ليس مجرد أداة، بل هو شريك استراتيجي يمكنه تحويل طريقة عمل الشركات وزيادة أرباحها بشكل غير مسبوق.
          </motion.p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[var(--bg-secondary)]/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ValueCard 
              icon={Target}
              title="رؤيتنا"
              desc="تمكين كل شركة عربية من امتلاك فريق مبيعات ذكي يعمل 24/7 بتكلفة معقولة."
              delay={0}
            />
            <ValueCard 
              icon={Rocket}
              title="مهمتنا"
              desc="تطوير أدوات ذكاء اصطناعي تفهم ثقافتنا ولهجاتنا العربية وتساعدنا على النمو."
              delay={0.1}
            />
            <ValueCard 
              icon={Heart}
              title="قيمنا"
              desc="الشفافية، الابتكار المستمر، والتركيز المطلق على نجاح العميل."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-20 container mx-auto px-4">
        <div className="glass-card p-8 md:p-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-6">كلمة المؤسس</h2>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              "بدأت Apex بحلم بسيط: كيف يمكننا جعل التكنولوجيا المتقدمة في متناول الجميع؟ 
              اليوم، نحن فخورون بخدمة مئات الشركات ومساعدتهم على تحقيق أهدافهم. 
              هذه مجرد البداية، والقادم أعظم."
            </p>
            <div>
              <h3 className="font-bold text-xl">Idris Ghamid</h3>
              <p className="text-[var(--primary-400)]">CEO & Founder, IDRISIUM Corp</p>
            </div>
          </div>
          <div className="relative w-64 h-64 flex-shrink-0">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-500)] to-[var(--secondary-500)] rounded-full blur-3xl opacity-20" />
             <div className="relative w-full h-full rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center border-4 border-[var(--bg-elevated)] overflow-hidden">
                <span className="text-6xl">👑</span>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ValueCard({ icon: Icon, title, desc, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="glass-card p-8 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-[var(--primary-500)]/10 flex items-center justify-center mx-auto mb-6">
        <Icon className="w-8 h-8 text-[var(--primary-500)]" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-[var(--text-secondary)]">{desc}</p>
    </motion.div>
  );
}
