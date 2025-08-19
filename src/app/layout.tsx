import './global.css';

import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';

export const metadata: Metadata = {
  title: 'React Star Wars App',
  description: 'Application that makes people fun.',
  icons: '../../public/favicon.ico',
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={courierPrime.className}>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
