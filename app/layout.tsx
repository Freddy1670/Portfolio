import './globals.css';
import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://fredrickomoniyi.com'),
  title: 'Fredrick Omoniyi — Technology That Moves Business',
  description: 'Software engineer, backend architect, and technology leader building secure systems that power modern businesses.',
  openGraph: {
    title: 'Fredrick Omoniyi — Technology That Moves Business',
    description: 'Software engineer, backend architect, and technology leader.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.className}>{children}</body>
    </html>
  );
}
