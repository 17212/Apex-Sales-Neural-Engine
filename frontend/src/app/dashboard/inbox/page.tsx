// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Inbox Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Bot,
  User,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  AlertTriangle,
  CheckCheck,
  ArrowRight,
} from 'lucide-react';

const mockConversations = [
  {
    id: '1',
    customer: { name: 'أحمد محمد', phone: '+201001234567' },
    channel: 'whatsapp',
    lastMessage: 'عايز أعرف سعر الآيفون 15 برو ماكس',
    time: 'منذ 2 دقيقة',
    unread: 3,
    sentiment: 'positive',
    handledBy: 'bot',
    isOnline: true,
  },
  {
    id: '2',
    customer: { name: 'منى علي', phone: '+201112345678' },
    channel: 'telegram',
    lastMessage: 'فين الشحنة؟ أنا مستنية من أسبوع!',
    time: 'منذ 5 دقائق',
    unread: 0,
    sentiment: 'hostile',
    handledBy: 'human',
    priority: true,
  },
  {
    id: '3',
    customer: { name: 'محمد الشريف', phone: '+201223456789' },
    channel: 'messenger',
    lastMessage: 'شكراً جداً على الخدمة الممتازة 🔥',
    time: 'منذ 15 دقيقة',
    unread: 0,
    sentiment: 'positive',
    handledBy: 'bot',
  },
  {
    id: '4',
    customer: { name: 'سارة أحمد', phone: '+201334567890' },
    channel: 'instagram',
    lastMessage: 'المنتج ده متوفر؟',
    time: 'منذ 30 دقيقة',
    unread: 1,
    sentiment: 'neutral',
    handledBy: 'bot',
  },
];

const mockMessages = [
  { id: '1', sender: 'customer', content: 'السلام عليكم', time: '10:30 ص' },
  { id: '2', sender: 'bot', content: 'وعليكم السلام! 👋 أهلاً بيك في متجر APEX! أنا البوت الذكي وهساعدك النهاردة. عايز تسأل عن إيه؟', time: '10:30 ص' },
  { id: '3', sender: 'customer', content: 'عايز أعرف سعر الآيفون 15 برو ماكس', time: '10:31 ص' },
  { id: '4', sender: 'bot', content: 'اختيار ممتاز! 🔥\n\n📱 iPhone 15 Pro Max\n💰 سعر: 58,999 ج.م\n📦 متوفر: 5 قطع\n🎁 عرض خاص: خصم 5% لو طلبت دلوقتي!\n\nعايز أضيفه للسلة؟', time: '10:31 ص' },
  { id: '5', sender: 'customer', content: 'أيوه، وعايز أعرف طرق الدفع', time: '10:32 ص' },
];

const channelColors: Record<string, string> = {
  whatsapp: '#25D366',
  telegram: '#0088CC',
  messenger: '#0084FF',
  instagram: '#E4405F',
};

export default function InboxPage() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0]);
  const [message, setMessage] = useState('');

  return (
    <div className="h-[calc(100vh-6.5rem)] flex gap-4">
      {/* Conversations List */}
      <div className="w-96 glass-card flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-default)]">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="بحث في المحادثات..."
                className="input pr-10 text-sm"
              />
            </div>
            <button className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] transition-colors">
              <Filter className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex gap-2">
            {['الكل', 'البوت', 'تحويلات', 'مهم'].map((filter, i) => (
              <button
                key={filter}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  i === 0
                    ? 'bg-[var(--primary-500)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {mockConversations.map((conv) => (
            <motion.button
              key={conv.id}
              onClick={() => setSelectedConv(conv)}
              whileHover={{ x: 4 }}
              className={`w-full p-4 text-right border-b border-[var(--border-default)] transition-colors ${
                selectedConv.id === conv.id
                  ? 'bg-[var(--primary-500)]/10'
                  : 'hover:bg-[var(--bg-tertiary)]'
              } ${conv.priority ? 'bg-[var(--error)]/5' : ''}`}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-medium">
                    {conv.customer.name.charAt(0)}
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                    style={{ backgroundColor: channelColors[conv.channel] }}
                  >
                    {conv.channel === 'whatsapp' ? '📱' : conv.channel === 'telegram' ? '✈️' : '💬'}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium truncate">{conv.customer.name}</span>
                    <span className="text-xs text-[var(--text-tertiary)] flex-shrink-0">
                      {conv.time}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] truncate mt-1">
                    {conv.lastMessage}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: conv.handledBy === 'bot' ? 'var(--secondary-500)' : 'var(--primary-500)',
                        color: 'white',
                      }}
                    >
                      {conv.handledBy === 'bot' ? '🤖 بوت' : '👤 إنسان'}
                    </span>
                    {conv.priority && (
                      <AlertTriangle className="w-4 h-4 text-[var(--error)]" />
                    )}
                  </div>
                </div>

                {/* Unread */}
                {conv.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[var(--primary-500)] text-white text-xs flex items-center justify-center">
                    {conv.unread}
                  </span>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 glass-card flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-medium">
                {selectedConv.customer.name.charAt(0)}
              </div>
              {selectedConv.isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[var(--success)] border-2 border-[var(--bg-secondary)]" />
              )}
            </div>
            <div>
              <h3 className="font-semibold">{selectedConv.customer.name}</h3>
              <p className="text-xs text-[var(--text-tertiary)]">
                {selectedConv.customer.phone}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          <AnimatePresence>
            {mockMessages.map((msg, i) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex ${msg.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-2xl ${
                    msg.sender === 'customer'
                      ? 'bg-[var(--bg-tertiary)] rounded-tr-sm'
                      : 'bg-gradient-to-br from-[var(--primary-500)] to-[var(--primary-600)] text-white rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                  <div className={`flex items-center gap-1 mt-1 ${msg.sender === 'customer' ? 'text-[var(--text-tertiary)]' : 'text-white/70'}`}>
                    <span className="text-xs">{msg.time}</span>
                    {msg.sender === 'bot' && <CheckCheck className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-[var(--border-default)]">
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
              <Paperclip className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="input pr-4 pl-10"
              />
              <button className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            <button className="btn btn-primary p-3">
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center gap-2 mt-3">
            <button className="btn btn-ghost text-xs">
              <Bot className="w-4 h-4" />
              تفعيل البوت
            </button>
            <button className="btn btn-ghost text-xs">
              <User className="w-4 h-4" />
              تحويل لإنسان
            </button>
            <button className="btn btn-ghost text-xs">
              <ArrowRight className="w-4 h-4" />
              إنشاء طلب
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
