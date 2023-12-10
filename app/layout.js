import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Shopping for Men Needs At Single Click',
  description: 'Backsoon is a one Online Big Shop for All Your Fashion Needs',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">

      <body className={inter.className}>

      {children}
      
      </body>

    </html>
  )
}
