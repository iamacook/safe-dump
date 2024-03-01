import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import manifest from '@/public/manifest.json';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: manifest.name,
  description: manifest.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
