"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldCheck, LogOut, Mail, CheckCircle, Activity, Search, 
  AlertTriangle, PenTool, Database, Chrome, Workflow, Lock, X, CheckCircle2, Loader2, FileUp, RefreshCw
} from 'lucide-react';

// Initialize the Supabase Brain
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Spam dictionary for the Composer
const spamWords = ['free', 'guarantee', 'urgent', 'act now', 'buy', 'discount', '100%', 'click here', 'winner', 'risk-free', 'opportunity', 'cash', 'crypto', 'investment', 'lowest price', 'save big'];

export default function DashboardPage() {
  // --- AUTHENTICATION STATE ---
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // --- UI STATE ---
  const [activeTab, setActiveTab] = useState('composer');
  
  // 1. Composer State
  const [composerInput, setComposerInput] = useState('');
  const [composerSpamCount, setComposerSpamCount] = useState(0);
  
  // 2. Permutation Finder State
  const [finderFirst, setFinderFirst] = useState('');
  const [finderLast, setFinderLast] = useState('');
  const [finderDomain, setFinderDomain] = useState('');
  const [finderScanning, setFinderScanning] = useState(false);
  const [finderResults, setFinderResults] = useState(null);

  // 3. Blacklist Monitor State
  const [blDomain, setBlDomain] = useState('');
  const [blScanning, setBlScanning] = useState(false);
  const [blResults, setBlResults] = useState(null);

  // THE SECURITY CHECK: Verify session on load
  useEffect(() => {
    const checkSession = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Not logged in? Kick them to the login page immediately.
        window.location.href = '/login';
      } else {
        // Logged in? Save their data to state.
        setUser(session.user);
      }
      setAuthLoading(false);
    };
    checkSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  // --- TOOL LOGIC HANDLERS ---
  const handleFinder = async (e) => {
    e.preventDefault();
    setFinderScanning(true); 
    setFinderResults(null);
    
    const f = finderFirst.toLowerCase().trim(); 
    const l = finderLast.toLowerCase().trim(); 
    const d = finderDomain.toLowerCase().trim();

    // Generate the standard permutations
    const permutations = [
      `${f}.${l}@${d}`,
      `${f.charAt(0)}${l}@${d}`,
      `${f.charAt(0)}.${l}@${d}`,
      `${f}@${d}`
    ];

    try {
      // Send the permutations to our REAL backend API
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails: permutations })
      });

      if (!response.ok) throw new Error("API Network Failure");

      const data = await response.json();
      
      // Update the UI with the real network results!
      setFinderResults(data.results);
    } catch (error) {
      console.error(error);
      alert("Verification Engine failed to connect. Check your network.");
    } finally {
      setFinderScanning(false);
    }
  };

  // Prevent UI rendering until we confirm who they are
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Activity className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  const NavBtn = ({ id, icon: Icon, label, tier }) => (
    <button onClick={() => setActiveTab(id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-colors ${activeTab === id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
      <Icon className="w-4 h-4" /> {label} 
      {tier === 'pro' && activeTab !== id && <Lock className="w-3 h-3 ml-auto opacity-50" />}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] flex pt-20 lg:pt-0">
      
      {/* SIDEBAR */}
      <div className="w-72 fixed h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex flex-col z-10 px-4 py-6">
        <div className="flex items-center gap-2.5 mb-8 px-2 cursor-pointer" onClick={() => window.location.href = '/'}><div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Mail className="w-4 h-4 text-white" /></div><span className="font-black text-xl text-slate-900 dark:text-white">Mailvah.</span></div>
        
        <div className="bg-[#050810] rounded-xl p-3 border border-slate-800 mb-6 mx-2">
            <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Active User</div>
            <div className="text-xs font-mono text-emerald-400 truncate">{user?.email}</div>
        </div>

        <div className="space-y-1 flex-1 overflow-y-auto scrollbar-hide">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2 mt-2">Sandbox Tools</div>
          <NavBtn id="composer" icon={PenTool} label="Spam-Proof Composer" />
          <NavBtn id="finder" icon={Search} label="Permutation Finder" />
          <NavBtn id="domain" icon={ShieldCheck} label="Blacklist Monitor" />
          
          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest px-3 mb-2 mt-8">Pro Network</div>
          <NavBtn id="enrichment" icon={Database} label="Bulk Enrichment" tier="pro" />
          <NavBtn id="linkedin" icon={Chrome} label="LinkedIn Extractor" tier="pro" />
          <NavBtn id="crm" icon={Workflow} label="1-Click CRM Purge" tier="pro" />
        </div>
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"><LogOut className="w-4 h-4" /> Secure Logout</button>
        </div>
      </div>

      {/* MOBILE HEADER (If viewing on phone) */}
      <div className="lg:hidden fixed top-0 left-0 w-full h-16 bg-[#050810] border-b border-slate-800 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2"><Mail className="w-6 h-6 text-blue-500"/><span className="font-black text-white text-lg">Mailvah.</span></div>
        <button onClick={handleLogout} className="text-xs font-bold text-slate-400 hover:text-red-400">Logout</button>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-72 px-6 md:px-12 py-10 overflow-y-auto min-h-screen">
        
        {/* 1. COMPOSER */}
        {activeTab === 'composer' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-8"><div className="inline-block bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">Free Sandbox Tool</div><h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Spam-Proof Composer</h2><p className="text-slate-500 font-medium">Type a spam word like "100% free" to test the defense engine.</p></div>
             <div className="grid md:grid-cols-2 gap-8">
               <textarea value={composerInput} onChange={(e) => { setComposerInput(e.target.value); setComposerSpamCount((e.target.value.toLowerCase().match(new RegExp(spamWords.join('|'), 'g')) || []).length); }} placeholder="Draft your cold email here..." className="w-full h-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium text-slate-900 dark:text-white shadow-sm"/>
               <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 flex flex-col relative overflow-hidden shadow-2xl">
                 <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4"><ShieldCheck className="w-5 h-5 text-emerald-500" /><span className="font-bold text-white">Spam Defense Console</span></div>
                 {composerSpamCount > 0 ? (
                   <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-xl flex items-start gap-3 animate-in fade-in"><AlertTriangle className="w-5 h-5 text-red-400 shrink-0"/><div className="text-sm text-red-300 font-bold">Detected {composerSpamCount} dangerous trigger(s). Your email will likely bounce.</div></div>
                 ) : (
                   <div className="flex-1 flex flex-col items-center justify-center text-emerald-500/50"><CheckCircle className="w-16 h-16 mb-4 opacity-50"/><p className="font-bold text-center">Inbox Safe.<br/>No spam triggers detected.</p></div>
                 )}
               </div>
             </div>
          </div>
        )}

        {/* 2. PERMUTATION FINDER */}
        {activeTab === 'finder' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-8"><div className="inline-block bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">Free Sandbox Tool</div><h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Permutation Finder</h2><p className="text-slate-500 font-medium">Input a name and company. We will generate and test every combination.</p></div>
             
             <form onSubmit={handleFinder} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-sm mb-8">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                 <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">First Name</label><input required type="text" value={finderFirst} onChange={e=>setFinderFirst(e.target.value)} className="w-full bg-slate-50 dark:bg-[#050810] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" placeholder="John" /></div>
                 <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Last Name</label><input required type="text" value={finderLast} onChange={e=>setFinderLast(e.target.value)} className="w-full bg-slate-50 dark:bg-[#050810] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" placeholder="Doe" /></div>
                 <div><label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Company Domain</label><input required type="text" value={finderDomain} onChange={e=>setFinderDomain(e.target.value)} className="w-full bg-slate-50 dark:bg-[#050810] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-blue-500" placeholder="stripe.com" /></div>
               </div>
               <button type="submit" disabled={finderScanning} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">{finderScanning ? <Loader2 className="w-5 h-5 animate-spin"/> : 'Generate & Verify Combinations'}</button>
             </form>

             {finderResults && (
               <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl animate-in fade-in">
                 <h3 className="text-xl font-black text-white mb-6">Verification Results</h3>
                 <div className="space-y-3">
                   {finderResults.map((res, i) => (
                     <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#050810] border border-slate-800">
                       <div className="font-mono text-sm text-slate-300">{res.email}</div>
                       {res.status === 'valid' ? <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"><CheckCircle2 className="w-4 h-4"/> 100% Valid</div> : <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"><X className="w-4 h-4"/> Bounced</div>}
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>
        )}

        {/* 3. BLACKLIST MONITOR */}
        {activeTab === 'domain' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4">
             <div className="mb-8"><div className="inline-block bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full mb-3">Free Sandbox Tool</div><h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Blacklist Monitor</h2><p className="text-slate-500 font-medium">Check if your sending domain has been flagged by global spam filters.</p></div>
             
             <form onSubmit={handleBlacklist} className="flex flex-col md:flex-row items-center relative mb-8 gap-4">
                <input required type="text" value={blDomain} onChange={e=>setBlDomain(e.target.value)} placeholder="Enter your domain (e.g. acme.com)" className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl md:pl-6 px-4 py-5 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-500 shadow-sm" />
                <button type="submit" disabled={blScanning} className="w-full md:w-auto md:absolute right-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 flex justify-center items-center">{blScanning ? <Activity className="w-5 h-5 animate-spin"/> : 'Scan Network'}</button>
             </form>

             {blResults && (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
                 {blResults.map((r, i) => (
                   <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex items-center justify-between">
                     <span className="font-bold text-slate-700 dark:text-slate-300">{r.name}</span>
                     <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-black uppercase bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full"><CheckCircle2 className="w-4 h-4"/> {r.status}</span>
                   </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* PRO TOOLS PLACEHOLDERS (To be connected to APIs in Phase 6) */}
        {(activeTab === 'enrichment' || activeTab === 'linkedin' || activeTab === 'crm') && (
            <div className="max-w-4xl mx-auto text-center py-20 animate-in zoom-in">
                <Lock className="w-16 h-16 text-slate-700 mx-auto mb-6" />
                <h2 className="text-3xl font-black text-white mb-4">Pro Network Required</h2>
                <p className="text-slate-400 font-medium max-w-md mx-auto mb-8">This feature connects to our backend enterprise APIs and requires an active subscription.</p>
                <button className="bg-blue-600 text-white font-black py-4 px-8 rounded-xl hover:bg-blue-500 transition-colors">Upgrade to Pro</button>
            </div>
        )}

      </div>
    </div>
  );
}
