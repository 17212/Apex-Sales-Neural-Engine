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
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 20 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5, type: 'spring' }}
          className="mt-20 relative perspective-[2000px]"
        >
          <div className="relative rounded-2xl border border-[var(--border-default)] bg-[var(--bg-elevated)]/50 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] max-w-5xl mx-auto transform hover:scale-[1.01] transition-transform duration-700">
            {/* Mock UI Header */}
            <div className="h-12 border-b border-[var(--border-default)] bg-[var(--bg-secondary)]/80 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <div className="mx-auto w-1/3 h-6 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-default)] text-[10px] flex items-center justify-center text-[var(--text-tertiary)] font-mono">
                apex-sales-engine.dashboard
              </div>
            </div>
            
            {/* Mock UI Content */}
            <div className="p-6 grid grid-cols-12 gap-6 h-full font-mono text-xs opacity-80">
              {/* Sidebar */}
              <div className="col-span-2 space-y-3">
                <div className="h-8 w-full bg-[var(--primary-500)]/10 rounded-lg border border-[var(--primary-500)]/20"></div>
                <div className="h-8 w-full bg-[var(--bg-tertiary)] rounded-lg"></div>
                <div className="h-8 w-full bg-[var(--bg-tertiary)] rounded-lg"></div>
                <div className="h-8 w-full bg-[var(--bg-tertiary)] rounded-lg"></div>
              </div>
              
              {/* Main Area */}
              <div className="col-span-10 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 bg-[var(--bg-tertiary)] rounded-xl border border-[var(--border-default)] p-4">
                    <div className="w-8 h-8 rounded bg-[var(--success)]/10 mb-2"></div>
                    <div className="h-4 w-12 bg-[var(--text-secondary)]/10 rounded"></div>
                  </div>
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
