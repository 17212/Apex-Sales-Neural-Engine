'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Database, FileText, Globe, Upload, RefreshCw } from 'lucide-react';

const sources = [
  { type: 'Product Catalog', name: 'Shopify Sync', status: 'Active', lastSync: '2 mins ago', icon: Database },
  { type: 'Document', name: 'Return_Policy.pdf', status: 'Processed', lastSync: '1 day ago', icon: FileText },
  { type: 'Website', name: 'FAQ Page', status: 'Pending', lastSync: 'Just now', icon: Globe },
];

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Services & Training</h2>
          <p className="text-gray-400 text-sm">Teach your AI about your business.</p>
        </div>
        <div className="flex gap-3">
           <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors">
             <RefreshCw className="w-4 h-4" /> Sync Now
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-white font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20">
             <Upload className="w-4 h-4" /> Add Source
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Knowledge Base List */}
        <div className="lg:col-span-2 space-y-4">
          {sources.map((source, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-gray-700 group-hover:text-white transition-colors">
                  <source.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-medium">{source.name}</h4>
                  <p className="text-xs text-gray-500">{source.type}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className={`text-xs font-bold ${source.status === 'Active' ? 'text-green-400' : source.status === 'Pending' ? 'text-yellow-400' : 'text-blue-400'}`}>
                    {source.status}
                  </div>
                  <div className="text-xs text-gray-600">{source.lastSync}</div>
                </div>
                <button className="text-gray-400 hover:text-white transition-colors">
                  Edit
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
          <h3 className="text-lg font-bold text-white mb-4">Neural Engine Status</h3>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Knowledge Consumption</span>
                <span className="text-white font-bold">84%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[84%]" />
              </div>
            </div>

            <div className="p-4 bg-black/20 rounded-xl border border-white/5">
              <div className="text-xs text-gray-500 mb-1">Total Vectors</div>
              <div className="text-xl font-bold text-white">14,205</div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
              <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 shrink-0" />
              <p className="text-xs text-green-200 leading-relaxed">
                Your AI is fully operational and synced with your latest product catalog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
