import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import CartProvider from './context/CartProvider'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'OPENCART.COM',
  description: 'opencart.com - things anything you want',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {





  return (
 
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="photo1" type="image/x-icon" />
      </head>
      <body className={inter.className}>


        <CartProvider>


        {children}


        </CartProvider>

        <Footer/>
        </body>
    </html>
  )
}
