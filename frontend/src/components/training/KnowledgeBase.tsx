'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Link as LinkIcon, FileText, Database, Bot, CheckCircle, AlertCircle, Trash2, RefreshCw } from 'lucide-react';
import { FileUpload } from './FileUpload';
import { SourceList } from './SourceList';

export function KnowledgeBase() {
  const [activeTab, setActiveTab] = useState<'files' | 'urls'>('files');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Database className="w-6 h-6 text-[var(--primary-500)]" />
            قاعدة المعرفة (Brain)
          </h2>
          <p className="text-[var(--text-secondary)] mt-1">
            درب البوت الخاص بك على ملفات الشركة، الأسئلة الشائعة، ورابط موقعك.
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--border-default)]">
          <button
            onClick={() => setActiveTab('files')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'files' 
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              <span>ملفات (PDF/Docs)</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('urls')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === 'urls' 
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm' 
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4" />
              <span>روابط (Website)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Upload/Input */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6"
          >
            {activeTab === 'files' ? (
              <FileUpload />
            ) : (
              <UrlInput />
            )}
          </motion.div>

          {/* Training Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard 
              icon={FileText} 
              label="تمت معالجتها" 
              value="12 ملف" 
              color="text-blue-500" 
              bg="bg-blue-500/10" 
            />
            <StatCard 
              icon={Bot} 
              label="حالة التدريب" 
              value="جاهز 100%" 
              color="text-green-500" 
              bg="bg-green-500/10" 
            />
            <StatCard 
              icon={Database} 
              label="المساحة المستخدمة" 
              value="24%" 
              color="text-purple-500" 
              bg="bg-purple-500/10" 
            />
          </div>
        </div>

        {/* Right Column: Source List */}
        <div className="lg:col-span-1">
           <SourceList />
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color, bg }: any) {
  return (
    <div className="glass-card p-4 flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <div>
        <p className="text-xs text-[var(--text-tertiary)]">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

function UrlInput() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <LinkIcon className="w-5 h-5 text-[var(--primary-500)]" />
        <h3 className="font-bold">إضافة رابط للمسح (Scraping)</h3>
      </div>
      <p className="text-sm text-[var(--text-secondary)]">
        أدخل رابط موقعك، صفحة "من نحن"، أو صفحة الأسعار. سيقوم البوت بقراءة المحتوى وتدريب نفسه عليه.
      </p>
      
      <div className="flex gap-2">
        <input 
          type="url" 
          placeholder="https://example.com/pricing" 
          className="input flex-1"
        />
        <button className="btn btn-primary px-6">
          مسح الرابط
        </button>
      </div>
    </div>
  );
}
