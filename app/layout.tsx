import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const notoSans = Noto_Sans({ variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://darda-resto-3eiv.vercel.app'),
  title: {
    default: "Darda Resto | Restaurant Comorien à Moroni - Cuisine Authentique des Comores",
    template: "%s | Darda Resto - Restaurant Comorien Moroni"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  description: "Restaurant traditionnel comorien à Moroni, Union des Comores. Découvrez nos plats authentiques, notre menu du jour et réservez votre table. Cuisine locale avec produits frais, ambiance chaleureuse et service exceptionnel.",
  keywords: [
    "restaurant Moroni",
    "restaurant Comores",
    "cuisine comorienne",
    "restaurant traditionnel Moroni",
    "plats comoriens",
    "gastronomie Comores",
    "Darda Resto",
    "restaurant authentique Moroni",
    "cuisine locale Comores",
    "réservation restaurant Moroni",
    "menu comorien",
    "restaurant Union des Comores",
    "meilleur restaurant Moroni",
    "spécialités comoriennes"
  ],
  authors: [{ name: "Darda Resto" }],
  creator: "Darda Resto",
  publisher: "Darda Resto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_KM',
    url: 'https://darda-resto-3eiv.vercel.app',
    siteName: 'Darda Resto',
    title: 'Darda Resto | Restaurant Comorien Authentique à Moroni',
    description: 'Restaurant traditionnel comorien à Moroni. Cuisine authentique, produits frais et ambiance chaleureuse. Réservez votre table dès maintenant.',
    images: [
      {
        url: '/images/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Darda Resto - Restaurant Comorien à Moroni',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Darda Resto | Restaurant Comorien à Moroni',
    description: 'Découvrez la cuisine authentique des Comores à Moroni. Réservez votre table.',
    images: ['/images/hero.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://darda-resto-3eiv.vercel.app',
  },
  category: 'restaurant',
  classification: 'Restaurant, Cuisine Comorienne, Gastronomie',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${notoSans.variable} ${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <Toaster richColors position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
