'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Database, Radar, Activity, Globe, MailCheck, Lock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function PlatformFeatures() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-32 px-6 overflow-hidden font-sans">
      {/* GLOWING BACKGROUND ORBS */}
      <div className="absolute top-[5%] left-[10%] w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* PAGE HEADER */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-black text-indigo-400 uppercase tracking-widest mb-6">
            <Lock className="w-4 h-4" /> Zero-Cost Diagnostic
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">The Command Center.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Mailvah is a complete outbound security suite. Explore the exact infrastructure we use to protect your sending domains.
          </p>
        </motion.div>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-32">

          {/* FEATURE 1: THREAT ANALYZER (Mapped from Screenshot) */}
          <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
                <ShieldAlert className="w-8 h-8 text-emerald-400" />
              </div>
              <h2 className="text-4xl font-black text-white mb-6">Dual-Threat Analyzer</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Paste your cold email draft before sending. Our payload analyzer detects spam-trigger words that cause routing to the Promotions or Spam folders. 
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /><span>Real-time Deliverability Score (0-100)</span></li>
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" /><span><strong>DNS Armor Protocol:</strong> Automatically verify your SPF and DMARC records to guarantee infrastructure health.</span></li>
              </ul>
            </div>
            
            {/* Mockup UI Window */}
            <div className="order-1 lg:order-2 relative perspective-[1000px]">
              <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-[3rem] opacity-50"></div>
              <div className="bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 p-6">
                <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                   <div className="flex items-center gap-2"><ShieldAlert className="w-5 h-5 text-emerald-500"/> <span className="text-white font-bold text-sm">Payload Analyzer</span></div>
                   <div className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded">SCORE: 100/100</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 mb-4 text-slate-400 text-sm font-mono leading-relaxed h-32">
                  Hey {'{first_name}'}, I guarantee this is a 100% free opportunity to buy our new software. Act now!
                </div>
                <div className="text-emerald-400 font-mono text-xs">System clear. No spam triggers detected.</div>
              </div>
            </div>
          </motion.div>

          {/* FEATURE 2: BULK ENGINE & API HUB */}
          <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative perspective-[1000px]">
               <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-[3rem] opacity-50"></div>
               <div className="bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 p-8 flex flex-col items-center justify-center min-h-[300px]">
                 <div className="w-24 h-24 rounded-full border-4 border-sky-500/30 border-t-sky-400 animate-spin mb-6"></div>
                 <div className="text-white font-black text-2xl mb-2">Processing leads.csv</div>
                 <div className="text-sky-400 font-mono text-sm">Validating MX Records... 45%</div>
               </div>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-sky-500/10 rounded-2xl border border-sky-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                <Database className="w-8 h-8 text-sky-400" />
              </div>
              <h2 className="text-4xl font-black text-white mb-6">Bulk Engine & API Hub</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Upload massive CSV lists directly into the dashboard, or connect your CRM via our sub-200ms REST API. We strip out dead domains, syntax errors, and catch-all honeypots.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /><span>Clean up to 100,000 rows simultaneously.</span></li>
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-sky-400 shrink-0" /><span>Instant export of safe, verifiable leads.</span></li>
              </ul>
            </div>
          </motion.div>

          {/* FEATURE 3: LEAD FINDER (THE VAULT) */}
          <motion.div variants={fadeUp} className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                <Radar className="w-8 h-8 text-indigo-400" />
              </div>
              <h2 className="text-4xl font-black text-white mb-6">Live Extractor & The Vault</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Don't have a list? Build one. Use your Discovery Credits to scrape our global proxy network and extract real-time contact data for any domain.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" /><span>Bypass outdated LinkedIn databases.</span></li>
                <li className="flex items-start gap-3 text-slate-300"><CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" /><span>Store your sourced lists securely in The Vault.</span></li>
              </ul>
            </div>
            
            <div className="order-1 lg:order-2 relative">
               <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-[3rem] opacity-50"></div>
               <div className="bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative z-10 p-6 flex items-center gap-4">
                 <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                   <Globe className="w-8 h-8 text-slate-400" />
                 </div>
                 <div className="flex-1">
                   <div className="h-2 w-full bg-white/10 rounded mb-3"></div>
                   <div className="h-2 w-2/3 bg-white/10 rounded"></div>
                 </div>
                 <div className="bg-indigo-500 text-white font-bold px-4 py-2 rounded-lg text-xs">EXTRACT</div>
               </div>
            </div>
          </motion.div>

        </motion.div>

        {/* CTA SECTION */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-32 text-center bg-gradient-to-b from-sky-900/20 to-transparent border border-sky-500/20 rounded-[3rem] p-16 relative overflow-hidden">
           <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent"></div>
           <h2 className="text-4xl font-black text-white mb-6">Ready to see inside?</h2>
           <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">Create a free account to unlock the Sandbox. You get 150 verification credits immediately.</p>
           <a href="https://app.mailvah.com/register" className="inline-block px-10 py-5 rounded-2xl font-black bg-sky-500 text-slate-900 hover:bg-sky-400 transition-all hover:scale-[1.02] shadow-[0_0_40px_rgba(56,189,248,0.4)] text-lg uppercase tracking-wide">
              Access the Dashboard
           </a>
        </motion.div>

      </div>
    </div>
  );
}
