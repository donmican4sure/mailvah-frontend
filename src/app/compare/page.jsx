'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Database, Layers, TrendingDown, Zap } from 'lucide-react';

const comparisonPoints = [
  { 
    category: 'Data Core', 
    mailvah: 'Live Heuristic Engine (Real-time)', 
    legacy: 'Cached Database (Stale/Static)' 
  },
  { 
    category: 'Data Decay Rate', 
    mailvah: '0% (Verified at the exact millisecond)', 
    legacy: '> 30% Annually (People change jobs)' 
  },
  { 
    category: 'Platform Focus', 
    mailvah: 'Dedicated Outbound Security & Delivery', 
    legacy: 'Bloated CRMs & Clunky Sales Dialers' 
  },
  { 
    category: 'Pricing Model', 
    mailvah: 'Pay for Compute Power (Results)', 
    legacy: 'Pay for Dead/Bounced Leads' 
  },
  { 
    category: 'Infrastructure', 
    mailvah: 'Bare-Metal Dallas Nodes', 
    legacy: 'Shared Public Cloud Functions' 
  },
  { 
    category: 'Credit Expiry', 
    mailvah: '100% Infinite Rollover', 
    legacy: 'Use it or lose it every 30 days' 
  }
];

export default function PremiumCompare() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-24 md:py-32 px-4 md:px-6 overflow-hidden font-sans">
      {/* AGGRESSIVE GLOWS */}
      <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-black text-rose-400 uppercase tracking-widest mb-6">
            <TrendingDown className="w-4 h-4" /> B2B Data Decays 30% Every Year
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">Stop paying for <br/><span className="text-rose-500">dead databases.</span></h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Legacy tools like Apollo, Hunter, and ZoomInfo rely on scraped, cached databases. If they scraped a lead 6 months ago, you are paying for an email that will bounce today. 
          </p>
        </motion.div>

        {/* HEAD TO HEAD MATRIX */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[3rem] shadow-[0_0_50px_rgba(56,189,248,0.05)] overflow-hidden mb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3">
            
            {/* Context Column (Hidden on mobile for cleaner look, shown on desktop) */}
            <div className="hidden lg:block p-8 border-r border-white/5 bg-black/20">
              <h3 className="text-slate-500 uppercase text-xs font-black tracking-widest mb-10 mt-4">The Metric</h3>
              <div className="space-y-12">
                {comparisonPoints.map((point, i) => (
                  <div key={i} className="text-slate-300 font-bold text-sm h-8 flex items-center">{point.category}</div>
                ))}
              </div>
            </div>

            {/* MAILVAH COLUMN (THE WINNER) */}
            <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-white/5 relative bg-sky-500/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-sky-500"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-sky-500 p-2 rounded-xl"><Zap className="w-6 h-6 text-slate-900" /></div>
                <h2 className="text-3xl font-black text-white">Mailvah</h2>
              </div>
              
              <div className="space-y-10">
                {comparisonPoints.map((point, i) => (
                  <div key={i} className="h-auto md:h-10">
                    <span className="lg:hidden text-sky-500 text-[10px] font-black uppercase tracking-widest block mb-1">{point.category}</span>
                    <div className="flex items-start gap-3 text-white font-bold">
                      <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      {point.mailvah}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* THE LEGACY COLUMN (THE LOSER) */}
            <div className="p-8 lg:p-10 bg-rose-500/5 relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500"></div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-rose-500/10 border border-rose-500/20 p-2 rounded-xl"><Database className="w-6 h-6 text-rose-500" /></div>
                <div>
                  <h2 className="text-2xl font-black text-slate-300">The Wrappers</h2>
                  <p className="text-xs text-slate-500 font-bold">(Apollo, Hunter, Snov)</p>
                </div>
              </div>
              
              <div className="space-y-10">
                {comparisonPoints.map((point, i) => (
                  <div key={i} className="h-auto md:h-10">
                    <span className="lg:hidden text-rose-500/50 text-[10px] font-black uppercase tracking-widest block mb-1">{point.category}</span>
                    <div className="flex items-start gap-3 text-slate-400 font-medium">
                      <X className="w-5 h-5 text-rose-500/50 shrink-0 mt-0.5" />
                      {point.legacy}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* FEATURE BLOAT VS FOCUS SECTION */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-8 mb-20">
           
           <motion.div variants={item} className="bg-white/[0.02] border border-white/5 rounded-3xl p-10 hover:bg-white/[0.04] transition-colors">
             <div className="bg-rose-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20">
               <Layers className="w-7 h-7 text-rose-400" />
             </div>
             <h3 className="text-2xl font-black text-white mb-4">The "All-in-One" Trap</h3>
             <p className="text-slate-400 leading-relaxed mb-6">
               Competitors charge $100+ a month because they force you to pay for their bloated CRMs, email warmers, and clunky dialers. They spread their engineering team too thin, and their actual verification tech suffers.
             </p>
           </motion.div>

           <motion.div variants={item} className="bg-gradient-to-br from-sky-900/20 to-emerald-900/10 border border-sky-500/20 rounded-3xl p-10 relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full"></div>
             <div className="bg-sky-500 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
               <ShieldAlert className="w-7 h-7 text-slate-900" />
             </div>
             <h3 className="text-2xl font-black text-white mb-4">The Security Focus</h3>
             <p className="text-slate-400 leading-relaxed mb-6">
               Mailvah is not a CRM. We are an outbound security suite. We dedicate 100% of our engineering budget to maintaining our bare-metal Dallas nodes and updating our firewall penetration protocols. 
             </p>
           </motion.div>

        </motion.div>

        {/* FINAL CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Experience real-time compute.</h2>
          <a href="https://app.mailvah.com/register" className="inline-flex items-center justify-center px-8 py-4 font-black text-slate-900 transition-all duration-200 bg-sky-500 rounded-xl hover:bg-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:scale-[1.02] uppercase tracking-wide">
            Deploy Free Sandbox Engine
          </a>
        </motion.div>

      </div>
    </div>
  );
}
