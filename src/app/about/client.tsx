'use client';

import dynamic from 'next/dynamic';

const About = dynamic(() => import('../../pages/About'), { ssr: false });

export function ClientOnly() {
  return <About />;
}
