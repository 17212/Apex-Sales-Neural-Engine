// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Invoice System
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  Send,
  Plus,
  Search,
  Filter,
  Eye,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Building,
  Mail,
} from 'lucide-react';

const invoices = [
  {
    id: 'INV-2026-001',
    customer: 'أحمد محمد',
    company: 'شركة التقنية المتقدمة',
    email: 'ahmed@techco.com',
    amount: 15750,
    tax: 2362.5,
    total: 18112.5,
    status: 'paid',
    dueDate: '2026-02-15',
    createdAt: '2026-01-30',
    items: [
      { name: 'iPhone 15 Pro Max', qty: 2, price: 6500, total: 13000 },
      { name: 'AirPods Pro 2', qty: 1, price: 2750, total: 2750 },
    ],
  },
  {
    id: 'INV-2026-002',
    customer: 'سارة أحمد',
    company: 'متجر الأناقة',
    email: 'sara@elegance.com',
    amount: 8500,
    tax: 1275,
    total: 9775,
    status: 'pending',
    dueDate: '2026-02-01',
    createdAt: '2026-01-28',
    items: [
      { name: 'Samsung Galaxy S24 Ultra', qty: 1, price: 8500, total: 8500 },
    ],
  },
  {
    id: 'INV-2026-003',
    customer: 'محمد علي',
    company: 'شركة البناء الحديث',
    email: 'mohamed@modernbuild.com',
    amount: 45000,
    tax: 6750,
    total: 51750,
    status: 'overdue',
    dueDate: '2026-01-25',
    createdAt: '2026-01-15',
    items: [
      { name: 'MacBook Pro 16"', qty: 3, price: 15000, total: 45000 },
    ],
  },
];

const statusConfig = {
  paid: { label: 'مدفوعة', color: 'var(--success)', icon: CheckCircle },
  pending: { label: 'قيد الانتظار', color: 'var(--warning)', icon: Clock },
  overdue: { label: 'متأخرة', color: 'var(--error)', icon: AlertCircle },
  draft: { label: 'مسودة', color: 'var(--text-tertiary)', icon: FileText },
};

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedInvoice, setSelectedInvoice] = useState<typeof invoices[0] | null>(null);

  const stats = {
    total: invoices.reduce((acc, inv) => acc + inv.total, 0),
    paid: invoices.filter(i => i.status === 'paid').reduce((acc, inv) => acc + inv.total, 0),
    pending: invoices.filter(i => i.status === 'pending').reduce((acc, inv) => acc + inv.total, 0),
    overdue: invoices.filter(i => i.status === 'overdue').reduce((acc, inv) => acc + inv.total, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <FileText className="w-8 h-8 text-[var(--primary-500)]" />
            الفواتير
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إدارة وتتبع جميع الفواتير
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus className="w-4 h-4" />
          فاتورة جديدة
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-500)]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">إجمالي الفواتير</p>
              <p className="text-xl font-bold">{stats.total.toLocaleString()} ج.م</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--success)]/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[var(--success)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">المدفوعة</p>
              <p className="text-xl font-bold text-[var(--success)]">{stats.paid.toLocaleString()} ج.م</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">قيد الانتظار</p>
              <p className="text-xl font-bold text-[var(--warning)]">{stats.pending.toLocaleString()} ج.م</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--error)]/10 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[var(--error)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">المتأخرة</p>
              <p className="text-xl font-bold text-[var(--error)]">{stats.overdue.toLocaleString()} ج.م</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="بحث بالرقم أو اسم العميل..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pr-11 w-full"
          />
        </div>
        <div className="flex gap-2">
          {Object.entries(statusConfig).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setSelectedStatus(selectedStatus === key ? null : key)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                selectedStatus === key
                  ? 'bg-[var(--primary-500)]/10 text-[var(--primary-500)]'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border-default)]">
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">الفاتورة</th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">العميل</th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">المبلغ</th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">الحالة</th>
                <th className="text-right p-4 text-sm font-medium text-[var(--text-secondary)]">تاريخ الاستحقاق</th>
                <th className="text-center p-4 text-sm font-medium text-[var(--text-secondary)]">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice, index) => {
                const status = statusConfig[invoice.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                
                return (
                  <motion.tr
                    key={invoice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-[var(--border-default)] hover:bg-[var(--bg-tertiary)] transition-colors"
                  >
                    <td className="p-4">
                      <p className="font-mono font-medium">{invoice.id}</p>
                      <p className="text-xs text-[var(--text-tertiary)]">{invoice.createdAt}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-medium">{invoice.customer}</p>
                      <p className="text-sm text-[var(--text-tertiary)]">{invoice.company}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold">{invoice.total.toLocaleString()} ج.م</p>
                      <p className="text-xs text-[var(--text-tertiary)]">+ {invoice.tax.toLocaleString()} ضريبة</p>
                    </td>
                    <td className="p-4">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
                        style={{ backgroundColor: `${status.color}20`, color: status.color }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                        <span>{invoice.dueDate}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
