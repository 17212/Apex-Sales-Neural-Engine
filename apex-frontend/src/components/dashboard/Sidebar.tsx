'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: '📊', label: 'الرئيسية', href: '/dashboard' },
  { icon: '💬', label: 'المحادثات', href: '/dashboard/conversations', badge: 3 },
  { icon: '🛒', label: 'الطلبات', href: '/dashboard/orders' },
  { icon: '📦', label: 'المنتجات', href: '/dashboard/products' },
  { icon: '👥', label: 'العملاء', href: '/dashboard/customers' },
  { icon: '📈', label: 'التحليلات', href: '/dashboard/analytics' },
  { icon: '⚙️', label: 'الإعدادات', href: '/dashboard/settings' },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <span className={styles.logoIcon}>🧠</span>
        {!collapsed && <span className={styles.logoText}>APEX</span>}
      </div>

      {/* Toggle Button */}
      <button className={styles.toggle} onClick={onToggle} aria-label="Toggle sidebar">
        <span className={styles.toggleIcon}>{collapsed ? '→' : '←'}</span>
      </button>

      {/* Navigation */}
      <nav className={styles.nav}>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span className={styles.navLabel}>{item.label}</span>}
              {item.badge && !collapsed && (
                <span className={styles.badge}>{item.badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className={styles.user}>
        <div className={styles.userAvatar}>👤</div>
        {!collapsed && (
          <div className={styles.userInfo}>
            <span className={styles.userName}>إدريس غامد</span>
            <span className={styles.userRole}>مدير</span>
          </div>
        )}
      </div>
    </aside>
  );
}
