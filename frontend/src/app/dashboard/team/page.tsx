// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - Team Management Page
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  MoreVertical,
  Shield,
  Mail,
  Phone,
  Calendar,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  Crown,
  UserCog,
  Eye,
} from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Idris Ghamid',
    email: 'idris.ghamid@gmail.com',
    phone: '+20 100 000 0000',
    role: 'owner',
    department: 'Management',
    avatar: null,
    status: 'active',
    joinedAt: '2025-01-01',
    lastActive: '2026-01-31T05:00:00',
    permissions: ['all'],
  },
  {
    id: '2',
    name: 'أحمد محمد',
    email: 'ahmed@apexsales.com',
    phone: '+20 100 111 1111',
    role: 'admin',
    department: 'Operations',
    avatar: null,
    status: 'active',
    joinedAt: '2025-06-15',
    lastActive: '2026-01-31T04:30:00',
    permissions: ['orders', 'products', 'customers', 'analytics'],
  },
  {
    id: '3',
    name: 'سارة أحمد',
    email: 'sara@apexsales.com',
    phone: '+20 100 222 2222',
    role: 'manager',
    department: 'Sales',
    avatar: null,
    status: 'active',
    joinedAt: '2025-08-20',
    lastActive: '2026-01-31T03:00:00',
    permissions: ['orders', 'customers', 'inbox'],
  },
  {
    id: '4',
    name: 'محمد علي',
    email: 'mohamed@apexsales.com',
    phone: '+20 100 333 3333',
    role: 'agent',
    department: 'Support',
    avatar: null,
    status: 'inactive',
    joinedAt: '2025-10-01',
    lastActive: '2026-01-28T10:00:00',
    permissions: ['inbox', 'orders'],
  },
];

const roles = {
  owner: { label: 'المالك', color: '#f59e0b', icon: Crown },
  admin: { label: 'مدير', color: '#8b5cf6', icon: Shield },
  manager: { label: 'مشرف', color: '#3b82f6', icon: UserCog },
  agent: { label: 'موظف', color: '#6b7280', icon: Users },
};

const permissions = [
  { id: 'orders', label: 'إدارة الطلبات', description: 'عرض وإدارة الطلبات' },
  { id: 'products', label: 'إدارة المنتجات', description: 'إضافة وتعديل المنتجات' },
  { id: 'customers', label: 'إدارة العملاء', description: 'عرض بيانات العملاء' },
  { id: 'inbox', label: 'صندوق الوارد', description: 'الرد على الرسائل' },
  { id: 'analytics', label: 'التحليلات', description: 'عرض التقارير والإحصائيات' },
  { id: 'settings', label: 'الإعدادات', description: 'تعديل إعدادات النظام' },
  { id: 'team', label: 'إدارة الفريق', description: 'إضافة وإدارة أعضاء الفريق' },
  { id: 'billing', label: 'الفواتير', description: 'إدارة الفواتير والمدفوعات' },
];

export default function TeamPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Users className="w-8 h-8 text-[var(--primary-500)]" />
            إدارة الفريق
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            إدارة أعضاء الفريق وصلاحياتهم
          </p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">
          <Plus className="w-4 h-4" />
          إضافة عضو جديد
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--primary-500)]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[var(--primary-500)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">إجمالي الأعضاء</p>
              <p className="text-xl font-bold">{teamMembers.length}</p>
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
              <p className="text-sm text-[var(--text-tertiary)]">نشط الآن</p>
              <p className="text-xl font-bold text-[var(--success)]">
                {teamMembers.filter(m => m.status === 'active').length}
              </p>
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
            <div className="w-10 h-10 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#8b5cf6]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">المدراء</p>
              <p className="text-xl font-bold">
                {teamMembers.filter(m => m.role === 'admin' || m.role === 'owner').length}
              </p>
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
            <div className="w-10 h-10 rounded-xl bg-[var(--warning)]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--warning)]" />
            </div>
            <div>
              <p className="text-sm text-[var(--text-tertiary)]">غير نشط</p>
              <p className="text-xl font-bold text-[var(--warning)]">
                {teamMembers.filter(m => m.status === 'inactive').length}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-tertiary)]" />
        <input
          type="text"
          placeholder="بحث عن عضو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input pr-11 w-full"
        />
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => {
          const role = roles[member.role as keyof typeof roles];
          const RoleIcon = role.icon;
          
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <span
                      className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${role.color}20`, color: role.color }}
                    >
                      <RoleIcon className="w-3 h-3" />
                      {role.label}
                    </span>
                  </div>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)]">
                  <MoreVertical className="w-4 h-4 text-[var(--text-tertiary)]" />
                </button>
              </div>

              {/* Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Phone className="w-4 h-4" />
                  <span dir="ltr">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Calendar className="w-4 h-4" />
                  <span>انضم {member.joinedAt}</span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-default)]">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.status === 'active' ? 'bg-[var(--success)] animate-pulse' : 'bg-[var(--text-muted)]'
                    }`}
                  />
                  <span className="text-sm text-[var(--text-tertiary)]">
                    {member.status === 'active' ? 'متصل الآن' : 'غير متصل'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Roles & Permissions Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <h3 className="font-semibold text-lg mb-4">الأدوار والصلاحيات</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(roles).map(([key, role]) => {
            const RoleIcon = role.icon;
            return (
              <div
                key={key}
                className="p-4 rounded-xl border border-[var(--border-default)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${role.color}20` }}
                  >
                    <RoleIcon className="w-4 h-4" style={{ color: role.color }} />
                  </div>
                  <span className="font-medium">{role.label}</span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">
                  {key === 'owner' && 'كل الصلاحيات + إدارة الاشتراك'}
                  {key === 'admin' && 'كل الصلاحيات عدا الاشتراك'}
                  {key === 'manager' && 'إدارة الطلبات والعملاء'}
                  {key === 'agent' && 'الرد على الرسائل فقط'}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
