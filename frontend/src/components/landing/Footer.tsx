'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                <Zap className="text-black w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter">IDRISIUM</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Empowering e-commerce brands with autonomous AI sales agents that drive revenue 24/7.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {[
            { title: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
            { title: 'Company', links: ['About', 'Careers', 'Blog', 'Contact'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="text-white font-bold mb-6">{col.title}</h4>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © 2026 IDRISIUM Corp. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
