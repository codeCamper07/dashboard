import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'H-School',
  description: 'Next js app for School Activities',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={`inter.className`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange>
            <main>
              {children}
              <Toaster theme={ThemeProvider.props} />
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
