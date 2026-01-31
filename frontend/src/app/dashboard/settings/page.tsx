// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Settings Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store,
  Bot,
  Bell,
  CreditCard,
  Globe,
  Shield,
  Save,
  Info,
} from 'lucide-react';

const tabs = [
  { id: 'store', label: 'المتجر', icon: Store },
  { id: 'bot', label: 'البوت', icon: Bot },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'payments', label: 'الدفع', icon: CreditCard },
  { id: 'language', label: 'اللغة', icon: Globe },
  { id: 'security', label: 'الأمان', icon: Shield },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store');
  const [settings, setSettings] = useState({
    storeName: 'APEX Store',
    storeNameAr: 'متجر أبيكس',
    currency: 'EGP',
    botMode: 'hybrid',
    botPersonality: 'friendly',
    responseSpeed: 'fast',
    maxDiscount: 15,
    autoHandoff: true,
    notifyOrders: true,
    notifyPayments: true,
    notifyLowStock: true,
    notifyHandoff: true,
    defaultLanguage: 'ar_EG',
  });

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">الإعدادات</h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إعدادات المتجر والبوت
          </p>
        </div>
        <button className="btn btn-primary">
          <Save className="w-4 h-4" />
          حفظ التغييرات
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-right transition-all ${
                  activeTab === tab.id
                    ? 'bg-[var(--primary-500)]/10 text-[var(--primary-400)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            {activeTab === 'store' && (
              <StoreSettings settings={settings} updateSetting={updateSetting} />
            )}
            {activeTab === 'bot' && (
              <BotSettings settings={settings} updateSetting={updateSetting} />
            )}
            {activeTab === 'notifications' && (
              <NotificationSettings settings={settings} updateSetting={updateSetting} />
            )}
            {activeTab === 'payments' && <PaymentSettings />}
            {activeTab === 'language' && (
              <LanguageSettings settings={settings} updateSetting={updateSetting} />
            )}
            {activeTab === 'security' && <SecuritySettings />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StoreSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">إعدادات المتجر</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-[var(--text-secondary)]">اسم المتجر (English)</label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => updateSetting('storeName', e.target.value)}
            className="input"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-[var(--text-secondary)]">اسم المتجر (عربي)</label>
          <input
            type="text"
            value={settings.storeNameAr}
            onChange={(e) => updateSetting('storeNameAr', e.target.value)}
            className="input"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[var(--text-secondary)]">العملة</label>
        <select
          value={settings.currency}
          onChange={(e) => updateSetting('currency', e.target.value)}
          className="input"
        >
          <option value="EGP">جنيه مصري (EGP)</option>
          <option value="SAR">ريال سعودي (SAR)</option>
          <option value="AED">درهم إماراتي (AED)</option>
          <option value="USD">دولار أمريكي (USD)</option>
        </select>
      </div>
    </div>
  );
}

function BotSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">إعدادات البوت</h3>

      <div className="space-y-2">
        <label className="text-sm text-[var(--text-secondary)]">وضع البوت</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: 'bot_only', label: 'بوت فقط', desc: 'البوت يرد على كل شيء' },
            { id: 'hybrid', label: 'هجين', desc: 'بوت + تحويل عند الحاجة' },
            { id: 'human_only', label: 'إنسان فقط', desc: 'البوت معطل' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => updateSetting('botMode', mode.id)}
              className={`p-4 rounded-xl border text-right transition-all ${
                settings.botMode === mode.id
                  ? 'border-[var(--primary-500)] bg-[var(--primary-500)]/10'
                  : 'border-[var(--border-default)] hover:border-[var(--border-hover)]'
              }`}
            >
              <p className="font-medium">{mode.label}</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">{mode.desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[var(--text-secondary)]">شخصية البوت</label>
        <select
          value={settings.botPersonality}
          onChange={(e) => updateSetting('botPersonality', e.target.value)}
          className="input"
        >
          <option value="friendly">ودود 😊</option>
          <option value="professional">احترافي 💼</option>
          <option value="casual">عفوي 😎</option>
          <option value="humorous">مرح 😂</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-[var(--text-secondary)]">أقصى نسبة خصم يقدمها البوت</label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="30"
            value={settings.maxDiscount}
            onChange={(e) => updateSetting('maxDiscount', parseInt(e.target.value))}
            className="flex-1"
          />
          <span className="text-lg font-bold w-16 text-left">{settings.maxDiscount}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
        <div>
          <p className="font-medium">تحويل تلقائي للإنسان</p>
          <p className="text-sm text-[var(--text-tertiary)]">عند اكتشاف عميل غاضب أو طلب معقد</p>
        </div>
        <button
          onClick={() => updateSetting('autoHandoff', !settings.autoHandoff)}
          className={`w-12 h-6 rounded-full transition-colors ${
            settings.autoHandoff ? 'bg-[var(--primary-500)]' : 'bg-[var(--bg-elevated)]'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform ${
              settings.autoHandoff ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function NotificationSettings({ settings, updateSetting }: any) {
  const notifications = [
    { key: 'notifyOrders', label: 'طلبات جديدة', desc: 'إشعار عند وصول طلب جديد' },
    { key: 'notifyPayments', label: 'المدفوعات', desc: 'إشعار عند استلام دفعة' },
    { key: 'notifyLowStock', label: 'المخزون المنخفض', desc: 'تنبيه عند انخفاض المخزون' },
    { key: 'notifyHandoff', label: 'تحويلات البوت', desc: 'إشعار عند تحويل محادثة' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">إعدادات الإشعارات</h3>
      
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.key}
            className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]"
          >
            <div>
              <p className="font-medium">{notif.label}</p>
              <p className="text-sm text-[var(--text-tertiary)]">{notif.desc}</p>
            </div>
            <button
              onClick={() => updateSetting(notif.key, !settings[notif.key])}
              className={`w-12 h-6 rounded-full transition-colors ${
                settings[notif.key] ? 'bg-[var(--primary-500)]' : 'bg-[var(--bg-elevated)]'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  settings[notif.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">إعدادات الدفع</h3>
      
      <div className="p-4 rounded-xl bg-[var(--info)]/10 border border-[var(--info)]/20 flex items-start gap-3">
        <Info className="w-5 h-5 text-[var(--info)] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[var(--text-secondary)]">
          لإعداد بوابات الدفع، يرجى الانتقال إلى صفحة القنوات وربط حساب Paymob الخاص بك.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Paymob</p>
              <p className="text-sm text-[var(--text-tertiary)]">Visa, Mastercard, فوري</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs">
            متصل
          </span>
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-[var(--bg-tertiary)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              💵
            </div>
            <div>
              <p className="font-medium">الدفع عند الاستلام</p>
              <p className="text-sm text-[var(--text-tertiary)]">COD</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-full bg-[var(--success)]/10 text-[var(--success)] text-xs">
            مفعل
          </span>
        </div>
      </div>
    </div>
  );
}

function LanguageSettings({ settings, updateSetting }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">إعدادات اللغة</h3>
      
      <div className="space-y-2">
        <label className="text-sm text-[var(--text-secondary)]">لغة البوت الافتراضية</label>
        <select
          value={settings.defaultLanguage}
          onChange={(e) => updateSetting('defaultLanguage', e.target.value)}
          className="input"
        >
          <option value="ar_EG">العربية (مصري) 🇪🇬</option>
          <option value="ar_SA">العربية (سعودي) 🇸🇦</option>
          <option value="ar_MSA">العربية (فصحى)</option>
          <option value="en">English</option>
          <option value="franco">Franco-Arab 3a4an</option>
        </select>
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">الأمان</h3>
      
      <div className="space-y-4">
        <button className="btn btn-secondary w-full justify-between">
          <span>تغيير كلمة المرور</span>
          <Shield className="w-4 h-4" />
        </button>
        
        <button className="btn btn-secondary w-full justify-between">
          <span>تسجيل الخروج من كل الأجهزة</span>
          <Shield className="w-4 h-4" />
        </button>
        
        <div className="p-4 rounded-xl bg-[var(--error)]/10 border border-[var(--error)]/20">
          <p className="font-medium text-[var(--error)]">منطقة الخطر</p>
          <p className="text-sm text-[var(--text-tertiary)] mt-1 mb-3">
            هذه الإجراءات لا يمكن التراجع عنها
          </p>
          <button className="btn bg-[var(--error)] text-white text-sm">
            حذف الحساب
          </button>
        </div>
      </div>
    </div>
  );
}
