import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'PropMetrics — Inversión Inmobiliaria Tokenizada',
  description: 'Analiza, simula y optimiza tu portfolio de inversión inmobiliaria tokenizada con IA.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#10b981', // emerald-500 to match the theme
          colorBackground: '#18181b', // zinc-900 or similar dark
          colorText: '#f4f4f5',
          colorInputBackground: '#27272a',
          colorInputText: '#f4f4f5',
        },
        elements: {
          card: 'bg-card border border-border shadow-xl',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'border-border bg-background hover:bg-muted text-foreground',
          socialButtonsBlockButtonText: 'text-foreground font-medium',
          dividerLine: 'bg-border',
          dividerText: 'text-muted-foreground',
          formFieldLabel: 'text-foreground',
          formFieldInput: 'bg-background border-border text-foreground focus:ring-primary',
          footerActionText: 'text-muted-foreground',
          footerActionLink: 'text-primary hover:text-primary/90',
        }
      }}
    >
      <html lang="es" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}