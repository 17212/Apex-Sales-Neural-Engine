'use client';

import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';
import MetricsGrid from '@/components/dashboard/MetricsGrid';
import RevenueChart from '@/components/dashboard/RevenueChart';
import PulseFeed from '@/components/dashboard/PulseFeed';
import styles from './page.module.css';

export default function DashboardPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`${styles.container} ${sidebarCollapsed ? styles.collapsed : ''}`}>
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      
      <div className={styles.main}>
        <Topbar />
        
        <div className={styles.content}>
          {/* Welcome Section */}
          <header className={styles.header}>
            <div className={styles.headerText}>
              <h1 className={styles.title}>مرحباً! 👋</h1>
              <p className={styles.subtitle}>إليك ملخص أداء متجرك اليوم</p>
            </div>
            <div className={styles.headerDate}>
              <span className={styles.today}>
                {new Date().toLocaleDateString('ar-EG', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
          </header>

          {/* Metrics Grid */}
          <MetricsGrid />

          {/* Charts & Feed Section */}
          <div className={styles.grid}>
            <div className={styles.chartSection}>
              <RevenueChart />
            </div>
            <div className={styles.feedSection}>
              <PulseFeed />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
