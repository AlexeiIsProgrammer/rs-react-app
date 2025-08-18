import '../index.css';

import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';

import NotFound from '#pages/NotFound';

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={courierPrime.className}>
      <body>
        <NotFound />
      </body>
    </html>
  );
}
