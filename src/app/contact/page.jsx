'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-20 px-6 overflow-hidden font-sans">
      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[1000px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-20">
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase">Get in touch.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium">
            Have a question about our bare-metal infrastructure or need a custom enterprise plan? We're here.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* CONTACT INFO */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/[0.04] transition-all">
              <div className="flex items-start gap-6">
                <div className="bg-sky-500/10 p-4 rounded-2xl border border-sky-500/20">
                  <Mail className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Email Support</h3>
                  <p className="text-slate-400 mb-4">Our engineering team monitors this 24/7.</p>
                  <a href="mailto:support@mailvah.com" className="text-sky-400 font-bold text-lg hover:underline">support@mailvah.com</a>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/[0.04] transition-all">
              <div className="flex items-start gap-6">
                <div className="bg-indigo-500/10 p-4 rounded-2xl border border-indigo-500/20">
                  <MapPin className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-black text-xl mb-2 uppercase tracking-tight">Headquarters</h3>
                  <p className="text-slate-400">
                    Donmican Technology Ltd<br />
                    Lagos, Nigeria
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QUICK FORM */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
            <form className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors" placeholder="Olorunleke Ogundele" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
                <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors" placeholder="name@company.com" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Message</label>
                <textarea rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-sky-500 transition-colors" placeholder="How can we help?"></textarea>
              </div>
              <button className="w-full py-4 rounded-xl bg-sky-500 text-slate-950 font-black text-sm uppercase tracking-widest hover:bg-sky-400 transition-all shadow-[0_0_30px_rgba(56,189,248,0.3)]">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
