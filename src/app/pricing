// src/app/pricing/page.jsx
'use client';
import React, { useState } from 'react';
import { Shield, Radar } from 'lucide-react';

export default function PricingPage() {
  const [sliderIndex, setSliderIndex] = useState(0);

  const pricingTiers = [
    { name: 'Starter', price: 29, iCredits: 1500, dCredits: 365 },
    { name: 'Growth', price: 79, iCredits: 5000, dCredits: 1250 },
    { name: 'Scale', price: 149, iCredits: 15000, dCredits: 3750 },
    { name: 'Pro', price: 499, iCredits: 100000, dCredits: 15000 },
    { name: 'Agency', price: 799, iCredits: 200000, dCredits: 30000 }
  ];

  return (
    <div className="py-20 px-6 max-w-5xl mx-auto">
      {/* 1. Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic">Scale Your Engine</h1>
        <p className="text-slate-400">Drag the bar to adjust your monthly vault capacity.</p>
      </div>

      {/* 2. Interactive Slider Card */}
      <div className="bg-[#0a0f1c] border border-sky-500/30 rounded-3xl p-10 mb-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-6xl font-black text-white mb-2">${pricingTiers[sliderIndex].price}<span className="text-lg text-slate-500">/mo</span></div>
            <input 
              type="range" 
              min="0" 
              max="4" 
              value={sliderIndex} 
              onChange={(e) => setSliderIndex(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500 my-8"
            />
            <a href="https://app.mailvah.com/register" className="block text-center w-full py-4 rounded-xl font-black bg-sky-500 text-slate-900 uppercase">
              Deploy {pricingTiers[sliderIndex].name}
            </a>
          </div>
          <div className="bg-[#050810] p-6 rounded-2xl border border-slate-800">
             <div className="flex justify-between mb-4">
                <span className="text-slate-400 font-bold">Integrity Vault</span>
                <span className="text-emerald-400 font-black">{pricingTiers[sliderIndex].iCredits.toLocaleString()}</span>
             </div>
             <div className="flex justify-between">
                <span className="text-slate-400 font-bold">Discovery Vault</span>
                <span className="text-sky-400 font-black">{pricingTiers[sliderIndex].dCredits.toLocaleString()}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
