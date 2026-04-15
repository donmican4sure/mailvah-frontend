// src/app/legal/page.jsx
export default function LegalPage() {
  return (
    <div className="py-20 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-black text-white mb-10 uppercase italic">Legal & Privacy Center</h1>
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-sky-500 mb-4">Privacy Policy</h2>
          <p className="text-slate-400 leading-relaxed">
            At Mailvah, we respect your data. Our proprietary engine processes verifications in real-time. 
            We do not sell, rent, or trade your uploaded CSV lists to any third parties. 
            All processing is performed on our dedicated Dallas nodes.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-sky-500 mb-4">Data Security</h2>
          <p className="text-slate-400 leading-relaxed">
            We use enterprise-grade encryption for all data in transit. 
            Since our Command Center at app.mailvah.com is isolated from our marketing site, 
            your account credentials remain protected behind our secure backend firewall.
          </p>
        </section>
      </div>
    </div>
  );
}
