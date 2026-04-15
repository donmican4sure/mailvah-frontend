import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Mailvah | Unbreakable Deliverability & Outbound Security',
  description: 'Proprietary bare-metal Heuristic Decoy engine guaranteeing near-zero bounce rates.',
  openGraph: {
    title: 'Mailvah | 100% Verified B2B Leads',
    description: 'Scale your outbound pipeline with absolute certainty.',
    url: 'https://mailvah.com',
    siteName: 'Mailvah',
    images: [{ url: 'https://mailvah.com/og-image.jpg', width: 1200, height: 630 }],
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
