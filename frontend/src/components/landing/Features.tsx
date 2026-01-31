'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, Database, BarChart3, Globe, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: Clock,
    title: '24/7 Sales Agent',
    description: 'Never miss a lead. Your AI agent replies instantly at 3 AM just as effectively as 3 PM.',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10'
  },
  {
    icon: MessageCircle,
    title: 'Multi-Channel Support',
    description: 'Unified sales on WhatsApp, Telegram, Messenger, and Instagram from one dashboard.',
    color: 'text-green-400',
    bg: 'bg-green-400/10'
  },
  {
    icon: Database,
    title: 'Instant Product Sync',
    description: 'AI automatically learns your inventory, prices, and stock levels in real-time.',
    color: 'text-purple-400',
    bg: 'bg-purple-400/10'
  },
  {
    icon: BarChart3,
    title: 'Deep Analytics',
    description: 'Track conversation conversion rates, popular products, and customer sentiment.',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10'
  },
  {
    icon: Globe,
    title: '15+ Languages',
    description: 'Sell globally. The neural engine detects language and responds natively.',
    color: 'text-pink-400',
    bg: 'bg-pink-400/10'
  },
  {
    icon: ShieldCheck,
    title: 'Brand Safe',
    description: 'Strict guardrails ensure the AI never hallucinates discounts or makes false promises.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Everything you need to <span className="text-purple-500">scale sales</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Replace your slow manual support with an intelligent neural engine that understands context, handles objections, and closes deals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.bg} ${feature.color} flex items-center justify-center mb-6 text-xl group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
