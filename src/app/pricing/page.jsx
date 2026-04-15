'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radar, Zap, CheckCircle2 } from 'lucide-react';

export default function PremiumPricing() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const pricingTiers = [
    { name: 'Starter', price: 29, iCredits: 1500, dCredits: 365 },
    { name: 'Growth', price: 79, iCredits: 5000, dCredits: 1250 },
    { name: 'Scale', price: 149, iCredits: 15000, dCredits: 3750 },
    { name: 'Pro', price: 499, iCredits: 100000, dCredits: 15000 },
    { name: 'Agency', price: 799, iCredits: 200000, dCredits: 30000 }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-32 px-6 overflow-hidden font-sans">
      {/* BACKGROUND GLOWS */}
      <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[800px] h-[400px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">
            <CheckCircle2 className="w-4 h-4" /> 100% Credit Rollover
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight">Scale Your Engine.</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Drag the slider to adjust your bare-metal processing power. Hard limits on extraction, massive volume for verification.
          </p>
        </motion.div>

        {/* INTERACTIVE GLASS SLIDER CARD */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(56,189,248,0.05)] rounded-[3rem] p-8 md:p-14 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Side: Slider & Price */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest">
                  {pricingTiers[sliderIndex].name} Tier
                </span>
              </div>
              
              <div className="text-7xl font-black text-white mb-2 tracking-tighter flex items-end gap-2">
                ${pricingTiers[sliderIndex].price}
                <span className="text-2xl text-slate-500 font-medium pb-2">/mo</span>
              </div>
              <p className="text-slate-400 text-sm mb-12">Dedicated processing on our Dallas, TX bare-metal nodes.</p>

              {/* The Draggable Bar */}
              <div className="mb-10 relative">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                  <span>Starter</span>
                  <span>Agency</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max={pricingTiers.length - 1} 
                  step="1" 
                  value={sliderIndex} 
                  onChange={(e) => setSliderIndex(parseInt(e.target.value))} 
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 transition-all shadow-[0_0_20px_rgba(56,189,248,0.5)] relative z-10"
                />
              </div>

              <a href="https://app.mailvah.com/register" className="block text-center w-full py-4 rounded-xl font-black bg-sky-500 text-slate-900 hover:bg-sky-400 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(56,189,248,0.3)] uppercase tracking-wide">
                Deploy {pricingTiers[sliderIndex].name} Engine
              </a>
            </div>

            {/* Right Side: Dynamic Feature List */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-[2rem] border border-white/5">
              <h4 className="text-white font-bold mb-8 text-lg border-b border-white/10 pb-4">Monthly Vault Allocations</h4>
              
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-bold flex items-center gap-3">
                    <Shield className="w-6 h-6 text-emerald-400"/> Integrity Credits
                  </span>
                  <motion.span 
                    key={pricingTiers[sliderIndex].iCredits}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 font-black text-3xl tracking-tight"
                  >
                    {pricingTiers[sliderIndex].iCredits.toLocaleString()}
                  </motion.span>
                </div>
                <p className="text-sm text-slate-500 ml-9">For deep-scanning and washing existing lists.</p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-slate-300 font-bold flex items-center gap-3">
                    <Radar className="w-6 h-6 text-sky-400"/> Discovery Credits
                  </span>
                  <motion.span 
                    key={pricingTiers[sliderIndex].dCredits}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sky-400 font-black text-3xl tracking-tight"
                  >
                    {pricingTiers[sliderIndex].dCredits.toLocaleString()}
                  </motion.span>
                </div>
                <p className="text-sm text-slate-500 ml-9">For live extraction of fresh B2B targets.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* REFILL STATION (Glassmorphism Cards) */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
           <div className="text-center mb-10">
             <h3 className="text-3xl font-black text-white mb-4">The Refill Station</h3>
             <p className="text-slate-400 max-w-xl mx-auto">Burned through your Discovery limits? Don't upgrade your whole plan. Instantly top up your vault right from the dashboard.</p>
           </div>

           <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Scout Pack', price: 49, credits: '1,225', color: 'text-sky-400', border: 'hover:border-sky-500/50' },
                { name: 'Hunter Pack', price: 149, credits: '3,750', color: 'text-indigo-400', border: 'border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.1)]' },
                { name: 'Commander Pack', price: 399, credits: '10,000', color: 'text-emerald-400', border: 'hover:border-emerald-500/50' }
              ].map((pack, i) => (
                <motion.div key={i} variants={fadeUp} className={`bg-white/[0.02] backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2 ${pack.border}`}>
                  <div className="text-white font-bold mb-2 flex items-center gap-2"><Zap className={`w-4 h-4 ${pack.color}`} /> {pack.name}</div>
                  <div className="text-4xl font-black text-white mb-6 tracking-tight">${pack.price}</div>
                  <div className="text-sm text-slate-400 mb-8">Instantly adds <span className={`${pack.color} font-bold`}>+{pack.credits}</span> Discovery Credits.</div>
                  <a href="https://app.mailvah.com/register" className="block text-center w-full py-3 rounded-xl font-bold bg-white/5 text-white hover:bg-white/10 transition-colors">Add to Vault</a>
                </motion.div>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
