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
  title: 'Sania Shakil | Environmental Engineer',
  description:
    'Environmental Engineer specializing in sustainable practices, water treatment, and pollution control. Politecnico di Milano graduate working towards a greener future.',
  keywords: [
    'environmental engineer',
    'sustainable development',
    'water treatment',
    'pollution control',
    'Politecnico di Milano',
    'AutoCAD',
    'ETABS',
    'Italy',
  ],
  authors: [{ name: 'Sania Shakil' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Sania Shakil | Environmental Engineer',
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
