'use client';
import React from 'react';
import { Check, X, Shield, Zap, Lock, Globe } from 'lucide-react';

const competitors = [
  { name: 'Feature', mailvah: true, legacy: false },
  { name: 'Heuristic Decoy Protocol (Catch-all Mapping)', mailvah: true, legacy: false },
  { name: 'Bare-Metal Dallas Infrastructure', mailvah: true, legacy: false },
  { name: '100% Credit Rollover', mailvah: true, legacy: false },
  { name: 'Dual-Vault Pricing (Hunt vs Wash)', mailvah: true, legacy: false },
  { name: 'Port 25 Deep SMTP Handshake', mailvah: true, legacy: true },
  { name: 'Real-time B2B Sourcing', mailvah: true, legacy: true },
];

export default function ComparePage() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic">Mailvah vs. The Wrappers</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">Most tools just resell the same 3 APIs. We built our own engine from the ground up to guarantee 0% bounce risk.</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-[#0a0f1c]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900/50">
              <th className="p-8 text-slate-400 uppercase text-xs font-black tracking-widest">Capabilities</th>
              <th className="p-8 text-sky-400 uppercase text-sm font-black tracking-widest text-center border-x border-slate-800 bg-sky-500/5">Mailvah Pro</th>
              <th className="p-8 text-slate-500 uppercase text-xs font-black tracking-widest text-center">Legacy Tools (Apollo/Hunter)</th>
            </tr>
          </thead>
          <tbody>
            {competitors.map((item, i) => (
              <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="p-8 text-white font-bold">{item.name}</td>
                <td className="p-8 border-x border-slate-800 bg-sky-500/5 text-center">
                  <div className="bg-emerald-500/20 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                    <Check className="text-emerald-500 w-5 h-5" />
                  </div>
                </td>
                <td className="p-8 text-center">
                  {item.legacy ? (
                    <div className="bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                      <Check className="text-slate-500 w-5 h-5" />
                    </div>
                  ) : (
                    <div className="bg-red-500/10 w-8 h-8 rounded-full flex items-center justify-center mx-auto">
                      <X className="text-red-500/50 w-5 h-5" />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trust Badges */}
      <div className="grid md:grid-cols-3 gap-8 mt-20 text-center">
        <div className="p-8">
          <Lock className="w-10 h-10 text-sky-500 mx-auto mb-4" />
          <h4 className="text-white font-black uppercase mb-2">GDPR Compliant</h4>
          <p className="text-sm text-slate-500">We never store your lead data. We process and purge immediately.</p>
        </div>
        <div className="p-8">
          <Globe className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
          <h4 className="text-white font-black uppercase mb-2">Global Proxy Grid</h4>
          <p className="text-sm text-slate-500">Distributed sourcing nodes to bypass corporate firewalls.</p>
        </div>
        <div className="p-8">
          <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
          <h4 className="text-white font-black uppercase mb-2">Sub-Second Handshake</h4>
          <p className="text-sm text-slate-500">Our Dallas hardware executes verifications in under 800ms.</p>
        </div>
      </div>
    </div>
  );
}
