// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Broadcast Page (Mass Messaging)
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Megaphone,
  Send,
  Users,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  Image,
  Paperclip,
  Sparkles,
  Eye,
  History,
  Target,
} from 'lucide-react';

const customerSegments = [
  { id: 'all', label: 'جميع العملاء', count: 2456, color: '#6366f1' },
  { id: 'vip', label: 'عملاء VIP', count: 156, color: '#f59e0b' },
  { id: 'new', label: 'عملاء جدد (آخر 30 يوم)', count: 342, color: '#22c55e' },
  { id: 'at_risk', label: 'معرضين للخسارة', count: 89, color: '#ef4444' },
  { id: 'inactive', label: 'غير نشطين (60+ يوم)', count: 234, color: '#71717a' },
  { id: 'high_value', label: 'مشتريات عالية (5000+)', count: 78, color: '#8b5cf6' },
];

const channels = [
  { id: 'whatsapp', label: 'واتساب', icon: '📱', color: '#25D366', count: 1890 },
  { id: 'telegram', label: 'تليجرام', icon: '✈️', color: '#0088CC', count: 456 },
  { id: 'messenger', label: 'ماسنجر', icon: '💬', color: '#0084FF', count: 234 },
];

const previousBroadcasts = [
  {
    id: '1',
    title: 'عرض الجمعة البيضاء',
    message: 'خصم 50% على كل المنتجات! 🔥',
    sentAt: '2026-01-30T10:00:00',
    segment: 'all',
    channel: 'whatsapp',
    sent: 2456,
    delivered: 2398,
    read: 1876,
    clicked: 456,
  },
  {
    id: '2',
    title: 'وصول منتجات جديدة',
    message: 'iPhone 15 وصل! 📱',
    sentAt: '2026-01-28T14:00:00',
    segment: 'vip',
    channel: 'telegram',
    sent: 156,
    delivered: 154,
    read: 142,
    clicked: 89,
  },
];

const messageTemplates = [
  { id: '1', title: 'عرض خصم', content: '🔥 عرض خاص ليك! خصم {discount}% على {product}. العرض ساري لـ {days} أيام فقط!' },
  { id: '2', title: 'تذكير', content: '👋 وحشتنا! عندنا منتجات جديدة ممكن تعجبك. تعال شوف!' },
  { id: '3', title: 'منتج جديد', content: '🎉 وصل جديد! {product} متوفر دلوقتي. كن أول المشترين!' },
];

export default function BroadcastPage() {
  const [message, setMessage] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['whatsapp']);
  const [scheduleTime, setScheduleTime] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const toggleChannel = (id: string) => {
    setSelectedChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const getTotalRecipients = () => {
    const segment = customerSegments.find((s) => s.id === selectedSegment);
    return segment?.count || 0;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-[var(--primary-500)]" />
            الرسائل الجماعية
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            أرسل رسائل مخصصة لعملائك عبر كل القنوات
          </p>
        </div>
        <button className="btn btn-secondary">
          <History className="w-4 h-4" />
          سجل الرسائل
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Message Composer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Send className="w-5 h-5 text-[var(--primary-500)]" />
              كتابة الرسالة
            </h3>

            {/* Templates */}
            <div className="mb-4">
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                قوالب سريعة
              </label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                {messageTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setMessage(template.content)}
                    className="px-3 py-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-elevated)] text-sm whitespace-nowrap transition-colors"
                  >
                    {template.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="اكتب رسالتك هنا... يمكنك استخدام الإيموجي 🔥"
                rows={5}
                className="input resize-none"
              />
              <div className="absolute bottom-3 left-3 flex gap-2">
                <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg hover:bg-[var(--primary-500)]/10 text-[var(--primary-500)]">
                  <Sparkles className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-[var(--text-tertiary)] mt-2">
              {message.length} / 1000 حرف
            </p>
          </motion.div>

          {/* Target Audience */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--secondary-500)]" />
              الجمهور المستهدف
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {customerSegments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={`p-4 rounded-xl border transition-all text-right ${
                    selectedSegment === segment.id
                      ? 'border-[var(--primary-500)] bg-[var(--primary-500)]/10'
                      : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
                  }`}
                >
                  <div
                    className="w-3 h-3 rounded-full mb-2"
                    style={{ backgroundColor: segment.color }}
                  />
                  <p className="font-medium text-sm">{segment.label}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {segment.count.toLocaleString()} عميل
                  </p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4">القنوات</h3>

            <div className="flex gap-3">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => toggleChannel(channel.id)}
                  className={`flex-1 p-4 rounded-xl border transition-all ${
                    selectedChannels.includes(channel.id)
                      ? 'border-2'
                      : 'border-[var(--border-default)] opacity-50'
                  }`}
                  style={{
                    borderColor: selectedChannels.includes(channel.id)
                      ? channel.color
                      : undefined,
                  }}
                >
                  <div className="text-2xl mb-2">{channel.icon}</div>
                  <p className="font-medium">{channel.label}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">
                    {channel.count} مشترك
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview & Send */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold text-lg mb-4">ملخص الإرسال</h3>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <span className="text-[var(--text-secondary)]">المستلمين</span>
                <span className="font-bold text-[var(--primary-500)]">
                  {getTotalRecipients().toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <span className="text-[var(--text-secondary)]">القنوات</span>
                <span>{selectedChannels.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-tertiary)]">
                <span className="text-[var(--text-secondary)]">التكلفة المتوقعة</span>
                <span className="text-[var(--success)]">مجاني</span>
              </div>
            </div>

            {/* Schedule */}
            <div className="mb-6">
              <label className="text-sm text-[var(--text-secondary)] mb-2 block">
                جدولة الإرسال (اختياري)
              </label>
              <input
                type="datetime-local"
                value={scheduleTime || ''}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="input text-sm"
              />
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setShowPreview(true)}
                className="btn btn-secondary w-full"
              >
                <Eye className="w-4 h-4" />
                معاينة الرسالة
              </button>
              <button
                className="btn btn-primary w-full"
                disabled={!message || !selectedSegment || selectedChannels.length === 0}
              >
                <Send className="w-4 h-4" />
                {scheduleTime ? 'جدولة الإرسال' : 'إرسال الآن'}
              </button>
            </div>

            {/* Warning */}
            <div className="mt-4 p-3 rounded-lg bg-[var(--warning)]/10 border border-[var(--warning)]/20">
              <p className="text-xs text-[var(--warning)] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                تأكد من مراجعة الرسالة قبل الإرسال. لا يمكن التراجع بعد الإرسال.
              </p>
            </div>
          </motion.div>

          {/* Recent Broadcasts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold mb-4">آخر الرسائل</h3>

            <div className="space-y-3">
              {previousBroadcasts.map((broadcast) => (
                <div
                  key={broadcast.id}
                  className="p-3 rounded-lg bg-[var(--bg-tertiary)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{broadcast.title}</span>
                    <CheckCircle className="w-4 h-4 text-[var(--success)]" />
                  </div>
                  <p className="text-xs text-[var(--text-tertiary)] mb-2 line-clamp-1">
                    {broadcast.message}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span>{broadcast.sent} مرسل</span>
                    <span>{((broadcast.read / broadcast.sent) * 100).toFixed(0)}% قراءة</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
