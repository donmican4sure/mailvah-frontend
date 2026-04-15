'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Cpu, Crosshair } from 'lucide-react';

const competitors = [
  { name: '4x Compute Heuristic Scan', mailvah: true, others: false },
  { name: 'Catch-all Decoy Protocol', mailvah: true, others: false },
  { name: 'Bare-Metal Dallas Infrastructure', mailvah: true, others: false },
  { name: '100% Credit Rollover', mailvah: true, others: false },
  { name: 'Dual-Vault Economics (Hunt vs Wash)', mailvah: true, others: false },
  { name: 'Sub-Second API Responses', mailvah: true, others: false },
  { name: 'Standard SMTP Ping', mailvah: true, others: true },
  { name: 'Syntax Checking', mailvah: true, others: true },
];

export default function PremiumCompare() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-24 md:py-32 px-4 md:px-6 overflow-hidden font-sans">
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* AGGRESSIVE HERO MESSAGING */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-xs font-black text-rose-400 uppercase tracking-widest mb-6">
            <ShieldAlert className="w-4 h-4" /> Stop Burning Domains
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight">Mailvah <span className="text-slate-500 italic font-medium">vs.</span> The Industry</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Most legacy tools resell the exact same basic API pings. We don't ping once. <strong className="text-white">Every Mailvah credit executes a 4-stage Heuristic Decoy protocol using 4x the computing power of a standard API.</strong>
          </p>
        </motion.div>

        {/* WIDE COMPARISON TABLE (SCROLLABLE ON MOBILE) */}
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[3rem] shadow-[0_0_50px_rgba(56,189,248,0.05)] overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr>
                  <th className="p-6 md:p-8 text-slate-500 uppercase text-xs font-black tracking-widest border-b border-white/10 w-1/4 sticky left-0 bg-[#070b14] z-20">Engine Capabilities</th>
                  <th className="p-6 md:p-8 text-sky-400 uppercase text-sm font-black tracking-widest text-center border-b border-white/10 bg-sky-500/5 border-x border-white/5">Mailvah Pro</th>
                  <th className="p-6 text-slate-400 uppercase text-xs font-bold text-center border-b border-white/10">Apollo</th>
                  <th className="p-6 text-slate-400 uppercase text-xs font-bold text-center border-b border-white/10">Hunter.io</th>
                  <th className="p-6 text-slate-400 uppercase text-xs font-bold text-center border-b border-white/10">Skrapp</th>
                  <th className="p-6 text-slate-400 uppercase text-xs font-bold text-center border-b border-white/10">Snov.io</th>
                  <th className="p-6 text-slate-400 uppercase text-xs font-bold text-center border-b border-white/10">ContactOut</th>
                </tr>
              </thead>
              <motion.tbody variants={container} initial="hidden" animate="show">
                {competitors.map((comp, i) => (
                  <motion.tr variants={item} key={i} className="group hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                    <td className="p-6 md:p-8 text-slate-300 font-medium group-hover:text-white transition-colors sticky left-0 bg-[#070b14] group-hover:bg-[#0a0f1c] z-10">{comp.name}</td>
                    
                    {/* Mailvah Column */}
                    <td className="p-6 bg-sky-500/5 border-x border-white/5 text-center">
                      <div className="bg-emerald-500/20 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <Check className="text-emerald-400 w-5 h-5 md:w-6 md:h-6" />
                      </div>
                    </td>
                    
                    {/* Legacy Columns */}
                    {[1, 2, 3, 4, 5].map((num) => (
                      <td key={num} className="p-6 text-center">
                        {comp.others ? (
                          <div className="bg-slate-800/50 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto border border-white/5">
                            <Check className="text-slate-500 w-4 h-4 md:w-5 md:h-5" />
                          </div>
                        ) : (
                          <div className="bg-rose-500/10 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mx-auto border border-rose-500/10">
                            <X className="text-rose-500/50 w-4 h-4 md:w-5 md:h-5" />
                          </div>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>

        {/* 4X COMPUTE HIGHLIGHT */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-16 bg-gradient-to-br from-indigo-900/30 to-slate-900/30 border border-indigo-500/20 p-8 md:p-12 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
           <div className="bg-indigo-500/20 p-6 rounded-3xl border border-indigo-500/30 shrink-0">
             <Cpu className="w-12 h-12 text-indigo-400" />
           </div>
           <div>
             <h3 className="text-2xl font-black text-white mb-3">Why 4x Compute matters.</h3>
             <p className="text-slate-400 leading-relaxed">
               When Apollo or Snov.io pings an email server, enterprise firewalls like Mimecast and Proofpoint instantly return a fake "Valid" response (a Catch-All trap). Mailvah bypasses this by utilizing 4x the computing power to execute a multi-stage decoy handshake, forcing the firewall to reveal the true status of the inbox before we charge you a credit.
             </p>
           </div>
        </motion.div>

      </div>
    </div>
  );
}
