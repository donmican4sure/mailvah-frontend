import './globals.css';
import Navbar from '@/components/Navbar';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050810] text-slate-300 antialiased selection:bg-sky-500/30">
        <Navbar />
        {/* pt-20 ensures content doesn't hide under the fixed navbar */}
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
