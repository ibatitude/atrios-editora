import type { Metadata } from 'next'
import { Cinzel, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, siteUrl } from '@/lib/seo'
import './globals.css'

// Auto-hospedadas no build: elimina o CSS render-blocking de fonts.googleapis.com
// e os dois preconnect que vinham com ele. `display: swap` evita texto invisível.
const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: `${SITE_NAME} | ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'pt_BR',
    title: `${SITE_NAME} | Livros que carregam propósito`,
    description: SITE_DESCRIPTION,
    images: [{ url: '/assets/og-default.png', width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: { card: 'summary_large_image' },
  // Endereços temporários (github.io de projeto) não devem ser indexados: o que
  // o Google indexar aqui vira URL abandonada quando o domínio próprio entrar.
  ...(process.env.NEXT_PUBLIC_NOINDEX ? { robots: { index: false, follow: false } } : {}),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${cinzel.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#0F2C2C] font-sans antialiased selection:bg-[#0F2C2C] selection:text-[#FDFBF7]">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
