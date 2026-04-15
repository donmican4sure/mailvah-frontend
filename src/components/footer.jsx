import React from 'react';
import Link from 'next/link';
import { Shield, Lock } from 'lucide-react';

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
            The most affordable, high-accuracy Outbound Security Suite on the market. Find verified business emails, protect your domains, and grow your pipeline.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h4 className="text-white font-bold text-sm mb-1">Affordable by design.</h4>
            <p className="text-slate-500 text-xs">We own our bare-metal infrastructure, which means we can pass massive database savings directly down to you.</p>
          </div>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/features" className="hover:text-sky-400 transition-colors">Features</Link></li>
            <li><Link href="/pricing" className="hover:text-sky-400 transition-colors">Pricing</Link></li>
            <li><a href="#" className="hover:text-sky-400 transition-colors">Chrome Extension</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Compare</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/compare" className="hover:text-sky-400 transition-colors">Mailvah vs Apollo</Link></li>
            <li><Link href="/compare" className="hover:text-sky-400 transition-colors">Mailvah vs Hunter</Link></li>
            <li><Link href="/compare" className="hover:text-sky-400 transition-colors">Mailvah vs Skrapp</Link></li>
            <li><Link href="/compare" className="hover:text-sky-400 transition-colors">Mailvah vs Snov.io</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><Link href="/legal" className="hover:text-sky-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/legal" className="hover:text-sky-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/legal" className="hover:text-sky-400 transition-colors">GDPR</Link></li>
            <li><Link href="/legal" className="hover:text-sky-400 transition-colors">Security</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-slate-500">
        <p>© 2026 Donmican Technology Ltd. All rights reserved.</p>
        <div className="flex items-center gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-2"><Shield className="w-3 h-3"/> SOC 2 Type II</span>
          <span className="flex items-center gap-2"><Lock className="w-3 h-3"/> 256-bit Encryption</span>
        </div>
      </div>
    </footer>
  );
}
