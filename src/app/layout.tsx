import type { Metadata } from 'next'
import { Preahvihear } from 'next/font/google'
import './globals.css'

const preahvihear = Preahvihear({
  subsets: ['latin'],
  weight: ["400"],
})


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
      <body className={preahvihear.className}>{children}</body>
    </html>
  )
}
