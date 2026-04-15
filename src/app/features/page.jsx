'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Database, Radar, Activity, Globe, Zap, Code, BarChart3, Terminal } from 'lucide-react';

export default function EliteFeatures() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-20 px-6 overflow-hidden">
      <div className="absolute top-[-10%] left-[50%] translate-x-[-50%] w-[1000px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">THE ENGINE.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Mailvah is a proprietary stack built for one thing: making sure your outbound pipeline never hits a wall.
          </p>
        </motion.div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          
          {/* LARGE CARD: WATERFALL ENGINE */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 group relative bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-hidden hover:bg-white/[0.04] transition-all">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
               <Zap className="w-40 h-40 text-sky-500" />
            </div>
            <div className="relative z-10">
              <div className="bg-sky-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-sky-500/20">
                <ShieldAlert className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase">The Waterfall Engine</h3>
              <p className="text-slate-400 text-lg leading-relaxed max-w-md">
                Our proprietary 4-stage Heuristic Decoy protocol. We don't just "ping" a server; we execute a full SMTP handshake using decoy traffic to force firewalls to reveal the truth. 
              </p>
              <div className="mt-8 flex gap-4">
                <span className="text-xs font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20 tracking-widest uppercase">99.9% Accuracy</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 tracking-widest uppercase">Dallas Bare-Metal</span>
              </div>
            </div>
          </motion.div>

          {/* SQUARE CARD: LEAD FINDER */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 hover:bg-white/[0.04] transition-all">
            <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-indigo-500/20">
              <Radar className="w-7 h-7 text-indigo-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase">The Sourcing Vault</h3>
            <p className="text-slate-400 leading-relaxed">
              Scrape live B2B contact data via our global proxy network. No more buying dead lists from 2023.
            </p>
          </motion.div>

          {/* SQUARE CARD: DOMAIN MONITOR */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="group bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 hover:bg-white/[0.04] transition-all">
            <div className="bg-rose-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-rose-500/20">
              <Activity className="w-7 h-7 text-rose-400" />
            </div>
            <h3 className="text-2xl font-black text-white mb-4 uppercase">Domain Armor</h3>
            <p className="text-slate-400 leading-relaxed">
              24/7 monitoring of your sending reputation. We alert you the millisecond you hit a blacklist.
            </p>
          </motion.div>

          {/* LARGE CARD: API HUB */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="md:col-span-2 group relative bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 overflow-hidden hover:bg-white/[0.04] transition-all">
             <div className="grid md:grid-cols-2 gap-8 items-center">
               <div>
                  <div className="bg-emerald-500/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/20">
                    <Terminal className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase">Developer First</h3>
                  <p className="text-slate-400 leading-relaxed">
                    Connect our high-priority REST API to your custom stack. Sub-200ms responses for real-time app integration.
                  </p>
               </div>
               <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] text-slate-500 border border-white/5">
                 <div className="text-sky-400">POST /api/v4/verify</div>
                 <div>{`{ "email": "target@domain.com", "deep_scan": true }`}</div>
                 <div className="mt-4 text-emerald-500">{`{ "status": "deliverable", "score": 100 }`}</div>
               </div>
             </div>
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center py-20">
           <a href="https://app.mailvah.com/register" className="px-12 py-6 rounded-2xl bg-white text-black font-black text-xl hover:bg-sky-400 transition-all uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.1)]">
             Start Verifying
           </a>
        </div>
      </div>
    </div>
  );
}
