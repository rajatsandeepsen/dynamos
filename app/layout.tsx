"use client"

import AuthButton from '@/components/AuthButton'
import './globals.css'
import "cal-sans";
import Navbar from '@/components/Navbar'

// export const metadata = {
//   title: 'Dynamos',
//   description: '',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col justify-start">
        <Navbar/>
          {children}

          <footer className="w-full mt-auto border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
          <p>
            Built by{' '}
            <a
              href="https://twitter.com/rajatsandeepsen"
              target="_blank"
              className="font-bold hover:underline"
              rel="noreferrer"
            >
              @rajatsandeepsen
            </a>
          </p>
        </footer>
        </main>
      </body>
    </html>
  )
}
