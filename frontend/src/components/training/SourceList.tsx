'use client';

import { MoreHorizontal, FileText, CheckCircle, Clock, Trash2, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const mockSources = [
  { id: 1, name: 'Company Profile 2025.pdf', type: 'pdf', status: 'ready', date: 'منذ ساعتين', size: '2.4 MB' },
  { id: 2, name: 'Pricing Sheet - Jan.docx', type: 'doc', status: 'ready', date: 'منذ 3 ساعات', size: '500 KB' },
  { id: 3, name: 'https://apex.com/about', type: 'url', status: 'processing', date: 'جارية الآن', size: 'Web Page' },
  { id: 4, name: 'FAQ_ar.txt', type: 'txt', status: 'ready', date: 'أمس', size: '12 KB' },
];

export function SourceList() {
  return (
    <div className="glass-card p-0 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between">
        <h3 className="font-bold">المصادر النشطة</h3>
        <span className="text-xs bg-[var(--primary-500)]/10 text-[var(--primary-400)] px-2 py-1 rounded-full font-medium">
          {mockSources.length} مصدر
        </span>
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-3 max-h-[500px]">
        {mockSources.map((source) => (
          <motion.div
            key={source.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-default)]"
          >
            {/* Icon */}
            <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              source.type === 'url' ? 'bg-blue-500/10 text-blue-500' : 'bg-[var(--primary-500)]/10 text-[var(--primary-500)]'
            }`}>
              {source.type === 'url' ? <Globe className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="font-medium text-sm truncate pr-2" title={source.name}>{source.name}</p>
                <StatusBadge status={source.status} />
              </div>
              <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                <span>{source.size}</span>
                <span>{source.date}</span>
              </div>
            </div>

            {/* Actions (Hidden by default, show on hover) */}
            <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all self-center">
              <Trash2 className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'ready') {
    return (
      <div className="flex items-center gap-1 text-[var(--success)] text-[10px] font-bold uppercase tracking-wider bg-[var(--success)]/10 px-1.5 py-0.5 rounded">
        <CheckCircle className="w-3 h-3" />
        <span>جاهز</span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1 text-[var(--warning)] text-[10px] font-bold uppercase tracking-wider bg-[var(--warning)]/10 px-1.5 py-0.5 rounded">
      <Clock className="w-3 h-3 animate-pulse" />
      <span>معالجة</span>
    </div>
  );
}
