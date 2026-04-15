'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-[#03050a]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2 z-50">
          <Shield className="w-8 h-8 text-sky-500" />
          <span className="text-white font-black text-2xl tracking-tight">Mailvah.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest">
          <Link href="/features" className="text-slate-400 hover:text-white transition-colors">Features</Link>
          <Link href="/compare" className="text-slate-400 hover:text-white transition-colors">Compare</Link>
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="https://app.mailvah.com/login" className="text-sm font-bold text-slate-300 hover:text-white transition-colors">Log in</a>
          <a href="https://app.mailvah.com/register" className="bg-sky-500 hover:bg-sky-400 text-slate-900 px-6 py-2.5 rounded-xl font-black text-sm transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]">Start for free</a>
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="md:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-[#03050a] flex flex-col items-center justify-center gap-8 pt-20 z-40">
          <Link href="/features" onClick={() => setIsOpen(false)} className="text-2xl font-black text-white">Features</Link>
          <Link href="/compare" onClick={() => setIsOpen(false)} className="text-2xl font-black text-white">Compare</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="text-2xl font-black text-white">Pricing</Link>
          <Link href="/legal" onClick={() => setIsOpen(false)} className="text-2xl font-black text-white">Legal & Trust</Link>
          <div className="flex flex-col gap-4 mt-8 w-64">
            <a href="https://app.mailvah.com/login" className="text-center py-4 rounded-xl border border-white/10 font-bold text-white">Log in</a>
            <a href="https://app.mailvah.com/register" className="text-center py-4 rounded-xl font-black bg-sky-500 text-slate-900">Start for free</a>
          </div>
        </div>
      )}
    </nav>
  );
}
