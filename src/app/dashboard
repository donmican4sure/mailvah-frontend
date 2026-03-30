"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  ShieldAlert, LogOut, Mail, CheckCircle, 
  Activity, Search, AlertCircle, CreditCard
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function ClientDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailToVerify, setEmailToVerify] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // THE SECURITY CHECK: Verify they are actually logged in
  useEffect(() => {
    const checkUser = async () => {
      if (!supabase) return;
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Kick them out if they aren't logged in
        window.location.href = '/register';
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/register';
  };

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate a network delay for the UI for now
    setTimeout(() => {
      setIsVerifying(false);
      alert("Verification Engine API will be connected here in Phase 5!");
      setEmailToVerify('');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <Activity className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  // Safely grab the user's email or fallback
  const userEmail = user?.email || 'Valued Client';

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-300 flex flex-col font-sans selection:bg-blue-500/30">
      
      {/* Top Navigation */}
      <header className="h-16 border-b border-slate-800 bg-[#050810] flex items-center justify-between px-6 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-blue-500" />
          <span className="text-lg font-black text-white tracking-tight">Mailvah.</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-slate-400">
            <Mail className="w-3 h-3 mr-2 text-slate-500" />
            {userEmail}
          </div>
          <button 
            onClick={handleLogout}
            className="text-xs font-bold text-slate-500 hover:text-red-400 flex items-center transition-colors"
          >
            <LogOut className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Content Space */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full">
        
        {/* Welcome Banner */}
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4">
          <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Welcome back.</h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">Your enterprise deliverability suite is online and secured.</p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Verifier Tool */}
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 delay-150">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-[60px] pointer-events-none"></div>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center border border-blue-500/20 mr-4">
                <Search className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-black text-white">Deep-Scan Verifier</h2>
                <p className="text-xs text-slate-500 font-medium">Test an email against 40+ SMTP risk factors.</p>
              </div>
            </div>

            <form onSubmit={handleVerify} className="relative z-10">
              <div className="relative flex items-center">
                <input 
                  type="email" 
                  required
                  value={emailToVerify}
                  onChange={(e) => setEmailToVerify(e.target.value)}
                  placeholder="Enter email address to scan..."
                  className="w-full bg-[#050810] border border-slate-700 rounded-2xl pl-4 pr-32 py-4 text-white focus:border-blue-500 focus:outline-none font-medium"
                />
                <button 
                  type="submit"
                  disabled={isVerifying || !emailToVerify}
                  className="absolute right-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-6 rounded-xl transition-all disabled:opacity-50 text-sm flex items-center"
                >
                  {isVerifying ? <Activity className="w-4 h-4 animate-spin" /> : 'Scan Now'}
                </button>
              </div>
            </form>

            <div className="mt-6 flex gap-4 border-t border-slate-800 pt-6">
              <div className="flex-1 bg-[#050810] rounded-xl p-4 border border-slate-800 flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white mb-1">Catch-All Detection</div>
                  <div className="text-[10px] text-slate-500">Identifies false-positive domains securely.</div>
                </div>
              </div>
              <div className="flex-1 bg-[#050810] rounded-xl p-4 border border-slate-800 flex items-start hidden sm:flex">
                <AlertCircle className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white mb-1">Spam Trap Check</div>
                  <div className="text-[10px] text-slate-500">Cross-references known global blocklists.</div>
                </div>
              </div>
            </div>
          </div>

          {/* User Stats / Billing Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl animate-in fade-in slide-in-from-right-8 delay-300">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Your Workspace</h2>
            
            <div className="bg-[#050810] rounded-2xl p-5 border border-slate-800 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-500">Available Credits</span>
                <CreditCard className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-3xl font-black text-white">150</div>
              <div className="text-[10px] font-bold text-emerald-400 mt-2 bg-emerald-500/10 inline-block px-2 py-1 rounded border border-emerald-500/20">Free Tier</div>
            </div>

            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl transition-colors text-sm flex items-center justify-center mt-2">
              Upgrade Plan
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
