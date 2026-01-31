'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Facebook, Instagram } from 'lucide-react';

const channels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    icon: MessageCircle,
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    status: 'Connected',
    description: 'Automate replies and send catalogs directly on WhatsApp.'
  },
  {
    id: 'telegram',
    name: 'Telegram Bot',
    icon: Send,
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    status: 'Not Connected',
    description: 'Create a bot via BotFather and paste the token here.'
  },
  {
    id: 'messenger',
    name: 'Facebook Messenger',
    icon: Facebook,
    color: 'text-blue-600',
    bg: 'bg-blue-600/10',
    status: 'Connected',
    description: 'Connect your Facebook Page to handle DMs instantly.'
  },
  {
    id: 'instagram',
    name: 'Instagram Direct',
    icon: Instagram,
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
    status: 'Not Connected',
    description: 'Manage Instagram DMs and Story replies automatically.'
  }
];

export default function ConnectionPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Connection Center</h2>
          <p className="text-gray-400 text-sm">Manage your sales channels and integrations.</p>
        </div>
        <button className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
          Add New Channel
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {channels.map((channel, idx) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`w-14 h-14 rounded-2xl ${channel.bg} ${channel.color} flex items-center justify-center`}>
                <channel.icon className="w-8 h-8" />
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                channel.status === 'Connected' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {channel.status}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{channel.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{channel.description}</p>
              
              <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                channel.status === 'Connected'
                  ? 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              }`}>
                {channel.status === 'Connected' ? 'Manage Settings' : 'Connect Now'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
