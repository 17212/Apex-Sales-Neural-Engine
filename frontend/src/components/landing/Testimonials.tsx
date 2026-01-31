'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { name: 'Ahmed Ali', store: 'UrbanKicks', quote: 'Sales increased by 40% in the first week. The bot handles 90% of our DMs.', color: 'border-blue-500' },
  { name: 'Sarah Miller', store: 'Glow Cosmetics', quote: 'It feels exactly like a human sales rep. My customers love the instant replies.', color: 'border-purple-500' },
  { name: 'Mohamed Tarek', store: 'TechHub', quote: 'Setup took 5 minutes. The integration with our inventory is seamless.', color: 'border-green-500' },
  { name: 'Jessica Lee', store: 'PetPlanet', quote: 'Saved me 4 hours a day of answering repeating questions.', color: 'border-orange-500' },
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="absolute left-0 top-0 w-32 h-full z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="absolute right-0 top-0 w-32 h-full z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="container mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Trusted by Market Leaders</h2>
      </div>

      <div className="flex gap-8 w-max animate-marquee hover:pause">
        {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
          <div 
            key={i}
            className={`w-[350px] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm ${t.color} border-l-4`}
          >
            <p className="text-gray-300 mb-6 italic text-lg leading-relaxed">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600" />
              <div>
                <div className="text-white font-bold">{t.name}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wide">{t.store}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
