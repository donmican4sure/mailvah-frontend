'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Database, Radar, Activity, Globe, Zap, Code, Terminal, MousePointer2 } from 'lucide-react';

export default function EliteFeatures() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-20 px-6 overflow-hidden font-sans">
      {/* DEEP BACKGROUND AMBIANCE */}
      <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[1200px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">
            Engine Architecture v4.0
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter">THE ENGINE.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
            Mailvah is a proprietary stack built by Donmican Technology Ltd for one thing: making sure your outbound pipeline never hits a wall.
          </p>
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-32">
          
          {/* FEATURE 1: WATERFALL ENGINE (LARGE 2x1) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 overflow-hidden hover:bg-white/[0.04] transition-all border-sky-500/10">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
               <Zap className="w-64 h-64 text-sky-500" />
            </div>
            <div className="relative z-10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-sky-500/20 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                <ShieldAlert className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">Waterfall Engine</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg mb-8">
                Our proprietary 4-stage Heuristic Decoy protocol. We don't just "ping" a server; we execute a full SMTP handshake using decoy traffic to force firewalls to reveal the truth. 
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="text-[10px] font-black text-sky-400 bg-sky-500/10 px-4 py-1.5 rounded-full border border-sky-500/20 tracking-widest uppercase">99.9% Accuracy</span>
                <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 tracking-widest uppercase">Bare-Metal Dallas</span>
              </div>
            </div>
          </motion.div>

          {/* FEATURE 2: SOURCING VAULT (SQUARE) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
            <div>
                <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20">
                <Radar className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Sourcing Vault</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                Scrape live B2B contact data via our global proxy network. We bypass the outdated, static databases used by legacy tools.
                </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-indigo-400 font-black text-[10px] uppercase tracking-widest">
                <Globe className="w-3 h-3" /> Real-time Extraction
            </div>
          </motion.div>

          {/* FEATURE 3: DOMAIN ARMOR (SQUARE) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
            <div>
                <div className="bg-rose-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/20">
                <Activity className="w-7 h-7 text-rose-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Domain Armor</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                Automated 24/7 monitoring of your sending reputation. We alert you the millisecond your infrastructure hits a blacklist.
                </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-rose-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldAlert className="w-3 h-3" /> Blacklist Protection
            </div>
          </motion.div>

          {/* FEATURE 4: API HUB (LARGE 2x1) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 overflow-hidden hover:bg-white/[0.04] transition-all">
             <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Terminal className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight">High-Priority API</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    Integrate the Mailvah engine directly into your custom CRM or outbound stack. Sub-200ms responses for industrial-scale real-time cleaning.
                  </p>
                  <div className="flex items-center gap-4 text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                    <Code className="w-4 h-4" /> SDK coming soon
                  </div>
               </div>
               <div className="bg-black/60 rounded-[2rem] p-8 font-mono text-[11px] text-slate-500 border border-white/10 shadow-2xl relative">
                 <div className="flex gap-1.5 mb-6"><div className="w-2 h-2 rounded-full bg-white/10"></div><div className="w-2 h-2 rounded-full bg-white/10"></div><div className="w-2 h-2 rounded-full bg-white/10"></div></div>
                 <div className="text-sky-400">POST <span className="text-slate-300">/api/v4/verify</span></div>
                 <div className="mt-2">{`{`}</div>
                 <div className="ml-4 text-indigo-300">{`"target": "elon@spacex.com",`}</div>
                 <div className="ml-4 text-indigo-300">{`"mode": "heuristic_decoy"`}</div>
                 <div>{`}`}</div>
                 <div className="mt-6 text-emerald-500">{`// Result: 100% Deliverable`}</div>
               </div>
             </div>
          </motion.div>

          {/* FEATURE 5: PAYLOAD ANALYZER (SQUARE) */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
            <div>
                <div className="bg-amber-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-amber-500/20">
                <MousePointer2 className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Threat Analyzer</h3>
                <p className="text-slate-400 leading-relaxed text-sm">
                Paste your copy. We scan for hundreds of hidden spam triggers that route your emails to the graveyard.
                </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 text-amber-400 font-black text-[10px] uppercase tracking-widest">
                <ShieldAlert className="w-3 h-3" /> Inbox Intelligence
            </div>
          </motion.div>
        </div>

        {/* BOTTOM CTA */}
        <div className="text-center py-20 relative">
           <div className="absolute top-0 left-[50%] translate-x-[-50%] w-64 h-64 bg-sky-500/10 blur-[100px] rounded-full pointer-events-none"></div>
           <h2 className="text-4xl md:text-6xl font-black text-white mb-10 tracking-tight">READY TO DEPLOY?</h2>
           <a href="https://app.mailvah.com/register" className="inline-block px-12 py-6 rounded-2xl bg-white text-black font-black text-xl hover:bg-sky-400 transition-all uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.1)] hover:scale-105 active:scale-95">
             Access Command Center
           </a>
           <p className="mt-8 text-slate-500 font-bold text-xs uppercase tracking-[0.2em]">A product of Donmican Technology Ltd</p>
        </div>
      </div>
    </div>
  );
}
