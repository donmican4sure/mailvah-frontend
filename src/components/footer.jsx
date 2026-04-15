import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#03050a] border-t border-white/5 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-sky-500" />
            <span className="text-white font-black text-xl tracking-tight">Mailvah.</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            The elite Outbound Security Suite. Verified business data, bare-metal nodes, and 4x compute accuracy.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-bold text-[10px] uppercase tracking-widest mb-1">Corporate Ownership</h4>
            <p className="text-slate-500 text-xs">Mailvah is a product of <span className="text-slate-300">Donmican Technology Ltd</span>.</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/features" className="hover:text-sky-400 transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link></li>
            <li><Link href="/compare" className="hover:text-sky-400 transition-colors">Compare</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/legal/privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Contact</h4>
          <p className="text-sm text-slate-400">Lagos, Nigeria</p>
          <p className="text-sm text-sky-400 mt-2">support@mailvah.com</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-[10px] font-bold text-slate-600 uppercase tracking-widest flex flex-col md:flex-row justify-between">
        <p>© 2026 Donmican Technology Ltd. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Built in Lagos.</p>
      </div>
    </footer>
  );
}
