import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Mailvah',
  description: 'Outbound Security',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#03050a] text-white">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
