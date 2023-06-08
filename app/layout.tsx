import './globals.css'
import { Inter } from 'next/font/google'
import ToasterContext from './contexts/ToasterContext'
import AuthContext from './contexts/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messager Clone',
  description: 'Messager Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
        <ToasterContext/>
        {children}
        </AuthContext>
        </body>
    </html>
  )
}
