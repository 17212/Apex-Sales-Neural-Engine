// ═══════════════════════════════════════════════════════════════════════════════
// 🚀 APEX SALES NEURAL ENGINE - About Modal Component
// ═══════════════════════════════════════════════════════════════════════════════
// © 2025-2026 IDRISIUM Corp | Idris Ghamid
// ═══════════════════════════════════════════════════════════════════════════════

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Github,
  Mail,
  MessageCircle,
  Sparkles,
  Heart,
  Award,
  Zap,
  Shield,
  Globe,
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="glass-card w-full max-w-lg p-0 overflow-hidden">
              {/* Header with gradient */}
              <div className="relative h-40 bg-gradient-to-br from-[var(--primary-600)] via-[var(--primary-500)] to-[var(--secondary-500)] overflow-hidden">
                {/* Animated particles */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-white/30"
                      initial={{
                        x: Math.random() * 400,
                        y: Math.random() * 160,
                      }}
                      animate={{
                        y: [null, Math.random() * 160],
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>

                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 left-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                {/* Logo */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--bg-primary)] to-[var(--bg-secondary)] border-4 border-[var(--bg-primary)] shadow-2xl flex items-center justify-center">
                    <Sparkles className="w-12 h-12 text-[var(--primary-400)]" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="pt-16 pb-6 px-6 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--primary-400)] to-[var(--secondary-400)] bg-clip-text text-transparent">
                  Apex Sales Neural Engine™
                </h2>
                <p className="text-[var(--text-secondary)] mt-1">Version 1.0.0</p>

                <p className="mt-4 text-sm text-[var(--text-tertiary)] max-w-sm mx-auto">
                  محرك الذكاء الاصطناعي للمبيعات الآلية - مدعوم بـ Gemini 2.5 Pro
                </p>

                {/* Features */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: Zap, label: 'AI-Powered', color: '#f59e0b' },
                    { icon: Shield, label: 'Enterprise-Grade', color: '#22c55e' },
                    { icon: Globe, label: 'Multi-Channel', color: '#3b82f6' },
                  ].map((feature) => (
                    <div
                      key={feature.label}
                      className="p-3 rounded-xl bg-[var(--bg-tertiary)]"
                    >
                      <feature.icon
                        className="w-6 h-6 mx-auto mb-2"
                        style={{ color: feature.color }}
                      />
                      <p className="text-xs text-[var(--text-secondary)]">{feature.label}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-[var(--border-default)]" />

                {/* Developer Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--primary-500)] to-[var(--secondary-500)] flex items-center justify-center text-white font-bold text-xl">
                    إ
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">Idris Ghamid</p>
                    <p className="text-sm text-[var(--text-secondary)]">إدريس غامد</p>
                    <p className="text-xs text-[var(--text-tertiary)]">Founder & CEO @ IDRISIUM Corp</p>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 mt-6">
                  <SocialLink
                    href="https://github.com/IDRISIUM"
                    icon={Github}
                    label="GitHub"
                    color="#ffffff"
                  />
                  <SocialLink
                    href="https://tiktok.com/@idris.ghamid"
                    icon={() => <span className="text-lg">🎵</span>}
                    label="TikTok"
                    color="#ff0050"
                  />
                  <SocialLink
                    href="https://instagram.com/idris.ghamid"
                    icon={() => <span className="text-lg">📸</span>}
                    label="Instagram"
                    color="#E4405F"
                  />
                  <SocialLink
                    href="https://t.me/IDRV72"
                    icon={MessageCircle}
                    label="Telegram"
                    color="#0088CC"
                  />
                  <SocialLink
                    href="mailto:idris.ghamid@gmail.com"
                    icon={Mail}
                    label="Email"
                    color="#D14836"
                  />
                </div>

                {/* Website Link */}
                <a
                  href="http://idrisium.linkpc.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-[var(--primary-500)]/10 text-[var(--primary-400)] text-sm hover:bg-[var(--primary-500)]/20 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  idrisium.linkpc.net
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-[var(--border-default)]">
                  <p className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1">
                    Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> in Egypt
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    © 2025-2026 IDRISIUM Corp. All rights reserved.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function SocialLink({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: any;
  label: string;
  color: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg"
      style={{ backgroundColor: `${color}20` }}
      title={label}
    >
      <Icon className="w-5 h-5" style={{ color }} />
    </a>
  );
}
