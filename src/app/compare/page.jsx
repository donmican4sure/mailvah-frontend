'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Lock, Globe, Zap, ShieldAlert } from 'lucide-react';

const competitors = [
  { name: 'Heuristic Decoy Protocol (Catch-all Mapping)', mailvah: true, legacy: false },
  { name: 'Bare-Metal Dallas Infrastructure', mailvah: true, legacy: false },
  { name: '100% Credit Rollover on Active Plans', mailvah: true, legacy: false },
  { name: 'Dual-Vault Economics (Hunt vs Wash)', mailvah: true, legacy: false },
  { name: 'Sub-Second SMTP Handshakes', mailvah: true, legacy: false },
  { name: 'Standard SMTP Verification', mailvah: true, legacy: true },
  { name: 'Basic Domain Pinging', mailvah: true, legacy: true },
];

export default function PremiumCompare() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-32 px-6 overflow-hidden font-sans">
      {/* DEEP RED/BLUE BACKGROUND GLOWS FOR "VERSUS" VIBE */}
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-black text-rose-400 uppercase tracking-widest mb-6">
            <ShieldAlert className="w-4 h-4" /> Stop Burning Leads
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">Mailvah <span className="text-slate-500 italic font-medium">vs.</span> The Wrappers</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Most tools just resell the same 3 legacy APIs. We built a proprietary bare-metal engine to guarantee 0% bounce risk.
          </p>
        </motion.div>

        {/* GLASSMORPHISM TABLE */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-4 md:p-10 shadow-[0_0_50px_rgba(56,189,248,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr>
                  <th className="p-6 text-slate-500 uppercase text-xs font-black tracking-widest border-b border-white/10">Engine Capabilities</th>
                  <th className="p-6 text-sky-400 uppercase text-sm font-black tracking-widest text-center border-b border-white/10 bg-sky-500/5 rounded-t-2xl border-x border-white/5">Mailvah Pro</th>
                  <th className="p-6 text-slate-500 uppercase text-xs font-black tracking-widest text-center border-b border-white/10">Legacy Tools<br/><span className="text-[10px] font-normal">(Apollo, Hunter, Snov.io)</span></th>
                </tr>
              </thead>
              <motion.tbody variants={container} initial="hidden" animate="show">
                {competitors.map((comp, i) => (
                  <motion.tr variants={item} key={i} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                    <td className="p-6 text-slate-300 font-medium group-hover:text-white transition-colors">{comp.name}</td>
                    
                    {/* Mailvah Column */}
                    <td className="p-6 bg-sky-500/5 border-x border-white/5 text-center">
                      <div className="bg-emerald-500/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Check className="text-emerald-400 w-6 h-6" />
                      </div>
                    </td>
                    
                    {/* Legacy Column */}
                    <td className="p-6 text-center">
                      {comp.legacy ? (
                        <div className="bg-slate-800/50 w-10 h-10 rounded-full flex items-center justify-center mx-auto border border-white/5">
                          <Check className="text-slate-500 w-5 h-5" />
                        </div>
                      ) : (
                        <div className="bg-rose-500/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto border border-rose-500/10">
                          <X className="text-rose-500/50 w-5 h-5" />
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>

        {/* PREMIUM TRUST BADGES */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.03] transition-colors">
            <Lock className="w-12 h-12 text-sky-400 mx-auto mb-6" />
            <h4 className="text-white font-black text-xl mb-3">GDPR Purge Protocol</h4>
            <p className="text-slate-400 leading-relaxed">We never store your lead data. Processed CSVs are purged from our Dallas nodes immediately after verification.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.03] transition-colors">
            <Globe className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
            <h4 className="text-white font-black text-xl mb-3">Global Proxy Grid</h4>
            <p className="text-slate-400 leading-relaxed">We rotate IPs across millions of residential proxies to bypass strict corporate firewalls and spam traps.</p>
          </div>
          <div className="bg-white/[0.01] border border-white/5 p-8 rounded-3xl text-center hover:bg-white/[0.03] transition-colors">
            <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
            <h4 className="text-white font-black text-xl mb-3">Sub-Second APIs</h4>
            <p className="text-slate-400 leading-relaxed">Because we own our bare-metal hardware, API verifications execute in under 800ms. True real-time scaling.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
