import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore and Manage Posts with Ease | Posts Manager - Your Ultimate Solution',
  description: 'Discover a powerful Posts Manager that simplifies post exploration and management. Save and bookmark posts effortlessly, search by title, and enjoy a seamless browsing experience. Dive into a world of curated content with Posts Manager – your go-to solution for efficient post navigation.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
