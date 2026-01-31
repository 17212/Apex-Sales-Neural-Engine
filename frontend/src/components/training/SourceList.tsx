import { useState, useEffect } from 'react';
import { MoreHorizontal, FileText, CheckCircle, Clock, Trash2, Globe, File, FileX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiClient } from '@/lib/api';
import { toast } from 'react-hot-toast';

export function SourceList() {
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSources = async () => {
    try {
      const response = await apiClient.getTrainingData();
      if (response.success && response.data?.data) {
        setSources(response.data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSources();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المصدر؟')) return;
    try {
      await apiClient.deleteTrainingData(id);
      toast.success('تم حذف المصدر');
      fetchSources();
    } catch (error) {
      toast.error('فشل في الحذف');
    }
  };

  const getIcon = (source: any) => {
    if (source.type === 'url' || source.title.startsWith('http')) return <Globe className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const getTypeStyle = (source: any) => {
    if (source.type === 'url' || source.title.startsWith('http')) return 'bg-blue-500/10 text-blue-500';
    return 'bg-[var(--primary-500)]/10 text-[var(--primary-500)]';
  };

  return (
    <div className="glass-card p-0 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-[var(--border-default)] flex items-center justify-between">
        <h3 className="font-bold">المصادر النشطة</h3>
        <span className="text-xs bg-[var(--primary-500)]/10 text-[var(--primary-400)] px-2 py-1 rounded-full font-medium">
          {sources.length} مصدر
        </span>
      </div>

      <div className="overflow-y-auto flex-1 p-4 space-y-3 max-h-[500px]">
        {loading ? (
          <div className="text-center py-8 text-[var(--text-tertiary)] text-sm">جاري التحميل...</div>
        ) : sources.length === 0 ? (
          <div className="text-center py-8 text-[var(--text-tertiary)] text-sm">لا توجد مصادر مضافة</div>
        ) : (
          <AnimatePresence>
            {sources.map((source) => (
              <motion.div
                key={source.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: 10 }}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors border border-transparent hover:border-[var(--border-default)]"
              >
                {/* Icon */}
                <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${getTypeStyle(source)}`}>
                  {getIcon(source)}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-sm truncate pr-2" title={source.title}>{source.title}</p>
                    <StatusBadge status="ready" />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                    <span className="truncate max-w-[100px]">{source.type}</span>
                    <span>{new Date(source.createdAt || Date.now()).toLocaleDateString('ar-EG')}</span>
                  </div>
                </div>

                {/* Actions */}
                <button 
                  onClick={() => handleDelete(source.id)}
                  className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-all self-center"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
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
