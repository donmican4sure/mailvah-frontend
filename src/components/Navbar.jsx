import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-[#050810]/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Shield className="w-8 h-8 text-sky-500 group-hover:rotate-12 transition-transform" />
          <span className="text-white font-black text-xl tracking-tight">Mailvah</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide uppercase">
          <Link href="/compare" className="text-slate-400 hover:text-white transition-colors">Compare</Link>
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://app.mailvah.com" className="text-sm font-bold text-slate-400 hover:text-white">Log in</a>
          <a href="https://app.mailvah.com/register" className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-5 py-2.5 rounded-lg text-sm font-black transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)]">
            Start Verifying
          </a>
        </div>
      </div>
    </nav>
  );
}
