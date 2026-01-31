// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Channels Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Send,
  Instagram,
  Settings,
  CheckCircle,
  XCircle,
  Link2,
  Unlink,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';

const channels = [
  {
    id: 'whatsapp',
    name: 'واتساب بيزنس',
    icon: '📱',
    color: '#25D366',
    connected: true,
    stats: { messages: 1250, orders: 87, revenue: 125000 },
    status: 'active',
    phone: '+20 100 123 4567',
  },
  {
    id: 'telegram',
    name: 'تليجرام بوت',
    icon: '✈️',
    color: '#0088CC',
    connected: true,
    stats: { messages: 890, orders: 45, revenue: 78000 },
    status: 'active',
    botName: '@ApexSalesBot',
  },
  {
    id: 'messenger',
    name: 'فيسبوك ماسنجر',
    icon: '💬',
    color: '#0084FF',
    connected: false,
    stats: { messages: 0, orders: 0, revenue: 0 },
    status: 'disconnected',
  },
  {
    id: 'instagram',
    name: 'انستجرام دايركت',
    icon: '📸',
    color: '#E4405F',
    connected: false,
    stats: { messages: 0, orders: 0, revenue: 0 },
    status: 'disconnected',
  },
];

export default function ChannelsPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">قنوات التواصل</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          اربط متجرك بمنصات التواصل الاجتماعي لاستقبال الطلبات تلقائياً
        </p>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((channel, index) => (
          <motion.div
            key={channel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 relative overflow-hidden"
          >
            {/* Status Bar */}
            <div
              className={`absolute top-0 left-0 right-0 h-1 ${
                channel.connected ? 'bg-gradient-to-l' : 'bg-[var(--text-muted)]'
              }`}
              style={{
                backgroundImage: channel.connected
                  ? `linear-gradient(90deg, ${channel.color}, ${channel.color}80)`
                  : undefined,
              }}
            />

            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${channel.color}20` }}
                >
                  {channel.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{channel.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {channel.connected ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
                        <span className="text-sm text-[var(--success)]">متصل</span>
                        {channel.phone && (
                          <span className="text-sm text-[var(--text-tertiary)]">
                            {channel.phone}
                          </span>
                        )}
                        {channel.botName && (
                          <span className="text-sm text-[var(--text-tertiary)]">
                            {channel.botName}
                          </span>
                        )}
                      </>
                    ) : (
                      <>
                        <span className="w-2 h-2 rounded-full bg-[var(--text-muted)]" />
                        <span className="text-sm text-[var(--text-tertiary)]">غير متصل</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Stats */}
            {channel.connected && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 rounded-xl bg-[var(--bg-tertiary)]">
                  <p className="text-2xl font-bold">{channel.stats.messages.toLocaleString()}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">رسالة</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-[var(--bg-tertiary)]">
                  <p className="text-2xl font-bold">{channel.stats.orders}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">طلب</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-[var(--bg-tertiary)]">
                  <p className="text-2xl font-bold">{(channel.stats.revenue / 1000).toFixed(0)}k</p>
                  <p className="text-xs text-[var(--text-tertiary)]">إيرادات</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              {channel.connected ? (
                <>
                  <button className="btn btn-secondary flex-1">
                    <Settings className="w-4 h-4" />
                    إعدادات
                  </button>
                  <button className="btn btn-ghost text-[var(--error)]">
                    <Unlink className="w-4 h-4" />
                    فصل
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary flex-1"
                  style={{ background: channel.color }}
                  onClick={() => setSelectedChannel(channel.id)}
                >
                  <Link2 className="w-4 h-4" />
                  ربط الآن
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="font-semibold text-lg mb-4">📖 دليل الربط</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GuideCard
            title="واتساب بيزنس"
            steps={[
              'سجل في Meta for Developers',
              'أنشئ تطبيق WhatsApp Business',
              'احصل على Access Token و Phone Number ID',
              'أدخل البيانات في الإعدادات',
            ]}
            link="https://developers.facebook.com/docs/whatsapp"
          />
          <GuideCard
            title="تليجرام بوت"
            steps={[
              'تحدث مع @BotFather',
              'أنشئ بوت جديد بـ /newbot',
              'انسخ الـ Bot Token',
              'أدخل التوكن في الإعدادات',
            ]}
            link="https://core.telegram.org/bots"
          />
        </div>
      </motion.div>
    </div>
  );
}

function GuideCard({
  title,
  steps,
  link,
}: {
  title: string;
  steps: string[];
  link: string;
}) {
  return (
    <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
      <h4 className="font-medium mb-3">{title}</h4>
      <ol className="space-y-2">
        {steps.map((step, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
            <span className="w-5 h-5 rounded-full bg-[var(--primary-500)]/20 text-[var(--primary-400)] flex items-center justify-center text-xs flex-shrink-0">
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm text-[var(--primary-400)] mt-3 hover:underline"
      >
        <ExternalLink className="w-4 h-4" />
        التوثيق الرسمي
      </a>
    </div>
  );
}
