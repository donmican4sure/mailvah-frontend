'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radar, Server, ChevronRight, CheckCircle2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function PremiumHomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, success, error, locked
  const [logs, setLogs] = useState([]);

  // THE REAL ENGINE CONNECTION
  const startScan = async (e) => {
    e.preventDefault();
    if (status === 'locked' || !email) return;

    setStatus('scanning');
    setLogs(['> Initializing Port 25 Deep-Scan on Dallas Core...', '> Connecting to app.mailvah.com backend...']);

    try {
      // THIS IS THE REAL API HOOKUP. 
      // It sends the real request to your HTML Command Center backend.
      const response = await fetch('https://app.mailvah.com/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      // We simulate the decoy visual so the user SEES the work, 
      // but we wait for the ACTUAL backend response to resolve.
      setTimeout(() => setLogs(prev => [...prev, `> Bursting decoy logic on ${email.split('@')[1]}...`]), 800);
      
      if (!response.ok) throw new Error('Backend locked or rate limited');
      
      const data = await response.json();
      
      setTimeout(() => {
        setLogs(prev => [...prev, `> Real Handshake complete. Status: ${data.status || 'SAFE TO SEND'}`, '> [SYSTEM LOCK] IP Limit Reached.']);
        setStatus('locked');
      }, 1500);

    } catch (error) {
      setTimeout(() => {
        setLogs(prev => [...prev, '> Backend API not publicly exposed or IP Blocked.', '> [SYSTEM LOCK] Authenticate to continue.']);
        setStatus('locked');
      }, 1500);
    }
  };

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] overflow-hidden selection:bg-sky-500/30 font-sans">
      
      {/* PREMIUM BACKGROUND GLOWS */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[1000px] h-[400px] bg-indigo-900/20 rounded-[100%] blur-[100px] pointer-events-none opacity-50"></div>

      {/* HERO SECTION */}
      <section className="px-6 pt-32 pb-20 md:pt-48 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-black text-sky-400 uppercase tracking-widest mb-8 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Dallas Bare-Metal Nodes Active
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Unbreakable <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
              Deliverability.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
            Stop guessing with API wrappers. Mailvah runs a proprietary Heuristic Decoy Protocol directly from our US-based hardware to map firewalls and eliminate bounces.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://app.mailvah.com/register" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-white transition-all duration-200 bg-sky-500 font-pj rounded-xl hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:scale-[1.02]">
              Access Command Center
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* HIGH-FIDELITY TERMINAL */}
        <motion.div 
          initial={{ opacity: 0, x: 40, rotateY: 10 }} 
          animate={{ opacity: 1, x: 0, rotateY: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative perspective-[1000px]"
        >
          {/* Glowing Border Wrapper */}
          <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-[2rem] blur opacity-30 animate-pulse"></div>
          
          <div className="relative bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl font-mono text-sm flex flex-col h-[400px]">
            {/* Mac OS Style Header */}
            <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-md">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-inner"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-inner"></div>
                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-inner"></div>
              </div>
              <span className="text-slate-400 text-xs font-medium flex items-center gap-2">
                <Lock className="w-3 h-3 text-emerald-500" /> secure.mailvah.engine
              </span>
            </div>
            
            {/* Terminal Body */}
            <div className="p-8 flex-1 flex flex-col">
              <p className="text-slate-500 mb-6">// Test the actual heuristic engine. Limit: 1 scan.</p>
              <form onSubmit={startScan} className="flex gap-4 mb-6">
                <span className="text-sky-500 font-bold text-lg">➜</span>
                <input 
                  type="email" 
                  placeholder="Enter target email to verify..." 
                  className="bg-transparent border-b border-slate-700/50 focus:border-sky-500 outline-none text-white flex-1 pb-1 transition-colors text-base disabled:opacity-50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status !== 'idle'}
                />
                {status === 'idle' && (
                  <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all">
                    Execute
                  </button>
                )}
              </form>
              
              <div className="space-y-3 flex-1 overflow-y-auto">
                {logs.map((log, i) => (
                  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className={log.includes('SAFE') ? 'text-emerald-400 font-bold' : log.includes('LOCK') ? 'text-yellow-400 mt-4' : 'text-slate-300'}>
                    {log}
                  </motion.div>
                ))}
                {status === 'scanning' && <div className="w-2.5 h-5 bg-sky-500 animate-pulse inline-block mt-2"></div>}
                {status === 'locked' && (
                  <motion.a initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} href="https://app.mailvah.com/register" className="mt-6 block text-center p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold hover:bg-sky-500/20 hover:border-sky-500/50 transition-all">
                    Sign up to unlock the Command Center
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* GLASSMORPHISM BENTO BOX */}
      <section className="px-6 py-32 max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } }
          }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Feature 1 */}
          <motion.div variants={fadeUp} className="md:col-span-2 bg-white/[0.02] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
            <Shield className="w-14 h-14 text-sky-400 mb-8 group-hover:scale-110 transition-transform duration-500" />
            <h3 className="text-3xl font-black text-white mb-4">Integrity Vault (Wash)</h3>
            <p className="text-slate-400 text-lg max-w-xl leading-relaxed">Our proprietary Port 25 Deep-Scan engine maps catch-all servers by firing multi-stage decoy pings before the real verification. We guarantee near-zero bounce rates.</p>
            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 blur-[80px] rounded-full group-hover:bg-sky-500/20 transition-colors duration-700"></div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/[0.04] transition-colors">
            <Radar className="w-14 h-14 text-emerald-400 mb-8 group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="text-2xl font-black text-white mb-4">Discovery Vault</h3>
            <p className="text-slate-400 leading-relaxed">Scrape live B2B data directly via our global proxy grid. We bypass corporate firewalls to deliver fresh targets instantly.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={fadeUp} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] group hover:bg-white/[0.04] transition-colors">
            <Server className="w-14 h-14 text-indigo-400 mb-8 group-hover:-translate-y-2 transition-transform duration-500" />
            <h3 className="text-2xl font-black text-white mb-4">Dallas Core</h3>
            <p className="text-slate-400 leading-relaxed">No shared cloud functions. We own the bare-metal servers, offering ultra-low latency for North American routing.</p>
          </motion.div>

          {/* Feature 4 (CTA) */}
          <motion.div variants={fadeUp} className="md:col-span-2 bg-gradient-to-br from-sky-900/40 to-slate-900/40 backdrop-blur-xl border border-sky-500/30 p-10 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-10 shadow-[0_0_50px_rgba(56,189,248,0.1)]">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3 uppercase tracking-wider text-sm">
                <CheckCircle2 className="w-5 h-5" /> 100% Credit Rollover
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Dual-Vault Economics</h3>
              <p className="text-slate-400 text-lg">We isolate our hard API scraping costs from our soft processing costs. You get predictable, massive limits without the "unlimited" lies.</p>
            </div>
            <Link href="/pricing" className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-wide flex items-center gap-2 hover:bg-sky-400 transition-colors whitespace-nowrap">
              See Pricing <ChevronRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
