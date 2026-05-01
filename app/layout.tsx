import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-clash',
  display: 'swap',
});

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kerim Girgin | Civil Engineer',
  description:
    'Civil Engineer specializing in structural design, reinforced concrete, and construction management. ITU graduate building infrastructure in Turkey.',
  keywords: [
    'civil engineer',
    'structural engineering',
    'reinforced concrete',
    'construction',
    'ITU',
    'AutoCAD',
    'ETABS',
    'Turkey',
  ],
  authors: [{ name: 'Kerim Girgin' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Kerim Girgin | Civil Engineer',
    description: 'Building infrastructure that stands the test of time.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body>
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
