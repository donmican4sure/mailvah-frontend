'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Scale, FileText, Server } from 'lucide-react';

export default function PremiumLegal() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-32 px-6 overflow-hidden font-sans">
      {/* SUBTLE BACKGROUND GLOW */}
      <div className="absolute top-[0%] left-[50%] translate-x-[-50%] w-[1000px] h-[500px] bg-sky-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-black text-slate-300 uppercase tracking-widest mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Mailvah Trust Center
          </div>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">Legal & Privacy.</h1>
          <p className="text-xl text-slate-400">
            Enterprise-grade security, transparency, and compliance for Donmican Technology Ltd.
          </p>
        </motion.div>

        {/* GLASSMORPHISM CONTENT BLOCKS */}
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="space-y-8"
        >
          {/* Section 1 */}
          <motion.section variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <div className="bg-sky-500/10 p-3 rounded-xl border border-sky-500/20">
                <FileText className="w-6 h-6 text-sky-400" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                At Mailvah, we respect your data pipeline. Our proprietary Heuristic Decoy engine processes email verifications in real-time. 
              </p>
              <p>
                We absolutely <strong className="text-white font-medium">do not sell, rent, or trade</strong> your uploaded CSV lead lists to any third parties, enrichment networks, or competitor databases.
              </p>
            </div>
          </motion.section>

          {/* Section 2 */}
          <motion.section variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                <Server className="w-6 h-6 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Data Security & Infrastructure</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                We use enterprise-grade 256-bit AES encryption for all data in transit. 
              </p>
              <p>
                To ensure maximum security, your account credentials, payment methods, and API keys are isolated from our marketing front-end. They are securely processed and vaulted exclusively on our bare-metal architecture at <code className="text-sky-400 bg-sky-500/10 px-2 py-1 rounded">app.mailvah.com</code>.
              </p>
            </div>
          </motion.section>

          {/* Section 3 */}
          <motion.section variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 md:p-12 hover:bg-white/[0.03] transition-colors">
            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-6">
              <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                <Scale className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Terms of Service</h2>
            </div>
            <div className="space-y-4 text-slate-400 leading-relaxed text-lg">
              <p>
                By deploying the Mailvah Engine, you agree to utilize our verification and extraction infrastructure exclusively for lawful B2B outreach and communication. 
              </p>
              <p>
                Unused credits roll over indefinitely as long as your base subscription remains active. If a subscription lapses, the vault capacity is reset.
              </p>
            </div>
          </motion.section>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mt-16 text-slate-500 text-sm">
          <p>© 2026 Donmican Technology Ltd. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
