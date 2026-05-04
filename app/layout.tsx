import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { esES } from '@clerk/localizations'
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
      localization={esES}
      afterSignOutUrl="/"
      afterSignInUrl="/portfolio"
      afterSignUpUrl="/portfolio"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#10b981',
          colorBackground: '#0f1117',
          colorText: '#f4f4f5',
          colorTextSecondary: '#a1a1aa',
          colorInputBackground: '#1c1c24',
          colorInputText: '#f4f4f5',
          borderRadius: '0.75rem',
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          // Card principal
          card: 'shadow-2xl border border-white/5 bg-[#0f1117]',
          // Header
          headerTitle: 'text-white text-xl font-semibold tracking-tight',
          headerSubtitle: 'text-zinc-400 text-sm',
          // Logo / branding
          logoBox: 'hidden',
          // Botón Google
          socialButtonsBlockButton:
            'border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-colors duration-150',
          socialButtonsBlockButtonText: 'text-white font-medium',
          socialButtonsBlockButtonArrow: 'text-zinc-400',
          // Separador
          dividerLine: 'bg-white/10',
          dividerText: 'text-zinc-500 text-xs',
          // Labels de campos
          formFieldLabel: 'text-zinc-300 text-sm font-medium',
          // Inputs
          formFieldInput:
            'bg-[#1c1c24] border border-white/10 text-white placeholder:text-zinc-600 focus:border-emerald-500 focus:ring-0 transition-colors',
          // Botón principal "Continuar"
          formButtonPrimary:
            'bg-emerald-500 hover:bg-emerald-400 text-white font-semibold tracking-wide transition-colors duration-150 shadow-lg shadow-emerald-500/20',
          // Links del footer
          footerActionText: 'text-zinc-500',
          footerActionLink: 'text-emerald-400 hover:text-emerald-300 font-medium',
          // Footer "Secured by Clerk"
          footer: 'opacity-50',
          // Mensajes de error
          formFieldErrorText: 'text-red-400 text-xs',
          alertText: 'text-red-400 text-sm',
          // OTP / verification
          otpCodeFieldInput: 'border-white/10 bg-[#1c1c24] text-white',
        },
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