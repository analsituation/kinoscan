import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from '@/components/Header/Header'
import '../styles/globals.sass'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Киноскан',
  description: 'In the jungle, the mighty jungle, the lion sleeps tonight. Wee-ooh wim-o-weh. Wee-ooh wim-o-weh.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ru'>
      <body className={inter.className}>
        <Header />
        <main className='md:pb-16'>{children}</main>
      </body>
    </html>
  )
}
