'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for small shops getting started.',
    features: ['1,000 Conversations/mo', '1 Channel (WhatsApp)', 'Basic Analytics', 'Email Support'],
    highlight: false
  },
  {
    name: 'Growth',
    price: '99',
    description: 'For growing brands needing scale.',
    features: ['10,000 Conversations/mo', 'All Channels', 'CRM Integration', 'Priority Support', 'Custom AI Training'],
    highlight: true,
    tag: 'Most Popular'
  },
  {
    name: 'Enterprise',
    price: '299',
    description: 'Custom neural networks for volume.',
    features: ['Unlimited Conversations', 'Dedicated Server', 'SLA 99.9%', 'Account Manager', 'API Access'],
    highlight: false
  }
];

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-purple-900/10 blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Start free, upgrade as you grow. No hidden fees.
          </p>

          <div className="inline-flex items-center p-1 bg-white/10 rounded-full border border-white/10 mb-8">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${!isAnnual ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${isAnnual ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              Yearly <span className="text-green-600 text-xs ml-1 font-bold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl p-8 border ${plan.highlight ? 'bg-white/10 border-purple-500/50 shadow-2xl shadow-purple-900/20' : 'bg-white/5 border-white/10'} flex flex-col`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                  {plan.tag}
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-sm h-10">{plan.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-white">${isAnnual ? (parseInt(plan.price) * 0.8).toFixed(0) : plan.price}</span>
                <span className="text-gray-500">/month</span>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-500" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-transform active:scale-95 ${plan.highlight ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                Choose {plan.name}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
