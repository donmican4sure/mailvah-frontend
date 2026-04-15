import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// SEO METADATA (The Social Media Billboard)
export const metadata = {
  title: 'Mailvah | Unbreakable Deliverability & Outbound Security',
  description: 'Stop paying for dead databases. Mailvah uses a proprietary bare-metal Heuristic Decoy engine to guarantee near-zero bounce rates.',
  openGraph: {
    title: 'Mailvah | 100% Verified B2B Leads',
    description: 'Scale your outbound pipeline with absolute certainty. Sub-second API, bare-metal nodes, and 0% decay.',
    url: 'https://mailvah.com',
    siteName: 'Mailvah',
    images: [
      {
        url: 'https://mailvah.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#03050a] text-white selection:bg-sky-500/30">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
