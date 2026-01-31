// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - AI Insights Widget
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Target,
  RefreshCw,
  ChevronRight,
  Zap,
} from 'lucide-react';

const mockInsights = [
  {
    id: '1',
    type: 'opportunity',
    title: 'فرصة مبيعات محتملة',
    description: 'لاحظنا أن 15 عميل سأل عن iPhone 15 Pro Max لكن لم يطلب. أرسل عرض خاص!',
    action: 'إرسال عرض',
    priority: 'high',
    impact: '+45,000 ج.م',
    icon: Target,
    color: '#22c55e',
  },
  {
    id: '2',
    type: 'warning',
    title: 'مخزون منخفض',
    description: 'AirPods Pro 2 قربت تخلص (5 قطع). المبيعات عالية - اطلب مخزون!',
    action: 'إدارة المخزون',
    priority: 'medium',
    impact: 'قريب من النفاد',
    icon: AlertTriangle,
    color: '#f59e0b',
  },
  {
    id: '3',
    type: 'trend',
    title: 'ذروة المبيعات',
    description: 'أعلى مبيعات بين 6-9 مساءً. ضاعف البوت في الوقت ده!',
    action: 'تحسين الأداء',
    priority: 'low',
    impact: '+23% تحويلات',
    icon: TrendingUp,
    color: '#6366f1',
  },
  {
    id: '4',
    type: 'suggestion',
    title: 'اقتراح تحسين',
    description: 'العملاء اللي بيسألوا عن الشحن 40% بينسحبوا. أضف معلومات الشحن في الردود!',
    action: 'تعديل الردود',
    priority: 'medium',
    impact: '-40% انسحاب',
    icon: Lightbulb,
    color: '#06b6d4',
  },
];

export function AIInsights() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockInsights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentIndex((prev) => (prev + 1) % mockInsights.length);
    }, 1500);
  };

  const insight = mockInsights[currentIndex];
  const InsightIcon = insight.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-[var(--primary-500)]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-[var(--secondary-500)]/10 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-[var(--primary-400)]" />
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-5 h-5 text-[var(--primary-400)]" />
            </motion.div>
          </div>
          <h3 className="font-semibold text-lg">AI Insights</h3>
          <span className="px-2 py-0.5 rounded-full bg-[var(--primary-500)]/10 text-[var(--primary-400)] text-xs">
            Gemini 2.5
          </span>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isGenerating}
          className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Insight Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={insight.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="relative"
        >
          {isGenerating ? (
            <div className="h-32 flex items-center justify-center">
              <div className="flex items-center gap-2 text-[var(--text-tertiary)]">
                <Zap className="w-5 h-5 animate-pulse" />
                <span>جاري تحليل البيانات بالذكاء الاصطناعي...</span>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[var(--bg-tertiary)]">
              <div className="flex items-start gap-3">
                <div
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: `${insight.color}20` }}
                >
                  <InsightIcon className="w-5 h-5" style={{ color: insight.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{insight.title}</h4>
                    <span
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: `${insight.color}20`,
                        color: insight.color,
                      }}
                    >
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {insight.description}
                  </p>
                </div>
              </div>

              <button
                className="w-full mt-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all"
                style={{
                  backgroundColor: `${insight.color}20`,
                  color: insight.color,
                }}
              >
                {insight.action}
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {mockInsights.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex
                ? 'bg-[var(--primary-500)] w-4'
                : 'bg-[var(--text-muted)]'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
