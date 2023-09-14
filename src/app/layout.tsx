import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import '../styles/globals.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kinoscan',
  description: 'In the jungle, the mighty jungle, the lion sleeps tonight. Wee-ooh wim-o-weh. Wee-ooh wim-o-weh.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
