import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './redux/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Shopping for Men Needs At Single Click',
  description: 'Backsoon is a one Online Big Shop for All Your Fashion Needs',
  // viewport: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
  
}

export default function RootLayout({ children }) {
  

  return (
    <html lang="en">

      <body className={inter.className}>
      <Providers> {children}</Providers> 
      </body>

    </html>
  )
}
