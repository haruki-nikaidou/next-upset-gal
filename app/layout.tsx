import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '失落小站 - galgame资源站',
  description: 'shinnku\'s galgame site',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
      <Header />
      <div className="min-h-screen pt-20 pb-[7.25rem] box-border">
          {children}
      </div>
      <Footer />
      </body>
    </html>
  )
}
