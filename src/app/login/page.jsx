"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Mail, Lock, Loader2, ArrowRight, ShieldAlert } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    if (!supabase) {
      setError("System offline: Cannot connect to database.");
      setLoading(false); return;
    }

    try {
      // THE REAL DATABASE AUTH CALL
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) throw signInError;
      
      // If successful, throw them straight into the dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 relative overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <a href="/" className="flex items-center gap-2 mb-8 relative z-10 hover:scale-105 transition-transform">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Mail className="w-5 h-5 text-white" /></div>
        <span className="text-2xl font-black text-white tracking-tight">Mailvah.</span>
      </a>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-black text-white mb-2">Welcome back.</h2>
        <p className="text-slate-400 text-sm font-medium mb-8">Enter your credentials to access the vault.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 flex items-start">
            <ShieldAlert className="w-5 h-5 mr-2 shrink-0" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-500" /></div>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-blue-500 focus:outline-none font-medium transition-all" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-500" /></div>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-blue-500 focus:outline-none font-medium transition-all" placeholder="••••••••" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-lg mt-2 transition-all hover:scale-[1.02] flex justify-center items-center disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span className="mr-2">Sign In</span> <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs font-medium mt-8">
          Need an account? <a href="/register" className="text-blue-400 hover:text-blue-300 font-bold">Sign up here</a>
        </p>
      </div>
    </div>
  );
}
