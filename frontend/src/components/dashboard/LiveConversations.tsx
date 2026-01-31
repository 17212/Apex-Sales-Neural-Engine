// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Live Conversations Component
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { motion } from 'framer-motion';
import { MessageSquare, User, Bot, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const conversations = [
  {
    id: '1',
    customer: 'أحمد محمد',
    lastMessage: 'عايز أعرف سعر الآيفون 15 برو ماكس',
    channel: 'whatsapp',
    sentiment: 'positive',
    handledBy: 'bot',
    time: 'الآن',
    unread: 2,
  },
  {
    id: '2',
    customer: 'منى علي',
    lastMessage: 'فين الشحنة بتاعتي؟! أنا مستنية من أسبوع!!',
    channel: 'telegram',
    sentiment: 'hostile',
    handledBy: 'human',
    time: 'منذ 3 دقائق',
    unread: 0,
    priority: true,
  },
  {
    id: '3',
    customer: 'محمد الشريف',
    lastMessage: 'شكراً جداً، الخدمة ممتازة 🔥',
    channel: 'messenger',
    sentiment: 'positive',
    handledBy: 'bot',
    time: 'منذ 5 دقائق',
    unread: 0,
  },
  {
    id: '4',
    customer: 'سارة أحمد',
    lastMessage: 'هل المنتج ده متوفر باللون الأبيض؟',
    channel: 'instagram',
    sentiment: 'neutral',
    handledBy: 'bot',
    time: 'منذ 10 دقائق',
    unread: 1,
  },
];

const channelIcons: Record<string, string> = {
  whatsapp: '📱',
  telegram: '✈️',
  messenger: '💬',
  instagram: '📸',
};

const sentimentColors: Record<string, string> = {
  positive: 'var(--success)',
  neutral: 'var(--info)',
  hostile: 'var(--error)',
};

export function LiveConversations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">المحادثات النشطة</h3>
          <span className="px-2 py-0.5 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs">
            {conversations.length} نشط
          </span>
        </div>
        <Link
          href="/dashboard/inbox"
          className="text-sm text-[var(--primary-400)] hover:underline"
        >
          فتح الصندوق
        </Link>
      </div>

      <div className="space-y-3">
        {conversations.map((conv, index) => (
          <motion.div
            key={conv.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-xl transition-colors cursor-pointer group ${
              conv.priority
                ? 'bg-[var(--error)]/5 border border-[var(--error)]/20 hover:bg-[var(--error)]/10'
                : 'bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)]'
            }`}
          >
            {/* Avatar */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-medium text-sm">
                {conv.customer.charAt(0)}
              </div>
              <span className="absolute -bottom-1 -right-1 text-sm">
                {channelIcons[conv.channel]}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{conv.customer}</span>
                {conv.priority && (
                  <AlertTriangle className="w-4 h-4 text-[var(--error)]" />
                )}
                <span className="text-xs text-[var(--text-tertiary)]">{conv.time}</span>
              </div>
              <p className="text-sm text-[var(--text-secondary)] truncate">
                {conv.lastMessage}
              </p>
              <div className="flex items-center gap-2 mt-2">
                {/* Handler */}
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-xs text-[var(--text-tertiary)]">
                  {conv.handledBy === 'bot' ? (
                    <Bot className="w-3 h-3" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  <span>{conv.handledBy === 'bot' ? 'البوت' : 'إنسان'}</span>
                </div>
                {/* Sentiment */}
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: sentimentColors[conv.sentiment] }}
                  title={`الحالة: ${conv.sentiment}`}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-end gap-2">
              {conv.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-[var(--primary-500)] text-white text-xs flex items-center justify-center">
                  {conv.unread}
                </span>
              )}
              <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-[var(--bg-elevated)] transition-all">
                <ArrowLeft className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-[var(--border-default)]">
        <button className="btn btn-ghost flex-1 text-sm">
          <Bot className="w-4 h-4" />
          تفعيل الوضع التلقائي
        </button>
        <button className="btn btn-secondary flex-1 text-sm">
          <MessageSquare className="w-4 h-4" />
          الانضمام للمحادثة
        </button>
      </div>
    </motion.div>
  );
}
