'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, RefreshCw } from 'lucide-react';

const conversation = [
  { role: 'user', text: 'Hi, do you have the black hoodie in size L?' },
  { role: 'bot', text: 'Hello! 👋 Yes, the [Midnight Black Hoodie] is available in Large. It is currently trending!' },
  { role: 'bot', text: 'Would you like to see a photo or proceed to checkout?' },
  { role: 'user', text: 'Show me a photo please.' },
  { role: 'bot', text: 'Here it is! 📸 [Image Placeholder]', type: 'image' },
  { role: 'bot', text: 'We also have a matching cap for 20% off if you buy together. Interested?' },
];

const LiveDemo = () => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && index < conversation.length) {
      interval = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 2000);
    } else if (index >= conversation.length) {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [index, isPlaying]);

  const handleStart = () => {
    setIndex(0);
    setIsPlaying(true);
  };

  return (
    <section id="live-demo" className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Helper Text */}
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="text-sm font-medium text-purple-300">Live Simulation</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            See the Neural Engine in <span className="text-blue-500">Action</span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Watch how Apex handles customer inquiries, identifies intent, and upsells products autonomously. No human intervention required.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Instant Responses</h4>
                <p className="text-gray-500 text-sm">Responds in under 2 seconds, keeping leads warm.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg">Smart Upselling</h4>
                <p className="text-gray-500 text-sm">Suggests related products based on cart analysis.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Phone Simulation */}
        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative w-[350px] h-[700px] border-8 border-gray-900 rounded-[3rem] bg-[#000] shadow-2xl overflow-hidden">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-20" />
            
            {/* Status Bar */}
            <div className="absolute top-2 right-6 flex gap-2 z-10">
              <div className="w-4 h-4 bg-white/20 rounded-full" />
              <div className="w-4 h-4 bg-white/20 rounded-full" />
            </div>

            {/* Chat Header */}
            <div className="bg-[#1F2937] p-4 pt-12 flex items-center gap-3 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                A
              </div>
              <div>
                <div className="text-white font-medium text-sm">Apex Store</div>
                <div className="text-xs text-green-400">Online</div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="p-4 h-[520px] bg-[#0B0F19] overflow-y-auto space-y-4 flex flex-col">
              <AnimatePresence>
                {conversation.slice(0, index).map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-tr-sm'
                          : 'bg-[#1F2937] text-gray-200 rounded-tl-sm'
                      }`}
                    >
                      {msg.text}
                      {msg.type === 'image' && (
                        <div className="mt-2 w-full h-32 bg-gray-700 rounded-lg animate-pulse" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {isPlaying && index < conversation.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-1 ml-2"
                >
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-0" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 w-full p-4 bg-[#1F2937] border-t border-white/5 flex items-center gap-2">
              <input 
                disabled 
                placeholder={isPlaying ? "Apex is typing..." : "Start demo..."}
                className="flex-1 bg-black/20 text-white text-sm px-4 py-2 rounded-full border border-white/10" 
              />
              <button 
                onClick={handleStart}
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white"
              >
                {isPlaying ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;
