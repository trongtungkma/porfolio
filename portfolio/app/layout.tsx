import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Le Trong Tung — Frontend Engineer',
  description:
    'Meet Lê Trọng Tùng, a frontend developer in Hanoi. Explore his Vue.js and TypeScript projects, career history, and AI career assistant.',
  keywords: [
    'Le Trong Tung',
    'Frontend Engineer',
    'Vue.js',
    'React',
    'TypeScript',
    'Hanoi',
  ],
  openGraph: {
    title: 'Le Trong Tung — Frontend Engineer',
    description:
      'Frontend development, selected projects, and the career of Lê Trọng Tùng.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: 'Le Trong Tung — Frontend Engineer',
    description:
      'Frontend development, selected projects, and the career of Lê Trọng Tùng.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
