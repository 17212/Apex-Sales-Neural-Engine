'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bot, Zap, Shield, Play } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-[var(--bg-primary)]">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-default)] text-xs font-medium text-[var(--text-secondary)] mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse"></span>
            Apex Sales Neural Engine v2.0
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
             أتمتة المبيعات بذكاء
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-tertiary)]">
              ضاعف أرباحك فوراً
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            نظام ذكاء اصطناعي متكامل يدير محادثات عملائك على واتساب وتيليجرام، يغلق الصفقات، ويتابع الطلبات 24/7 بدون تدخل بشري.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/dashboard" className="w-full sm:w-auto btn btn-primary px-8 py-4 text-lg h-auto rounded-xl shadow-[0_0_20px_-5px_var(--primary-500)] hover:shadow-[0_0_30px_-5px_var(--primary-500)] transition-all">
              ابدأ مجاناً الآن
              <ArrowRight className="w-5 h-5 mr-2" />
            </Link>
            
            <button className="w-full sm:w-auto px-8 py-4 text-lg h-auto rounded-xl border border-[var(--border-default)] bg-[var(--bg-elevated)] hover:bg-[var(--bg-secondary)] transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              شاهد الديمو
            </button>
          </motion.div>
        </div>

        {/* Hero Visual - Dashboard Preview */}
                  <div className="h-24 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-default)] p-4">
                     <div className="w-8 h-8 rounded bg-[var(--primary-500)]/10 mb-2"></div>
                     <div className="h-4 w-12 bg-[var(--text-secondary)]/10 rounded"></div>
                  </div>
                  <div className="h-24 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-default)] p-4">
                     <div className="w-8 h-8 rounded bg-[var(--warning)]/10 mb-2"></div>
                     <div className="h-4 w-12 bg-[var(--text-secondary)]/10 rounded"></div>
                  </div>
                </div>
                
                <div className="h-64 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-default)] flex items-center justify-center">
                  <div className="text-[var(--text-tertiary)]">Live Analytics Visualization...</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow Effect behind dashboard */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[var(--primary-500)]/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}
