'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function TermsOfService() {
  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto relative z-10 text-slate-400 leading-relaxed">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">Terms of Service</h1>
          <p className="text-sky-400 font-bold mb-12 uppercase tracking-widest text-xs">Effective Date: April 15, 2026</p>
          
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">1. Agreement to Terms</h2>
              <p>
                By accessing or using Mailvah, a product of <strong>Donmican Technology Ltd</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, you are prohibited from using the Service.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">2. Use of Service</h2>
              <p>
                Mailvah provides email verification and B2B data extraction tools. You agree to use the Service only for lawful purposes. You are strictly prohibited from using Mailvah to:
                (a) Generate or facilitate unsolicited bulk commercial email (Spam); 
                (b) Harvest data in violation of privacy laws; 
                (c) Attempt to reverse-engineer our Heuristic Decoy Protocol.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">3. Subscriptions & Credits</h2>
              <p className="mb-4">
                Mailvah operates on a credit-based subscription model. 
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li><strong>Roll-over:</strong> Unused credits roll over to the next billing cycle as long as an active paid subscription is maintained.</li>
                <li><strong>Sandbox:</strong> The $0 Sandbox tier provides 115 credits for testing purposes and is limited to one account per user.</li>
                <li><strong>Refunds:</strong> We offer a <strong>30-Day Money-Back Guarantee</strong>. If you are unsatisfied with the accuracy of our engine, you may request a full refund within 30 days of your initial purchase, provided you have used less than 20% of your monthly credit allocation.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">4. Intellectual Property</h2>
              <p>
                All content, features, and functionality of Mailvah—including the Heuristic Decoy Protocol, the branding, and the Dallas node architecture—are the exclusive property of Donmican Technology Ltd and are protected by Nigerian and international copyright, trademark, and patent laws.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">5. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, Donmican Technology Ltd shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Service. We provide the Service "as is" and do not warrant that the Service will be uninterrupted or error-free.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">6. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>. Any disputes arising from these terms shall be resolved exclusively in the courts of Lagos, Nigeria.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">7. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account immediately, without prior notice, if you breach these Terms of Service or engage in activity that threatens the integrity of our bare-metal infrastructure.
              </p>
            </div>

            <div className="pt-10 border-t border-white/5">
              <p className="text-xs uppercase tracking-widest text-slate-600">Donmican Technology Ltd | RC: [Your RC Number] | Lagos, Nigeria.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
