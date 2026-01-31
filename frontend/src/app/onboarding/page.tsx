// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Onboarding Wizard
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Store,
  Package,
  Link2,
  Bot,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
} from 'lucide-react';

const steps = [
  {
    id: 'welcome',
    title: 'مرحباً بك في Apex',
    subtitle: 'دعنا نساعدك في إعداد متجرك',
    icon: Sparkles,
  },
  {
    id: 'store',
    title: 'معلومات المتجر',
    subtitle: 'أدخل معلومات متجرك الأساسية',
    icon: Store,
  },
  {
    id: 'products',
    title: 'أضف منتجاتك',
    subtitle: 'أضف منتجاتك لتظهر للعملاء',
    icon: Package,
  },
  {
    id: 'channels',
    title: 'اربط قنواتك',
    subtitle: 'اربط واتساب أو تليجرام',
    icon: Link2,
  },
  {
    id: 'bot',
    title: 'إعداد البوت',
    subtitle: 'خصص شخصية البوت وردوده',
    icon: Bot,
  },
  {
    id: 'complete',
    title: 'تم بنجاح!',
    subtitle: 'متجرك جاهز للعمل',
    icon: CheckCircle,
  },
];

export function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [storeData, setStoreData] = useState({
    storeName: '',
    storeNameAr: '',
    currency: 'EGP',
    category: '',
  });
  const router = useRouter();

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--primary-500)] to-[var(--secondary-500)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex justify-between mt-2">
            {steps.map((s, i) => (
              <div
                key={s.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                  i <= currentStep
                    ? 'bg-[var(--primary-500)] text-white'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]'
                }`}
              >
                {i < currentStep ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              {/* Icon */}
              <motion.div
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center mx-auto mb-6"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <step.icon className="w-10 h-10 text-white" />
              </motion.div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
              <p className="text-[var(--text-secondary)] mb-8">{step.subtitle}</p>

              {/* Step Content */}
              {step.id === 'welcome' && <WelcomeStep />}
              {step.id === 'store' && (
                <StoreStep data={storeData} setData={setStoreData} />
              )}
              {step.id === 'products' && <ProductsStep />}
              {step.id === 'channels' && <ChannelsStep />}
              {step.id === 'bot' && <BotStep />}
              {step.id === 'complete' && <CompleteStep />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--border-default)]">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="btn btn-ghost disabled:opacity-50"
            >
              <ArrowRight className="w-4 h-4" />
              السابق
            </button>

            <button onClick={handleNext} className="btn btn-primary">
              {currentStep === steps.length - 1 ? 'ابدأ الآن' : 'التالي'}
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WelcomeStep() {
  return (
    <div className="space-y-4 text-[var(--text-secondary)]">
      <p>👋 أهلاً بيك في Apex Sales Neural Engine!</p>
      <p>هنساعدك تجهز متجرك الذكي في دقائق معدودة.</p>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { icon: '🤖', label: 'بوت ذكي' },
          { icon: '📊', label: 'تحليلات فورية' },
          { icon: '💰', label: 'مبيعات أكتر' },
        ].map((feature) => (
          <div
            key={feature.label}
            className="p-4 rounded-xl bg-[var(--bg-tertiary)]"
          >
            <div className="text-3xl mb-2">{feature.icon}</div>
            <p className="text-sm">{feature.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StoreStep({ data, setData }: any) {
  return (
    <div className="space-y-4 text-right">
      <div>
        <label className="text-sm text-[var(--text-secondary)] mb-1 block">
          اسم المتجر (English)
        </label>
        <input
          type="text"
          value={data.storeName}
          onChange={(e) => setData({ ...data, storeName: e.target.value })}
          placeholder="APEX Store"
          className="input"
        />
      </div>
      <div>
        <label className="text-sm text-[var(--text-secondary)] mb-1 block">
          اسم المتجر (عربي)
        </label>
        <input
          type="text"
          value={data.storeNameAr}
          onChange={(e) => setData({ ...data, storeNameAr: e.target.value })}
          placeholder="متجر أبيكس"
          className="input"
        />
      </div>
      <div>
        <label className="text-sm text-[var(--text-secondary)] mb-1 block">
          نوع المنتجات
        </label>
        <select
          value={data.category}
          onChange={(e) => setData({ ...data, category: e.target.value })}
          className="input"
        >
          <option value="">اختر نوع المنتجات</option>
          <option value="electronics">إلكترونيات</option>
          <option value="fashion">ملابس وموضة</option>
          <option value="food">طعام ومشروبات</option>
          <option value="beauty">تجميل وعناية</option>
          <option value="other">أخرى</option>
        </select>
      </div>
    </div>
  );
}

function ProductsStep() {
  return (
    <div className="space-y-4">
      <div className="p-6 border-2 border-dashed border-[var(--border-default)] rounded-xl hover:border-[var(--primary-500)] transition-colors cursor-pointer">
        <Upload className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" />
        <p className="text-sm text-[var(--text-secondary)]">
          اسحب ملف Excel أو اضغط للرفع
        </p>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          CSV, XLS, XLSX (Max 5MB)
        </p>
      </div>
      <div className="text-center text-[var(--text-tertiary)]">أو</div>
      <button className="btn btn-secondary w-full">
        <Plus className="w-4 h-4" />
        أضف منتج يدوياً
      </button>
      <button className="btn btn-ghost w-full text-sm">
        تخطي وأضف لاحقاً
      </button>
    </div>
  );
}

function ChannelsStep() {
  const [connecting, setConnecting] = useState<string | null>(null);

  const channels = [
    { id: 'whatsapp', name: 'واتساب', icon: '📱', color: '#25D366' },
    { id: 'telegram', name: 'تليجرام', icon: '✈️', color: '#0088CC' },
    { id: 'messenger', name: 'ماسنجر', icon: '💬', color: '#0084FF' },
  ];

  return (
    <div className="space-y-3">
      {channels.map((channel) => (
        <button
          key={channel.id}
          onClick={() => setConnecting(channel.id)}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-[var(--border-default)] hover:border-[var(--primary-500)] transition-all"
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: `${channel.color}20` }}
          >
            {channel.icon}
          </div>
          <div className="flex-1 text-right">
            <p className="font-medium">{channel.name}</p>
            <p className="text-sm text-[var(--text-tertiary)]">
              اضغط للربط
            </p>
          </div>
          <ArrowLeft className="w-5 h-5 text-[var(--text-tertiary)]" />
        </button>
      ))}
      <button className="btn btn-ghost w-full text-sm mt-4">
        تخطي وأربط لاحقاً
      </button>
    </div>
  );
}

function BotStep() {
  const [personality, setPersonality] = useState('friendly');

  const personalities = [
    { id: 'friendly', label: 'ودود 😊', desc: 'رد لطيف وودي' },
    { id: 'professional', label: 'احترافي 💼', desc: 'رسمي ومحترف' },
    { id: 'casual', label: 'عفوي 😎', desc: 'عفوي ومرح' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-[var(--text-secondary)] text-sm">
        اختر شخصية البوت التي تناسب متجرك
      </p>
      <div className="grid grid-cols-3 gap-3">
        {personalities.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersonality(p.id)}
            className={`p-4 rounded-xl border transition-all ${
              personality === p.id
                ? 'border-[var(--primary-500)] bg-[var(--primary-500)]/10'
                : 'border-[var(--border-default)]'
            }`}
          >
            <p className="text-lg mb-1">{p.label}</p>
            <p className="text-xs text-[var(--text-tertiary)]">{p.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function CompleteStep() {
  return (
    <div className="space-y-4">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: 3 }}
        className="text-6xl"
      >
        🎉
      </motion.div>
      <p className="text-[var(--text-secondary)]">
        تهانينا! متجرك جاهز لاستقبال العملاء والطلبات.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        {[
          { icon: '✅', label: 'معلومات المتجر' },
          { icon: '✅', label: 'المنتجات جاهزة' },
          { icon: '✅', label: 'القنوات مربوطة' },
          { icon: '✅', label: 'البوت مفعل' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-2 p-3 rounded-lg bg-[var(--success)]/10"
          >
            <span>{item.icon}</span>
            <span className="text-sm text-[var(--success)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return <OnboardingWizard />;
}
