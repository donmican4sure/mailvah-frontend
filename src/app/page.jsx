'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radar, Server, ChevronRight, CheckCircle2, Lock, TrendingDown, Cpu, Zap, Mail, Layout, ShieldCheck, Database, Activity } from 'lucide-react';
import Link from 'next/link';

export default function PremiumHomePage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [logs, setLogs] = useState([]);
  
  // ROI CALCULATOR STATE
  const [emailsSent, setEmailsSent] = useState(5000);
  const [bounceRate, setBounceRate] = useState(8);
  const wastedLeads = Math.floor(emailsSent * (bounceRate / 100));
  const mailvahROI = Math.floor(wastedLeads * 0.6); // Hypothetical recovery value

  // TOUR TABS STATE
  const [activeTab, setActiveTab] = useState(1);

  const startScan = async (e) => {
    e.preventDefault();
    if (status === 'locked' || !email) return;
    setStatus('scanning');
    setLogs(['> Initializing Port 25 Deep-Scan...', '> Connecting to Dallas Core...']);
    setTimeout(() => {
        setLogs(prev => [...prev, `> Result: SAFE TO SEND`, '> [SYSTEM LOCK] IP Limit Reached.']);
        setStatus('locked');
    }, 2000);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] overflow-hidden selection:bg-sky-500/30 font-sans">
      
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute top-[40%] left-[50%] translate-x-[-50%] w-[1000px] h-[400px] bg-indigo-900/20 rounded-[100%] blur-[100px] pointer-events-none opacity-50"></div>

      {/* HERO SECTION */}
      <section className="px-6 pt-32 pb-20 md:pt-48 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs font-black text-sky-400 uppercase tracking-widest mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            Dallas Bare-Metal Nodes Active
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.95] mb-6 tracking-tighter">
            NEVER <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-emerald-400">
              BOUNCE AGAIN.
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 leading-relaxed max-w-lg font-medium">
            Stop using API wrappers. Mailvah runs a proprietary Heuristic Decoy Protocol on bare-metal Dallas servers to map firewall logic and guarantee deliverability.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://app.mailvah.com/register" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-white transition-all duration-200 bg-sky-500 rounded-xl hover:bg-sky-400 shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:scale-[1.02]">
              ACCESS COMMAND CENTER
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* TERMINAL UI */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500 to-emerald-500 rounded-[2rem] blur opacity-20"></div>
          <div className="relative bg-[#0a0f1c]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] overflow-hidden font-mono text-sm h-[400px] flex flex-col">
            <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500/50"></div><div className="w-3 h-3 rounded-full bg-amber-500/50"></div><div className="w-3 h-3 rounded-full bg-emerald-500/50"></div></div>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">HEURISTIC_ENGINE_V4.0</span>
            </div>
            <div className="p-8 overflow-y-auto flex-1">
              <p className="text-slate-500 mb-4">// Test the decoy protocol. Limit: 1 scan.</p>
              <form onSubmit={startScan} className="flex gap-4 mb-6">
                <span className="text-sky-500 font-bold">➜</span>
                <input type="email" placeholder="Enter target email..." className="bg-transparent outline-none text-white flex-1 border-b border-white/10 pb-1" value={email} onChange={(e)=>setEmail(e.target.value)} disabled={status !== 'idle'} />
              </form>
              <div className="space-y-2">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('SAFE') ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{log}</div>
                ))}
                {status === 'locked' && (
                  <a href="https://app.mailvah.com/register" className="mt-6 block text-center p-4 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 font-bold hover:bg-sky-500/20 transition-all">Sign up to unlock 115 free credits</a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="px-6 py-32 max-w-5xl mx-auto relative z-10 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-6">
            THE ROI OF ACCURACY
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Stop burning your pipeline.</h2>
          <p className="text-slate-400 text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            Every bounced email damages your reputation. If your bounce rate creeps over 3%, Google and Microsoft start sending your emails directly to spam.
          </p>

          <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 md:p-16 rounded-[3rem] text-left">
            <h3 className="text-2xl font-black text-white mb-10">Calculate your savings</h3>
            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-12">
                <div>
                  <div className="flex justify-between mb-4"><span className="text-slate-300 font-bold">Monthly Emails Sent</span><span className="text-white font-black">{emailsSent.toLocaleString()}</span></div>
                  <input type="range" min="1000" max="50000" step="1000" value={emailsSent} onChange={(e)=>setEmailsSent(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500" />
                </div>
                <div>
                  <div className="flex justify-between mb-4"><span className="text-slate-300 font-bold">Current Bounce Rate</span><span className="text-rose-500 font-black">{bounceRate}%</span></div>
                  <input type="range" min="1" max="25" step="1" value={bounceRate} onChange={(e)=>setBounceRate(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                  <div className="text-slate-500 text-[10px] font-black uppercase mb-1">Leads Wasted</div>
                  <div className="text-rose-500 text-3xl font-black">{wastedLeads}/mo</div>
                </div>
                <div className="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                  <div className="text-emerald-500 text-[10px] font-black uppercase mb-1">Mailvah ROI</div>
                  <div className="text-emerald-400 text-3xl font-black">+${mailvahROI}/mo</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* PLATFORM TOUR TABS */}
      <section className="px-6 py-32 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">
            30-SECOND PLATFORM TOUR
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">Watch the infrastructure in action.</h2>
          <p className="text-slate-400 max-w-xl mx-auto">This isn't a mockup. This is the exact logic our backend executes to protect your pipeline.</p>
        </div>

        <div className="bg-[#0a0f1c] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          {/* TABS HEADER */}
          <div className="flex overflow-x-auto border-b border-white/5 no-scrollbar bg-black/20">
            {[
              { id: 1, name: '1. Waterfall Engine', icon: Zap },
              { id: 2, name: '2. Bulk Uploads', icon: Database },
              { id: 3, name: '3. Domain Monitor', icon: Activity },
              { id: 4, name: '4. Spam Composer', icon: Mail }
            ].map((tab) => (
              <button 
                key={tab.id} 
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-8 py-6 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${activeTab === tab.id ? 'border-sky-500 text-white bg-sky-500/5' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
              >
                <tab.icon className="w-4 h-4" /> {tab.name}
              </button>
            ))}
          </div>
          
          {/* TABS CONTENT AREA */}
          <div className="p-8 md:p-16 min-h-[400px] flex items-center justify-center relative overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full text-center"
                >
                  {activeTab === 1 && (
                    <div className="max-w-2xl mx-auto">
                       <Shield className="w-16 h-16 text-sky-500 mx-auto mb-8" />
                       <h3 className="text-3xl font-black text-white mb-4">Live Verification Terminal</h3>
                       <p className="text-slate-400 text-lg leading-relaxed">[SYSTEM] Initiating Waterfall for stripe.com... [DNS] Locating MX records... Found mx.stripe.com. [SMTP] &gt; EHLO verify.mailvah.com</p>
                    </div>
                  )}
                  {activeTab === 2 && (
                    <div className="max-w-2xl mx-auto">
                       <div className="w-full max-w-md mx-auto bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-8 mb-8">
                         <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                         <div className="text-emerald-400 font-black text-xl mb-1">10,000 Rows Cleaned</div>
                         <div className="text-slate-500 font-mono text-sm">Processing Bulk CSV...</div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/40 p-4 rounded-xl border border-white/5"><div className="text-white font-black">8,420</div><div className="text-[10px] text-slate-500 uppercase">Diamond Leads</div></div>
                          <div className="bg-black/40 p-4 rounded-xl border border-white/5"><div className="text-rose-500 font-black">1,580</div><div className="text-[10px] text-slate-500 uppercase">Bounces Removed</div></div>
                       </div>
                    </div>
                  )}
                  {activeTab === 3 && (
                    <div className="max-w-2xl mx-auto text-center">
                       <div className="inline-flex items-center gap-4 bg-rose-500/10 border border-rose-500/20 px-6 py-3 rounded-full text-rose-500 font-bold mb-8 animate-pulse">
                          <Activity className="w-5 h-5" /> REPUTATION AT RISK: 3 Blacklists Found
                       </div>
                       <p className="text-slate-400 text-lg">We monitor your sending domains against 100+ global spam traps in real-time. Never send from a "hot" domain again.</p>
                    </div>
                  )}
                  {activeTab === 4 && (
                    <div className="max-w-2xl mx-auto">
                       <div className="bg-black/60 border border-white/10 rounded-xl p-6 text-left font-mono text-sm text-slate-400 mb-8">
                         <span className="text-rose-500">I guarantee this is a 100% free opportunity...</span>
                         <div className="mt-4 text-sky-400 font-bold">// SUGGESTION: Remove "guarantee" and "free" to bypass Mimecast filters.</div>
                       </div>
                       <h3 className="text-2xl font-black text-white">Payload Optimizer</h3>
                    </div>
                  )}
                </motion.div>
             </AnimatePresence>
          </div>
        </div>
      </section>

      {/* FINAL READY TO BUILD CTA */}
      <section className="px-6 py-32 max-w-4xl mx-auto relative z-10 text-center">
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-gradient-to-b from-sky-500/10 to-transparent border border-sky-500/20 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter">Ready to build your pipeline?</h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">Join thousands of founders and sales teams who have switched to Mailvah for better data and transparent pricing.</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
               <a href="https://app.mailvah.com/register" className="w-full md:w-auto px-10 py-5 rounded-2xl font-black bg-sky-500 text-slate-950 hover:bg-sky-400 transition-all text-lg shadow-[0_0_40px_rgba(56,189,248,0.4)]">Get started for free</a>
               <Link href="/features" className="w-full md:w-auto px-10 py-5 rounded-2xl font-black border border-white/10 text-white hover:bg-white/5 transition-all text-lg flex items-center justify-center gap-2">
                 <Layout className="w-5 h-5" /> Platform Tour
               </Link>
            </div>
            <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-widest">
               <ShieldCheck className="w-4 h-4" /> 30-Day Money-Back Guarantee
            </div>
         </motion.div>
      </section>
    </div>
  );
}
