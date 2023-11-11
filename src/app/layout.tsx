import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio of a russian voice actress',
  openGraph: {
    title: 'Portfolio',
    description: 'Portfolio of a russian voice actress',
    images: [
      {
        url: "/static/openGraphImg.jpg",
        width: 512,
        height: 512,
        alt: 'Portfolio Img.',
      }
    ],
    type: 'website',
  },
  metadataBase: new URL("https://va-portfolio-sigma.vercel.app/"),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
