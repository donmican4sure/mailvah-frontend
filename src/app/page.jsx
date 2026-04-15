'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronRight, CheckCircle2, Zap, Mail, Database, Activity, Target, Lock } from 'lucide-react';

export default function UltimateHomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  const [emailsSent, setEmailsSent] = useState(10000);
  const [bounceRate, setBounceRate] = useState(10);
  const [activeTab, setActiveTab] = useState(1);

  const wastedLeads = Math.floor(emailsSent * (bounceRate / 100));
  const savings = Math.floor(wastedLeads * 0.85);

  const startScan = (e) => {
    e.preventDefault();
    if (status === 'locked' || !email) return;
    setStatus('scanning');
    setLogs(['> Initializing Port 25 Handshake...', '> Bypassing Greylisting...']);
    setTimeout(() => {
        setLogs(prev => [...prev, '> VERDICT: SAFE TO SEND', '> System Lock: Upgrade for more.']);
        setStatus('locked');
    }, 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] text-white overflow-hidden font-sans">
      {/* GLOW EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      {/* HERO SECTION */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Dallas Node 01: Active
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-6 tracking-tighter">
            ZERO <br/> <span className="text-sky-500 italic">BOUNCE</span> <br/> REPUTATION.
          </h1>
          <p className="text-slate-400 text-lg mb-10 max-w-md leading-relaxed">
            Legacy tools use dead data. Mailvah uses real-time SMTP handshakes and decoy traffic to verify every lead in milliseconds.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://app.mailvah.com/register" className="px-8 py-4 bg-sky-500 text-black font-black rounded-xl hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20">
              OPEN COMMAND CENTER
            </a>
          </div>
        </motion.div>

        {/* INTERACTIVE TERMINAL */}
        <div className="bg-[#0a0f1c] border border-white/10 rounded-3xl overflow-hidden shadow-2xl h-[420px] flex flex-col">
          <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500/40"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/40"></div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-widest">Mailvah Decoy V4.0</span>
          </div>
          <div className="p-8 font-mono text-sm flex-1 overflow-y-auto">
            <p className="text-slate-600 mb-4">// Run heuristic scan on target email</p>
            <form onSubmit={startScan} className="flex gap-3 mb-6">
              <span className="text-sky-500 font-bold">$</span>
              <input 
                type="email" 
                placeholder="target@company.com" 
                className="bg-transparent border-none outline-none text-sky-400 flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
              />
            </form>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={log.includes('VERDICT') ? 'text-emerald-400 font-bold' : 'text-slate-500'}>{log}</div>
              ))}
              {status === 'locked' && (
                <div className="mt-4 p-3 bg-sky-500/5 border border-sky-500/20 rounded-lg text-sky-400 text-xs text-center">
                  Daily Demo Limit Reached. Create account to continue.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="py-32 px-6 max-w-5xl mx-auto">
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20 backdrop-blur-3xl">
          <h2 className="text-3xl font-black mb-12 text-center uppercase tracking-widest">The ROI of Accuracy</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-slate-400 font-bold uppercase text-xs">Emails Per Month</span>
                  <span className="text-white font-black">{emailsSent.toLocaleString()}</span>
                </div>
                <input type="range" min="1000" max="100000" step="1000" value={emailsSent} onChange={(e) => setEmailsSent(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none accent-sky-500" />
              </div>
              <div>
                <div className="flex justify-between mb-4">
                  <span className="text-slate-400 font-bold uppercase text-xs">Current Bounce Rate</span>
                  <span className="text-rose-500 font-black">{bounceRate}%</span>
                </div>
                <input type="range" min="1" max="30" step="1" value={bounceRate} onChange={(e) => setBounceRate(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none accent-rose-500" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-black/50 p-6 rounded-2xl border border-white/5">
                <div className="text-slate-500 text-[10px] font-black uppercase mb-1">Potential Lost Revenue</div>
                <div className="text-rose-500 text-4xl font-black tracking-tighter">${wastedLeads.toLocaleString()}</div>
              </div>
              <div className="bg-sky-500/10 p-6 rounded-2xl border border-sky-500/20 shadow-2xl shadow-sky-500/10">
                <div className="text-sky-500 text-[10px] font-black uppercase mb-1">Mailvah Estimated Savings</div>
                <div className="text-sky-400 text-4xl font-black tracking-tighter">+${savings.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-32 px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-black mb-8">READY TO DEPLOY?</h2>
        <a href="https://app.mailvah.com/register" className="inline-flex items-center gap-2 px-12 py-6 bg-white text-black font-black rounded-full hover:scale-105 transition-transform text-lg">
          START SCANNING NOW <Zap className="w-5 h-5 fill-black" />
        </a>
      </section>
    </div>
  );
}
