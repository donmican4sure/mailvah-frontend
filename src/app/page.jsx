'use client';
import React, { useState } from 'react';
import { Terminal, Shield, Radar, ChevronRight, Zap, Database, Server } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  // Terminal Demo Logic
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, scanning, locked
  const [logs, setLogs] = useState([]);

  const startScan = (e) => {
    e.preventDefault();
    if (status === 'locked' || !email) return;

    setStatus('scanning');
    setLogs(['> Initializing Port 25 Deep-Scan...']);

    // This simulates the Heuristic Decoy Protocol pings
    setTimeout(() => setLogs(prev => [...prev, '> Pinging fake_trap@domain.com... [BLOCK]']), 1000);
    setTimeout(() => setLogs(prev => [...prev, '> Pinging alpha_992@domain.com... [BLOCK]']), 2000);
    setTimeout(() => {
      setLogs(prev => [...prev, '> Executing direct SMTP handshake...', '> Result: SAFE TO SEND', '', '> [SYSTEM LOCK] IP Limit Reached.']);
      setStatus('locked');
    }, 3500);
  };

  return (
    <div className="relative pb-20">
      {/* HERO SECTION */}
      <section className="px-6 pt-16 md:pt-32 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-xs font-black text-sky-400 uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Dallas Core Infrastructure Online
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 italic uppercase">
            Never <span className="text-sky-500">Bounce</span><br/>Again.
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg">
            Stop using API wrappers. Mailvah runs a proprietary Heuristic Decoy Protocol on bare-metal Dallas servers to map firewall logic and guarantee deliverability.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://app.mailvah.com/register" className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-8 py-4 rounded-xl font-black text-lg transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)] uppercase">
              Access Command Center
            </a>
          </div>
        </div>

        {/* LIVE TERMINAL DEMO */}
        <div className="bg-[#0a0f1c] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl font-mono text-sm">
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
            </div>
            <span className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Heuristic_Engine_v4.0</span>
          </div>
          <div className="p-6 min-h-[300px]">
            <p className="text-slate-500 mb-4">// Test the decoy protocol. Limit: 1 scan per IP.</p>
            <form onSubmit={startScan} className="flex gap-3 mb-6">
              <span className="text-sky-500 font-bold">➜</span>
              <input 
                type="email" 
                placeholder="Enter lead email..." 
                className="bg-transparent border-none outline-none text-white flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status !== 'idle'}
              />
              {status === 'idle' && (
                <button className="text-sky-500 font-bold hover:text-white uppercase text-xs">Scan</button>
              )}
            </form>
            <div className="space-y-2">
              {logs.map((log, i) => (
                <div key={i} className={log.includes('SAFE') ? 'text-emerald-400 font-bold' : log.includes('BLOCK') ? 'text-red-400/70' : 'text-slate-400'}>
                  {log}
                </div>
              ))}
              {status === 'scanning' && <div className="w-2 h-4 bg-sky-500 animate-pulse inline-block"></div>}
              {status === 'locked' && (
                <a href="https://app.mailvah.com/register" className="mt-6 block text-center p-3 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold hover:bg-sky-500/20 transition-all">
                  Sign up to unlock 115 free credits
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* THE BENTO BOX FEATURES */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-3xl relative overflow-hidden group">
            <Shield className="w-12 h-12 text-sky-500 mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase">Integrity Vault (Wash)</h3>
            <p className="text-slate-400 max-w-md">Our Port 25 Deep-Scan engine maps catch-all servers by firing decoy pings before the real verification. Near-zero bounce rates guaranteed.</p>
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[60px] rounded-full"></div>
          </div>
          
          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl group">
            <Radar className="w-12 h-12 text-emerald-500 mb-6 group-hover:rotate-12 transition-transform" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase">Discovery Vault</h3>
            <p className="text-slate-400">Scrape live B2B data via our global proxy grid. Fresh leads, sourced in real-time.</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl group">
            <Server className="w-12 h-12 text-purple-500 mb-6 group-hover:-translate-y-2 transition-transform" />
            <h3 className="text-2xl font-black text-white mb-4 uppercase">Dallas Nodes</h3>
            <p className="text-slate-400">No cloud functions. We own the bare-metal servers for ultra-low latency processing.</p>
          </div>

          <div className="md:col-span-2 bg-gradient-to-br from-sky-900/20 to-slate-900 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-black text-white mb-4 uppercase">100% Credit Rollover</h3>
              <p className="text-slate-400">We respect your budget. As long as you have an active plan, your unused credits never expire. Ever.</p>
            </div>
            <Link href="/pricing" className="bg-white text-slate-950 px-6 py-3 rounded-xl font-black uppercase text-sm flex items-center gap-2 hover:bg-sky-400 transition-colors">
              See Pricing <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
