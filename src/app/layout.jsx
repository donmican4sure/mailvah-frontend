// src/app/layout.jsx
import './globals.css';
import Navbar from '../components/Navbar'; // We will create this next

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#050810] text-slate-300 antialiased selection:bg-sky-500/30">
        <Navbar />
        {/* The pt-20 adds top padding so content isn't hidden by the fixed Navbar */}
        <main className="pt-20 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
