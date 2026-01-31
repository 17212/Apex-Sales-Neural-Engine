// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Bot Training Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Plus,
  Edit,
  Trash2,
  Search,
  BookOpen,
  MessageSquare,
  FileText,
  Zap,
  CheckCircle,
  AlertCircle,
  Play,
  Save,
} from 'lucide-react';

const mockTrainingData = [
  {
    id: '1',
    type: 'faq',
    title: 'سياسة الإرجاع',
    content: 'يمكن إرجاع المنتج خلال 14 يوم من تاريخ الاستلام بشرط أن يكون في حالته الأصلية.',
    triggerPhrases: ['ارجع', 'استرجاع', 'رجوع', 'ترجيع'],
    priority: 1,
    isActive: true,
  },
  {
    id: '2',
    type: 'faq',
    title: 'طرق الدفع',
    content: 'نوفر الدفع بـ فيزا، ماستركارد، فوري، والدفع عند الاستلام.',
    triggerPhrases: ['دفع', 'فلوس', 'كاش', 'فيزا'],
    priority: 1,
    isActive: true,
  },
  {
    id: '3',
    type: 'product_info',
    title: 'مواصفات iPhone 15 Pro Max',
    content: 'شاشة 6.7 بوصة، معالج A17 Pro، كاميرا 48MP، بطارية تدوم يوم كامل.',
    triggerPhrases: ['ايفون 15', 'iphone 15', 'مواصفات'],
    priority: 2,
    isActive: true,
  },
  {
    id: '4',
    type: 'policy',
    title: 'مواعيد الشحن',
    content: 'الشحن من 2-5 أيام عمل للقاهرة والجيزة، 5-7 أيام للمحافظات.',
    triggerPhrases: ['شحن', 'توصيل', 'يوصل امتى'],
    priority: 1,
    isActive: true,
  },
];

const mockRules = [
  {
    id: '1',
    name: 'تحويل العميل الغاضب',
    description: 'تحويل للإنسان عند اكتشاف غضب شديد',
    ruleType: 'sentiment',
    condition: { type: 'sentiment', value: 'hostile' },
    action: { type: 'handoff', value: true },
    isActive: true,
  },
  {
    id: '2',
    name: 'خصم للعميل VIP',
    description: 'تقديم خصم 10% تلقائي للعملاء VIP',
    ruleType: 'segment',
    condition: { type: 'segment', value: 'vip' },
    action: { type: 'discount', value: 10 },
    isActive: true,
  },
  {
    id: '3',
    name: 'رسالة ترحيب للعميل الجديد',
    description: 'رسالة خاصة للعملاء الجدد',
    ruleType: 'segment',
    condition: { type: 'segment', value: 'new' },
    action: { type: 'message', value: 'مرحباً بيك! 🎉 كعميل جديد، ليك خصم 5% على أول طلب!' },
    isActive: false,
  },
];

const typeConfig: Record<string, { color: string; label: string; icon: any }> = {
  faq: { color: '#3b82f6', label: 'سؤال شائع', icon: MessageSquare },
  product_info: { color: '#22c55e', label: 'معلومات منتج', icon: BookOpen },
  policy: { color: '#f59e0b', label: 'سياسة', icon: FileText },
  custom_response: { color: '#8b5cf6', label: 'رد مخصص', icon: Zap },
};

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState<'data' | 'rules' | 'test'>('data');
  const [searchQuery, setSearchQuery] = useState('');
  const [testMessage, setTestMessage] = useState('');
  const [testResponse, setTestResponse] = useState('');

  const handleTestBot = () => {
    // Simulate bot response
    setTestResponse('مرحباً! 👋 أنا البوت الذكي وهساعدك. بخصوص سؤالك، ' + testMessage.slice(0, 50) + '...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">تدريب البوت</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            أضف معلومات وقواعد لتحسين ردود البوت
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          إضافة بيانات
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--primary-500)]">24</p>
          <p className="text-sm text-[var(--text-tertiary)]">بيانات تدريب</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--success)]">8</p>
          <p className="text-sm text-[var(--text-tertiary)]">قواعد نشطة</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--warning)]">89%</p>
          <p className="text-sm text-[var(--text-tertiary)]">دقة الردود</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--info)]">156</p>
          <p className="text-sm text-[var(--text-tertiary)]">عبارات تحفيز</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-[var(--bg-tertiary)] rounded-xl w-fit">
        {[
          { id: 'data', label: 'بيانات التدريب', icon: BookOpen },
          { id: 'rules', label: 'القواعد', icon: Zap },
          { id: 'test', label: 'اختبار البوت', icon: Play },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--primary-500)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'data' && (
          <motion.div
            key="data"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-tertiary)]" />
              <input
                type="text"
                placeholder="بحث في بيانات التدريب..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pr-10 text-sm"
              />
            </div>

            {/* Data Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockTrainingData
                .filter((d) => d.title.includes(searchQuery) || d.content.includes(searchQuery))
                .map((data) => {
                  const type = typeConfig[data.type];
                  const TypeIcon = type.icon;

                  return (
                    <motion.div
                      key={data.id}
                      layout
                      className="glass-card p-5 group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="p-2 rounded-lg"
                            style={{ backgroundColor: `${type.color}20` }}
                          >
                            <TypeIcon className="w-4 h-4" style={{ color: type.color }} />
                          </div>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs"
                            style={{ backgroundColor: `${type.color}20`, color: type.color }}
                          >
                            {type.label}
                          </span>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)]">
                            <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-[var(--error)]/10">
                            <Trash2 className="w-4 h-4 text-[var(--error)]" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-2">{data.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                        {data.content}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-3">
                        {data.triggerPhrases.map((phrase) => (
                          <span
                            key={phrase}
                            className="px-2 py-0.5 rounded-full bg-[var(--bg-tertiary)] text-xs text-[var(--text-tertiary)]"
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}

        {activeTab === 'rules' && (
          <motion.div
            key="rules"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {mockRules.map((rule) => (
              <div key={rule.id} className="glass-card p-5 flex items-center gap-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    rule.isActive ? 'bg-[var(--success)]' : 'bg-[var(--text-muted)]'
                  }`}
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{rule.name}</h3>
                  <p className="text-sm text-[var(--text-tertiary)]">{rule.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 rounded-full bg-[var(--bg-tertiary)] text-xs">
                    {rule.ruleType}
                  </span>
                  <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)]">
                    <Edit className="w-4 h-4 text-[var(--text-secondary)]" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'test' && (
          <motion.div
            key="test"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-6 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">اختبار البوت</h3>
                <p className="text-sm text-[var(--text-tertiary)]">جرب رسالة وشوف رد البوت</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={testMessage}
                  onChange={(e) => setTestMessage(e.target.value)}
                  placeholder="اكتب رسالة للبوت..."
                  className="input min-h-[100px] resize-none"
                />
              </div>

              <button
                onClick={handleTestBot}
                className="btn btn-primary w-full"
                disabled={!testMessage}
              >
                <Play className="w-4 h-4" />
                اختبار الرد
              </button>

              {testResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-[var(--primary-500)]/10 border border-[var(--primary-500)]/20"
                >
                  <p className="text-sm">{testResponse}</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
