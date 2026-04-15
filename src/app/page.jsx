'use client';
import React from 'react';
import { Shield, Zap, Database, Activity } from 'lucide-react';
import Link from 'next/link';

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-[#03050a] text-white font-sans pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-8">
          System Online
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
          MAILVAH <br/>
          <span className="text-sky-500">OUTBOUND SECURITY</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop paying for dead databases. Mailvah uses a proprietary bare-metal engine to guarantee near-zero bounce rates.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-20">
          <a href="https://app.mailvah.com/register" className="px-10 py-5 bg-sky-500 text-black font-black rounded-2xl hover:bg-sky-400 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            GET STARTED FREE
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <Zap className="text-sky-500 mb-4" />
            <h3 className="font-bold mb-2 text-white">Waterfall Engine</h3>
            <p className="text-sm text-slate-400 leading-relaxed">Real-time verification across 4 protocol stages.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <Database className="text-sky-500 mb-4" />
            <h3 className="font-bold mb-2 text-white">Lead Finder</h3>
            <p className="text-sm text-slate-400 leading-relaxed">High-accuracy B2B lead sourcing with zero decay.</p>
          </div>
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
            <Activity className="text-sky-500 mb-4" />
            <h3 className="font-bold mb-2 text-white">Domain Armor</h3>
            <p className="text-sm text-slate-400 leading-relaxed">24/7 monitoring against global spam blacklists.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
