'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, MessageSquare, Users, TrendingUp, ShoppingBag } from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$12,450', change: '+15%', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Conversations', value: '1,240', change: '+8%', icon: MessageSquare, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Active Leads', value: '340', change: '+24%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Conversion Rate', value: '4.2%', change: '+1.2%', icon: TrendingUp, color: 'text-orange-400', bg: 'bg-orange-400/10' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col justify-center items-center text-gray-500">
          <div className="w-full h-full bg-gradient-to-t from-purple-900/10 to-transparent rounded-xl border border-white/5 flex items-end justify-between p-4 gap-2">
             {/* Fake Bars */}
             {[40, 60, 45, 70, 50, 80, 65, 90, 75, 55, 60, 85].map((h, i) => (
               <div key={i} className="w-full bg-purple-600/50 rounded-t-sm hover:bg-purple-500 transition-colors" style={{ height: `${h}%` }}></div>
             ))}
          </div>
          <p className="mt-4 text-sm">Revenue Overview (Last 12 Months)</p>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-6">Live Feed</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-200">
                    <span className="font-bold text-white">Ahmed</span> purchased <span className="text-purple-400">Black Hoodie</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 mins ago via WhatsApp</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
