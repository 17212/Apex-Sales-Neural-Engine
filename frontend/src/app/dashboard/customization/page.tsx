'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bot, Sparkles, MessageSquare } from 'lucide-react';

export default function CustomizationPage() {
  const [personality, setPersonality] = useState(50);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white">Bot Customization</h2>
        <p className="text-gray-400 text-sm">Define how your AI agent speaks and behaves.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Col: Identity */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" /> Identity
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bot Name</label>
                <input 
                  type="text" 
                  defaultValue="Apex Assistant" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Welcome Message</label>
                <textarea 
                  rows={3}
                  defaultValue="Hi there! 👋 Welcome to [Store Name]. How can I help you find the perfect product today?"
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all outline-none resize-none"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" /> Personality Engine
            </h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>Professional & Formal</span>
                  <span>Friendly & Casual</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={personality}
                  onChange={(e) => setPersonality(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Tone of Voice</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Helpful', 'Sales-Focus', 'Witty'].map((tone) => (
                    <button key={tone} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                      {tone}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Col: Preview */}
        <div className="bg-[#000] border border-white/10 rounded-[3rem] p-6 shadow-2xl relative overflow-hidden h-fit">
          <div className="absolute top-0 left-0 w-full h-12 bg-white/5 border-b border-white/5 flex items-center justify-center">
             <span className="text-xs text-gray-500">Live Preview</span>
          </div>
          
          <div className="mt-8 space-y-4">
             <div className="flex gap-3 justify-end">
               <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-sm text-sm text-white max-w-[80%]">
                 Can you recommend a gift for my tech-savvy brother?
               </div>
             </div>
             
             <div className="flex gap-3">
               <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">AI</div>
               <div className="bg-white/10 p-3 rounded-2xl rounded-tl-sm text-sm text-gray-200 border border-white/5 max-w-[85%]">
                 {personality > 50 
                   ? "Absolutely! 🎁 For a tech lover, I highly recommend our new Noise-Cancelling Headphones. They are currently a bestseller! Would you like to see the specs?"
                   : "Certainly. Based on your request, the Noise-Cancelling Headphones would be a suitable choice. They feature industry-leading active noise cancellation."}
               </div>
             </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5">
             <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors">
               <Save className="w-4 h-4" /> Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
