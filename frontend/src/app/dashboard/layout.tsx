'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { Bell, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
      <Sidebar />
      
      <div className="ml-64 p-8">
        {/* Topbar */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Good Morning, Idris</h1>
            <p className="text-gray-400 text-sm">Here's what's happening today.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-black" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold">Idris Ghamid</div>
                <div className="text-xs text-gray-400">Admin</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center overflow-hidden border border-white/10">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
