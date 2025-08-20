import './global.css';

import type { Metadata } from 'next';
import { Courier_Prime } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'React Star Wars App',
  description: 'Application that makes people fun.',
  icons: '../../public/favicon.ico',
};

const courierPrime = Courier_Prime({
  weight: '400',
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={courierPrime.className}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
