import './globals.css'

export const metadata = {
  title: 'Mailvah | Outbound Security Suite',
  description: 'The ultimate enterprise email verification engine.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
