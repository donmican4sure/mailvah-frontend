// Filepath: src/app/api/verify/route.js
import { NextResponse } from 'next/server';
import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

export async function POST(request) {
  try {
    const { emails } = await request.json();

    if (!emails || !Array.isArray(emails)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const results = await Promise.all(emails.map(async (email) => {
      const domain = email.split('@')[1];
      let status = 'invalid';
      let reason = 'Invalid syntax';

      // 1. Basic Syntax Check
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        try {
          // 2. LIVE NETWORK CHECK: Actually query the global DNS for Mail Servers (MX Records)
          const mxRecords = await resolveMx(domain);
          
          if (mxRecords && mxRecords.length > 0) {
            // Domain has valid mail servers configured!
            status = 'valid';
            reason = 'Mail server found';
            
            // Note: A true Port 25 SMTP handshake requires a dedicated Bare-Metal server 
            // (Cloud providers like Vercel/Netlify block port 25 to prevent spam).
            // For production SMTP pings, you will connect this route to your verification VPS later.
          } else {
            reason = 'No mail server on domain';
          }
        } catch (dnsError) {
          reason = 'Domain does not exist or has no MX records';
        }
      }

      return { email, status, reason };
    }));

    return NextResponse.json({ results });

  } catch (error) {
    console.error("Verification Engine Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
