"use client";

import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Mail, Lock, User, Loader2, CheckCircle, ArrowRight, ShieldAlert } from 'lucide-react';

// Initialize the Supabase Brain
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ? process.env.NEXT_PUBLIC_SUPABASE_URL.trim() : '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.trim() : '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);

    if (!supabase) {
      setError("System offline: Cannot connect to database vault.");
      setLoading(false); return;
    }

    try {
      // THE REAL DATABASE CALL
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (signUpError) throw signUpError;

      setSuccess(true);
      // Redirect to the dashboard after successful registration
      setTimeout(() => { window.location.href = '/dashboard'; }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-3xl flex flex-col items-center max-w-sm w-full animate-in zoom-in">
          <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
          <h2 className="text-2xl font-black text-white text-center mb-2">Account Created!</h2>
          <p className="text-emerald-400 text-center text-sm font-medium">Provisioning your workspace...</p>
          <Loader2 className="w-6 h-6 text-emerald-500 animate-spin mt-6" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <a href="/" className="flex items-center gap-2 mb-8 relative z-10 hover:scale-105 transition-transform">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Mail className="w-5 h-5 text-white" /></div>
        <span className="text-2xl font-black text-white tracking-tight">Mailvah.</span>
      </a>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-black text-white mb-2">Start verifying leads.</h2>
        <p className="text-slate-400 text-sm font-medium mb-8">Create your free account. Get 150 credits instantly.</p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-sm font-bold mb-6 flex items-start">
            <ShieldAlert className="w-5 h-5 mr-2 shrink-0" /><span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><User className="h-5 w-5 text-slate-500" /></div>
              <input type="text" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-blue-500 focus:outline-none font-medium transition-all" placeholder="John Doe" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-slate-500" /></div>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-blue-500 focus:outline-none font-medium transition-all" placeholder="you@company.com" />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Secure Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-slate-500" /></div>
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#050810] border border-slate-800 rounded-xl pl-11 pr-4 py-3.5 text-white focus:border-blue-500 focus:outline-none font-medium transition-all" placeholder="Minimum 6 characters" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl shadow-lg mt-2 transition-all hover:scale-[1.02] flex justify-center items-center disabled:opacity-50">
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span className="mr-2">Create Account</span> <ArrowRight className="w-5 h-5" /></>}
          </button>
        </form>

        <p className="text-center text-slate-500 text-xs font-medium mt-8">
          Already have an account? <a href="/login" className="text-blue-400 hover:text-blue-300 font-bold">Sign in here</a>
        </p>
      </div>
    </div>
  );
}
