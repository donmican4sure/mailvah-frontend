'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Radar, Zap, CheckCircle2, MailCheck, Server, Activity, ShieldCheck } from 'lucide-react';

export default function PremiumPricing() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isAnnual, setIsAnnual] = useState(false);

  // Dynamic Features added to each tier
  const pricingTiers = [
    { name: 'Starter', price: 29, iCredits: 1500, dCredits: 365, 
      features: ['100% Infinite Credit Rollover', 'Bulk CSV Verification Engine', 'Standard REST API Access', 'Basic Email Support'] },
    { name: 'Growth', price: 79, iCredits: 5000, dCredits: 1250, 
      features: ['Everything in Starter', 'Global Proxy Network Extractor', 'HubSpot & Salesforce Purge', 'Priority Support Queue'] },
    { name: 'Scale', price: 149, iCredits: 15000, dCredits: 3750, 
      features: ['Everything in Growth', 'Zapier & Make.com Webhooks', 'DNS Armor Protocol', 'Sub-200ms API Hub Access'] },
    { name: 'Pro', price: 499, iCredits: 100000, dCredits: 15000, 
      features: ['Everything in Scale', 'Dedicated IP Infrastructure', 'Threat Analyzer API', 'Slack Connect Support'] },
    { name: 'Agency', price: 799, iCredits: 200000, dCredits: 30000, 
      features: ['Everything in Pro', 'Dedicated Account Manager', 'Custom Enterprise SLA', 'Unlimited Team Seats'] }
  ];

  const currentPrice = isAnnual 
    ? Math.floor(pricingTiers[sliderIndex].price * 0.8) 
    : pricingTiers[sliderIndex].price;

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] py-24 md:py-32 px-6 overflow-hidden font-sans">
      <div className="absolute top-[10%] left-[50%] translate-x-[-50%] w-[800px] h-[400px] bg-sky-600/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-black text-emerald-400 uppercase tracking-widest mb-6">
            <MailCheck className="w-4 h-4" /> Inbox Guarantee & Near-Zero Bounces
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Fair pricing. Zero waste.</h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Start free, upgrade when you need to. We use 4x the compute power per scan, ensuring unmatched accuracy.
          </p>

          {/* MONTHLY / ANNUAL TOGGLE */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold transition-colors ${!isAnnual ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button onClick={() => setIsAnnual(!isAnnual)} className="relative w-16 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center px-1 transition-colors hover:bg-slate-700">
              <motion.div animate={{ x: isAnnual ? 32 : 0 }} transition={{ type: "spring", stiffness: 500, damping: 30 }} className="w-6 h-6 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"/>
            </button>
            <span className={`text-sm font-bold transition-colors flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-slate-500'}`}>
              Annual <span className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* PRICING GRID */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* THE FREE SANDBOX CARD */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col hover:bg-white/[0.04] transition-colors h-full">
            <div className="mb-8">
              <div className="text-sky-400 text-xs font-black uppercase tracking-widest mb-4">Forever Free</div>
              <h3 className="text-3xl md:text-4xl font-black text-white mb-2">Sandbox</h3>
              <div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tighter">$0<span className="text-xl md:text-2xl text-slate-500 font-medium pb-2">/mo</span></div>
            </div>
            
            <div className="flex-1 space-y-4 mb-8">
              <div className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium text-sm md:text-base">150 Verification Credits</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium text-sm md:text-base">Single Domain Search</span>
              </div>
              <div className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span className="font-medium text-sm md:text-base">Dual-Threat Analyzer <span className="text-slate-500 text-xs md:text-sm block font-normal">Test payload & spam triggers</span></span>
              </div>
            </div>

            <a href="https://app.mailvah.com/register" className="block text-center w-full py-4 rounded-xl font-bold bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/10">
              Deploy Sandbox
            </a>
          </motion.div>

          {/* THE DYNAMIC SLIDER CARD (TAKES UP 2 COLUMNS) */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2 bg-gradient-to-br from-[#0a0f1c] to-[#050810] backdrop-blur-2xl border border-sky-500/30 shadow-[0_0_50px_rgba(56,189,248,0.05)] rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="grid md:grid-cols-2 gap-10 items-start relative z-10">
              {/* Left: Slider & Price */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-sky-500/10 text-sky-400 border border-sky-500/20 px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all">
                    {pricingTiers[sliderIndex].name} Network
                  </span>
                </div>
                
                <div className="text-6xl md:text-7xl font-black text-white mb-2 tracking-tighter flex items-end gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span key={currentPrice} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                      ${currentPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-xl md:text-2xl text-slate-500 font-medium pb-2">/mo</span>
                </div>
                {isAnnual && <p className="text-emerald-400 text-sm font-bold mb-6">Billed annually. 20% discount applied.</p>}
                {!isAnnual && <p className="text-slate-400 text-sm mb-6">Dedicated processing on Dallas bare-metal nodes.</p>}

                {/* The Draggable Bar */}
                <div className="mb-10 relative">
                  <div className="flex justify-between text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">
                    <span>Starter</span>
                    <span>Agency</span>
                  </div>
                  <input type="range" min="0" max={pricingTiers.length - 1} step="1" value={sliderIndex} onChange={(e) => setSliderIndex(parseInt(e.target.value))} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 hover:accent-sky-400 transition-all relative z-10" />
                </div>

                <a href="https://app.mailvah.com/register" className="block text-center w-full py-4 rounded-xl font-black bg-sky-500 text-slate-900 hover:bg-sky-400 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(56,189,248,0.3)] uppercase tracking-wide">
                  Deploy {pricingTiers[sliderIndex].name}
                </a>
              </div>

              {/* Right: Dynamic Features */}
              <div className="flex flex-col h-full">
                <div className="bg-black/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 mb-6">
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 font-bold flex items-center gap-2 text-sm"><Shield className="w-4 h-4 text-emerald-400"/> Integrity Vault</span>
                      <motion.span key={pricingTiers[sliderIndex].iCredits} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 font-black text-lg md:text-xl">
                        {pricingTiers[sliderIndex].iCredits.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-slate-300 font-bold flex items-center gap-2 text-sm"><Radar className="w-4 h-4 text-sky-400"/> Discovery Vault</span>
                      <motion.span key={pricingTiers[sliderIndex].dCredits} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sky-400 font-black text-lg md:text-xl">
                        {pricingTiers[sliderIndex].dCredits.toLocaleString()}
                      </motion.span>
                    </div>
                  </div>
                </div>

                {/* DYNAMIC FEATURE LIST based on slider */}
                <div className="space-y-3 px-2">
                  <AnimatePresence mode="wait">
                    <motion.div key={sliderIndex} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }} className="space-y-3">
                      {pricingTiers[sliderIndex].features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 ${i === 0 ? 'text-slate-500' : i === pricingTiers[sliderIndex].features.length - 1 ? 'text-indigo-400' : 'text-sky-400'}`} />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 30-DAY MONEY BACK GUARANTEE BADGE */}
        <motion.div variants={fadeUp} className="flex justify-center mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <span className="text-amber-400 font-bold tracking-wide uppercase text-sm">30-Day Money-Back Guarantee</span>
          </div>
        </motion.div>

        {/* REFILL STATION */}
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
                  <a href="https://app.mailvah.com/register" className="block text-center w-full py-3 rounded-xl font-bold bg-white/5 text-white hover:bg-white/10 transition-colors border border-white/5">Add to Vault</a>
                </motion.div>
              ))}
           </div>
        </motion.div>
      </div>
    </div>
  );
}
