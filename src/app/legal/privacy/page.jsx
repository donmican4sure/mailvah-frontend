'use client';
import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-20 px-6 font-sans">
      <div className="max-w-4xl mx-auto relative z-10 text-slate-400 leading-relaxed">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">Privacy Policy</h1>
          <p className="text-sky-400 font-bold mb-12 uppercase tracking-widest text-xs">Last Updated: April 15, 2026</p>
          
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">1. Introduction</h2>
              <p>
                Mailvah ("the Service"), a proprietary technology product owned and operated by <strong>Donmican Technology Ltd</strong> ("the Company," "we," "us," or "our"), is committed to protecting the privacy and security of your data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our outbound security and verification suite.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">2. Information Collection</h2>
              <h3 className="text-white font-bold mb-2">A. Personal Data</h3>
              <p className="mb-4">
                When you register for a Mailvah account, we collect personal identification information, including but not limited to your name, email address, company name, and billing information. This data is essential for account management, service delivery, and compliance with Nigerian and international financial regulations.
              </p>
              <h3 className="text-white font-bold mb-2">B. Lead & Uploaded Data</h3>
              <p>
                During the course of using our verification engine, you may upload CSV or JSON files containing third-party contact information (e.g., email addresses). <strong>Donmican Technology Ltd does not claim ownership of this data.</strong> We act strictly as a Data Processor under the Nigerian Data Protection Act (NDPA) and the General Data Protection Regulation (GDPR).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">3. The Heuristic Decoy Protocol & Data Retention</h2>
              <p className="mb-4">
                Our proprietary verification engine utilizes a "Zero-Retention" architecture. When you submit a lead for verification through our Dallas bare-metal nodes:
              </p>
              <ul className="list-disc ml-6 space-y-2">
                <li>The data is processed in volatile memory (RAM) during the 4-stage heuristic handshake.</li>
                <li>Upon completion of the scan, the verification results are returned to your dashboard or API endpoint.</li>
                <li><strong>We do not store your lead lists in a permanent database.</strong> All uploaded files are purged from our processing servers within 24 hours of completion to ensure maximum data security.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">4. Data Usage & Processing</h2>
              <p>
                We process your data for the following purposes:
                (i) To provide and maintain our Service; 
                (ii) To manage your account and subscription; 
                (iii) To prevent fraudulent use of our infrastructure; 
                (iv) To monitor the health of our global proxy network; 
                (v) To comply with legal obligations and anti-spam regulations (CAN-SPAM Act).
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">5. Third-Party Disclosures</h2>
              <p>
                Donmican Technology Ltd <strong>does not sell, rent, or trade</strong> your personal data or your lead lists to third parties for marketing purposes. We may only disclose data to:
                (a) Third-party service providers (e.g., payment processors like Stripe or Paystack) who assist in our operations; 
                (b) Law enforcement if required by a valid subpoena or court order under the laws of the Federal Republic of Nigeria.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">6. International Data Transfers</h2>
              <p>
                As a global service, your data may be processed on servers located in the United States (Dallas, TX) and other jurisdictions. By using Mailvah, you consent to the transfer of information to countries outside of your country of residence, which may have different data protection rules.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black text-white mb-4 uppercase">7. Your Data Rights</h2>
              <p>
                Under the NDPA and GDPR, you have the right to access, rectify, or erase your personal data stored on our servers. You may also object to the processing of your data or request data portability. To exercise these rights, please contact our Data Protection Officer at <strong>legal@donmican.com</strong>.
              </p>
            </div>
            
            <div className="pt-10 border-t border-white/5">
              <p className="text-xs uppercase tracking-widest">© 2026 Donmican Technology Ltd | Shomolu, Lagos, Nigeria.</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
