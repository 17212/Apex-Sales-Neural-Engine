'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageSquare, Bot, LineChart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-black selection:bg-purple-500/30">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">
              Gemini 2.5 Flash Engine Active
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tight">
            The First AI Sales Employee That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-text">
              Never Sleeps.
            </span>
          </h1>

          <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
            Apex Sales Neural Engine converts leads, handles support, and closes deals 24/7 on WhatsApp, Telegram, and Messenger. Stop losing customers to slow responses.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/dashboard/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#live-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <Bot className="w-5 h-5" /> Try Live Demo
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gray-700 border-2 border-black"
                  />
                ))}
              </div>
              <span>Trusted by 500+ Store Owners</span>
            </div>
          </div>
        </motion.div>

        {/* Right Content - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          {/* Main Card */}
          <div className="relative bg-black/40 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl shadow-purple-900/20 w-fit mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-4 min-w-[350px]">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center text-white">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold">Apex Sales Bot</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Online
                </p>
              </div>
            </div>

            {/* Chat Area */}
            <div className="space-y-4 font-mono text-sm">
              {/* User Message */}
              <div className="flex gap-3 justify-end">
                <div className="bg-blue-600/20 text-blue-100 p-3 rounded-2xl rounded-tr-sm border border-blue-500/20 max-w-[80%]">
                  Do you have this running shoe in size 44?
                </div>
              </div>

              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="bg-white/10 text-gray-200 p-3 rounded-2xl rounded-tl-sm border border-white/5 max-w-[85%]">
                  <p className="mb-2">Yes! We have the <span className="text-purple-400 font-bold">UltraBoost X</span> in size 44. It's currently 15% OFF!</p>
                  <p>Would you like to see 3 other popular models in your size?</p>
                </div>
              </div>

              {/* Chips */}
              <div className="flex gap-2 pl-2">
                <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-purple-300 transition-colors">
                  Yes, show me
                </button>
                <button className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-400 transition-colors">
                  Buy Now
                </button>
              </div>
            </div>

            {/* Stats Overlay */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 -bottom-6 bg-[#0F0F0F] p-4 rounded-xl border border-white/10 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-500">
                  <LineChart className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-400">Conversion Rate</div>
                  <div className="text-lg font-bold text-white">+24.8%</div>
                </div>
              </div>
              <div className="text-[10px] text-green-400">vs last week</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
