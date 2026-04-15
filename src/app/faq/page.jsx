'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Shield, Zap, CreditCard, Database } from 'lucide-react';

const faqCategories = [
  {
    category: "The Core Engine (General)",
    icon: <Zap className="w-5 h-5 text-sky-400" />,
    questions: [
      { q: "What exactly is Mailvah?", a: "Mailvah is an enterprise-grade Outbound Security Suite. We provide real-time email verification, B2B lead sourcing, and domain monitoring to ensure your cold outreach never bounces and always lands in the primary inbox." },
      { q: "How is Mailvah different from Apollo or ZoomInfo?", a: "Legacy tools rely on cached databases that decay by 30% annually. Mailvah uses a live Heuristic Decoy Protocol to verify data in real-time at the exact millisecond you need it, ensuring 0% data decay." },
      { q: "What is the Sandbox plan?", a: "The Sandbox is our forever-free tier. You get 115 Verification Credits to test our API, UI, and infrastructure with zero financial commitment." },
      { q: "Do I need a credit card to sign up?", a: "No. You can deploy the free Sandbox and access your 115 credits immediately without entering any payment information." },
      { q: "Is Mailvah a CRM?", a: "No. We do not force you to pay for bloated CRM features. We are a dedicated outbound security and verification layer that integrates into your existing stack." },
      { q: "What is the 'Zero-Bounce' guarantee?", a: "Because we use a 4-stage SMTP handshake with decoy traffic, we guarantee a bounce rate of under 1% for emails verified by our system as 'Safe to Send'." },
      { q: "Can I use Mailvah on my phone?", a: "Yes. The Mailvah dashboard is fully responsive, allowing you to monitor your domains and trigger verifications directly from your mobile device." },
      { q: "Who owns Mailvah?", a: "Mailvah is a proprietary product built, owned, and operated by Donmican Technology Ltd, headquartered in Lagos, Nigeria." }
    ]
  },
  {
    category: "Credits & Billing",
    icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
    questions: [
      { q: "How does '100% Infinite Credit Rollover' work?", a: "Unlike competitors who steal your unused credits at the end of the month, Mailvah lets you keep what you pay for. As long as your subscription is active, your unused credits roll over forever." },
      { q: "Do you charge credits for duplicate emails?", a: "Never. Our engine automatically deduplicates your lists before processing, ensuring you only pay for unique verifications." },
      { q: "How does the 30-Day Money-Back Guarantee work?", a: "If you upgrade to a paid plan and find our accuracy doesn't meet your standards, contact support within 30 days (having used less than 20% of your credits) for a full, no-questions-asked refund." },
      { q: "What happens if I run out of credits mid-month?", a: "Your automated verifications will pause. You can either upgrade your tier or visit 'The Refill Station' to instantly buy a top-up pack (like the Scout or Hunter pack) without changing your base plan." },
      { q: "Can I upgrade or downgrade anytime?", a: "Yes. Billing is prorated automatically. You can scale up for a big campaign and scale down the next month directly from your dashboard." },
      { q: "Are there discounts for annual plans?", a: "Yes. Selecting annual billing at checkout automatically applies a 20% discount across all tiers." },
      { q: "Do I lose my leads if I cancel my subscription?", a: "No. You can still log in and export your cleaned lists even if your active subscription expires." },
      { q: "Are there any hidden setup fees?", a: "Zero. You only pay the flat monthly or annual fee listed on our pricing page." }
    ]
  },
  {
    category: "Infrastructure & Technical",
    icon: <Database className="w-5 h-5 text-indigo-400" />,
    questions: [
      { q: "What is the Heuristic Decoy Protocol?", a: "It is our proprietary verification engine. Instead of just pinging a server, we initiate a deep SMTP handshake using decoy payloads to bypass aggressive corporate firewalls and get absolute verification." },
      { q: "Why do you use Dallas bare-metal nodes?", a: "Shared cloud environments (like standard AWS) often have shared IPs that get rate-limited by spam filters. We own bare-metal servers in Dallas to control our IP reputation and ensure blazing-fast compute speeds." },
      { q: "How fast is the API?", a: "Our API hub is designed for sub-200ms response times, making it perfect for real-time form validation on your own websites." },
      { q: "What is the maximum CSV upload size?", a: "Our bulk processing engine can handle up to 100,000 rows in a single CSV upload." },
      { q: "Do you support Zapier and Make.com?", a: "Yes. From the Scale tier ($149/mo) and up, you get full webhook access to trigger automations across Zapier, Make, or custom endpoints." },
      { q: "What are the API rate limits?", a: "Rate limits scale with your plan. Starter accounts allow 10 requests/second, while Enterprise plans allow up to 1,000 requests/second." },
      { q: "Are there SDKs available?", a: "We currently provide comprehensive REST API documentation. Official Node.js and Python SDKs are in active development." },
      { q: "How does the Threat Analyzer work?", a: "You paste your email copy, and our engine scans it against a database of thousands of spam-trigger words and formatting errors that cause Mimecast and Google filters to flag your message." }
    ]
  },
  {
    category: "Deliverability & Inbox Placement",
    icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
    questions: [
      { q: "Can you verify 'Catch-All' domains?", a: "Yes. Catch-all domains are notoriously difficult, but our Heuristic engine accurately resolves the majority of catch-all configurations that other tools mark as 'Unknown'." },
      { q: "What is Domain Armor?", a: "It is an automated 24/7 tracking system that monitors your sending domains against over 100 global spam blacklists." },
      { q: "How quickly will I be notified if my domain is blacklisted?", a: "Domain Armor pings the blacklists continuously. You will receive an email/Slack alert within minutes of your domain hitting a major trap." },
      { q: "Will using Mailvah prevent Google Workspace bans?", a: "Yes. Google bans accounts with high bounce rates (over 3-5%). By keeping your bounce rate under 1%, Mailvah protects your domain reputation and prevents suspension." },
      { q: "What is Inbox Placement testing?", a: "Available on Growth tiers and above, this feature lets you send a test email to our network of seed accounts to see exactly which tab (Primary, Promotions, or Spam) your email lands in." },
      { q: "Do you provide Dedicated IPs?", a: "Yes, on our Pro ($499) and Agency ($799) tiers, your scans route through private, dedicated IPs to prevent any shared-pool rate limiting." },
      { q: "Does Mailvah fix my SPF/DKIM/DMARC records?", a: "Our DNS Armor protocol continuously scans your records and will alert you to misconfigurations, providing the exact DNS values you need to fix them." },
      { q: "Why do B2B databases decay by 30%?", a: "People get promoted, fired, or change companies. A database scraped in January is heavily outdated by December. That's why real-time verification is mandatory." }
    ]
  },
  {
    category: "Data Privacy & Security",
    icon: <Shield className="w-5 h-5 text-rose-400" />,
    questions: [
      { q: "Do you store my uploaded CSV files?", a: "No. We operate on a 'Zero-Retention' architecture. Uploaded CSVs are processed in volatile memory and purged from our processing servers within 24 hours." },
      { q: "Are you GDPR and NDPA compliant?", a: "Absolutely. We strictly adhere to the General Data Protection Regulation (GDPR) and the Nigerian Data Protection Act (NDPA) as a secure Data Processor." },
      { q: "Do you sell my lead data to competitors?", a: "Never. Your data is your property. We do not aggregate, sell, or rent your uploaded lists to any third parties." },
      { q: "Is my payment information secure?", a: "Yes. We use industry-leading providers like Stripe to process payments. We do not store your credit card information on our servers." },
      { q: "Where is the company headquartered?", a: "Donmican Technology Ltd operates globally, with core backend architecture in Dallas, USA, and corporate headquarters in Lagos, Nigeria." },
      { q: "How do I request full account deletion?", a: "You can permanently delete your account and all associated data with one click in the 'Security' tab of your dashboard settings." },
      { q: "Does the 'Lead Finder' scrape illegal data?", a: "No. Our Lead Finder only accesses publicly available, B2B professional data sources, ensuring compliance with global anti-spam laws." },
      { q: "Do you offer Custom Enterprise SLAs?", a: "Yes. For our Agency tier and custom enterprise clients, we provide financially backed uptime and deliverability guarantees." }
    ]
  }
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl mb-3 overflow-hidden transition-colors hover:bg-white/[0.04]">
      <button 
        className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
        onClick={onClick}
      >
        <span className="font-bold text-white pr-8">{faq.q}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-sky-500 shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-slate-400 text-sm leading-relaxed border-t border-white/5 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState("0-0"); // First question open by default

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="relative min-h-screen bg-[#03050a] pt-32 pb-24 px-4 md:px-6 font-sans">
      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-[800px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-[10px] font-black text-sky-400 uppercase tracking-widest mb-6">
            KNOWLEDGE BASE
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about the Mailvah infrastructure, billing logic, and outbound security.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.2 }}>
          {faqCategories.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-12">
              <div className="flex items-center gap-3 mb-6 pl-2">
                {section.icon}
                <h2 className="text-xl font-black text-white uppercase tracking-widest">{section.category}</h2>
              </div>
              <div>
                {section.questions.map((faq, qIndex) => {
                  const currentIndex = `${sectionIndex}-${qIndex}`;
                  return (
                    <FAQItem 
                      key={qIndex} 
                      faq={faq} 
                      isOpen={openIndex === currentIndex} 
                      onClick={() => setOpenIndex(openIndex === currentIndex ? null : currentIndex)} 
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>

        {/* STILL HAVE QUESTIONS CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-20 bg-gradient-to-br from-sky-900/20 to-indigo-900/10 border border-sky-500/20 rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-black text-white mb-4">Still have questions?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">Our engineering and deliverability team is available 24/7 to help you optimize your outbound pipeline.</p>
          <a href="mailto:support@mailvah.com" className="inline-flex items-center justify-center px-8 py-4 font-black text-slate-900 transition-all duration-200 bg-sky-500 rounded-xl hover:bg-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.3)]">
            Contact Support
          </a>
        </motion.div>

      </div>
    </div>
  );
}
