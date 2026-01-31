'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-24">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:64px_64px]" />
      
      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm text-zinc-400">Apex Sales Neural Engine v2.0</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]"
        >
          أتمتة مبيعاتك
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">
            بذكاء اصطناعي
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed"
        >
          نظام ذكاء اصطناعي يدير محادثات عملائك على واتساب وتيليجرام،
          يغلق الصفقات، ويتابع الطلبات 24/7 بدون تدخل بشري.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-black hover:bg-zinc-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]"
          >
            ابدأ مجاناً الآن
            <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-medium text-white hover:bg-white/10 transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            شاهد الديمو
          </button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 relative"
        >
          <div className="rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm overflow-hidden shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-zinc-900/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
                <div className="w-3 h-3 rounded-full bg-zinc-700" />
              </div>
              <div className="mx-auto px-4 py-1.5 rounded-lg bg-zinc-800 text-xs text-zinc-500 font-mono">
                apex-sales.dashboard
              </div>
            </div>
            
            {/* Dashboard Content */}
            <div className="p-6 md:p-8 grid grid-cols-12 gap-4">
              {/* Sidebar */}
              <div className="hidden md:block col-span-2 space-y-3">
                <div className="h-10 rounded-lg bg-white/5 border border-white/5" />
                <div className="h-8 rounded-lg bg-zinc-800/50" />
                <div className="h-8 rounded-lg bg-zinc-800/50" />
                <div className="h-8 rounded-lg bg-zinc-800/50" />
              </div>
              
              {/* Main Content */}
              <div className="col-span-12 md:col-span-10 space-y-4">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'المحادثات', value: '2,847' },
                    { label: 'المبيعات', value: '₪847K' },
                    { label: 'معدل التحويل', value: '34%' },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-white/5 bg-zinc-800/30 p-4">
                      <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                {/* Chart Placeholder */}
                <div className="h-48 md:h-64 rounded-xl border border-white/5 bg-zinc-800/30 flex items-center justify-center">
                  <div className="flex items-end gap-2 h-32">
                    {[40, 65, 45, 80, 55, 90, 70, 85].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        className="w-6 md:w-8 rounded-t-md bg-gradient-to-t from-zinc-700 to-zinc-600"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-zinc-500/20 via-white/10 to-zinc-500/20 blur-3xl -z-10 rounded-3xl opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
