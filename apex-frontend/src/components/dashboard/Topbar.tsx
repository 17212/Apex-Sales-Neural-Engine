'use client';

import { useState } from 'react';
import styles from './Topbar.module.css';

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className={styles.topbar}>
      {/* Search */}
      <div className={styles.search}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="ابحث عن طلب، عميل، أو منتج..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className={styles.searchShortcut}>⌘K</kbd>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        {/* AI Status */}
        <div className={styles.aiStatus}>
          <span className={styles.aiDot}></span>
          <span className={styles.aiLabel}>AI نشط</span>
        </div>

        {/* Notifications */}
        <button 
          className={styles.iconButton}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <span className={styles.notifIcon}>🔔</span>
          <span className={styles.notifBadge}>5</span>
        </button>

        {/* Quick Chat */}
        <button className={styles.iconButton}>
          <span>💬</span>
        </button>

        {/* New Order CTA */}
        <button className={styles.newOrderBtn}>
          + طلب جديد
        </button>
      </div>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className={styles.notifDropdown}>
          <div className={styles.notifHeader}>
            <span>الإشعارات</span>
            <button className={styles.markAllRead}>تحديد الكل كمقروء</button>
          </div>
          <div className={styles.notifList}>
            <div className={styles.notifItem}>
              <span className={styles.notifItemIcon}>🛒</span>
              <div className={styles.notifItemContent}>
                <span className={styles.notifItemTitle}>طلب جديد #APX-1234</span>
                <span className={styles.notifItemTime}>منذ 5 دقائق</span>
              </div>
            </div>
            <div className={styles.notifItem}>
              <span className={styles.notifItemIcon}>💬</span>
              <div className={styles.notifItemContent}>
                <span className={styles.notifItemTitle}>محادثة جديدة من أحمد</span>
                <span className={styles.notifItemTime}>منذ 10 دقائق</span>
              </div>
            </div>
            <div className={styles.notifItem}>
              <span className={styles.notifItemIcon}>⚠️</span>
              <div className={styles.notifItemContent}>
                <span className={styles.notifItemTitle}>مخزون منخفض: iPhone 15</span>
                <span className={styles.notifItemTime}>منذ ساعة</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
