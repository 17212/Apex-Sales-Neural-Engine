'use client';

import { motion } from 'framer-motion';
import { Bot, Sparkles, ArrowRight, CheckCircle, Play } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[var(--primary-500)]/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--secondary-500)]/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-right"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary-500)]/10 border border-[var(--primary-500)]/20 text-[var(--primary-400)] text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span>الجيل القادم من الذكاء الاصطناعي للمبيعات</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              ضاعف مبيعاتك مع
              <br />
              <span className="gradient-text">الموظف الذكي</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              أول نظام في العالم العربي يدمج الذكاء الاصطناعي (Gemini 2.5) لإدارة مبيعاتك على واتساب، ماسنجر، وتيليجرام بشكل آلي 100%.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href="/login" className="btn btn-primary text-lg px-8 py-4 w-full sm:w-auto overflow-hidden group relative">
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ التجربة المجانية
                  <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Link>
              
              <button className="btn btn-secondary text-lg px-8 py-4 w-full sm:w-auto flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
                شاهد الفيديو
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-[var(--text-tertiary)] text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                <span>تجربة مجانية 14 يوم</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                <span>لا حاجة لبطاقة ائتمان</span>
              </div>
            </div>
          </motion.div>

          {/* Abstract 3D Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex-1 relative w-full max-w-[600px]"
          >
            <div className="relative aspect-square">
              {/* Outer Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary-500)] to-[var(--secondary-500)] rounded-full blur-[80px] opacity-20 animate-pulse-slow" />
              
              {/* Main Card Element */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 glass-card border border-[var(--primary-500)]/30 overflow-hidden flex flex-col"
              >
                {/* Fake Chat Interface */}
                <div className="p-4 border-b border-[var(--border-default)] flex items-center gap-3 bg-[var(--bg-secondary)]/50">
                  <div className="w-3 h-3 rounded-full bg-[var(--error)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--warning)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--success)]" />
                  <div className="mr-4 flex items-center gap-2">
                    <Bot className="w-4 h-4 text-[var(--primary-400)]" />
                    <span className="text-xs font-mono text-[var(--text-secondary)]">Apex AI Agent</span>
                  </div>
                </div>
                
                <div className="flex-1 p-6 space-y-6 overflow-hidden">
                  {/* Message 1 */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 }}
                    className="flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex-shrink-0" />
                    <div className="bg-[var(--bg-tertiary)] p-4 rounded-2xl rounded-tr-none max-w-[80%]">
                      <div className="h-2 w-32 bg-[var(--text-secondary)]/20 rounded mb-2" />
                      <div className="h-2 w-48 bg-[var(--text-secondary)]/10 rounded" />
                    </div>
                  </motion.div>

                  {/* Message 2 (AI) */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2 }}
                    className="flex flex-row-reverse gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div className="bg-[var(--primary-500)]/10 border border-[var(--primary-500)]/20 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-right">
                      <p className="text-sm text-[var(--text-primary)]">أهلاً بك يا أحمد! 👋</p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        المنتج اللي بتسأل عنه متوفر بخصم 20% النهاردة. تحب أحجزلك قطعة؟ 🎁
                      </p>
                    </div>
                  </motion.div>

                  {/* Stats Overlay */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                    className="absolute bottom-6 right-6 left-6 p-4 glass-card bg-[var(--bg-elevated)]/80 backdrop-blur-md border border-[var(--success)]/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--success)]/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-[var(--success)]" />
                      </div>
                      <div>
                        <p className="text-xs text-[var(--text-tertiary)]">تم إغلاق الصفقة</p>
                        <p className="text-sm font-bold text-[var(--success)]">نجاح 100%</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-[var(--text-tertiary)]">القيمة</p>
                      <p className="text-sm font-bold">1,250 ج.م</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-8 top-20 glass-card p-3 rounded-2xl flex items-center gap-3 shadow-xl border border-[var(--border-default)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                <span className="font-medium text-sm">WhatsApp Connected</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -left-4 bottom-32 glass-card p-3 rounded-2xl flex items-center gap-3 shadow-xl border border-[var(--border-default)]"
              >
                <div className="w-2 h-2 rounded-full bg-[#0088cc]" />
                <span className="font-medium text-sm">Telegram Active</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
