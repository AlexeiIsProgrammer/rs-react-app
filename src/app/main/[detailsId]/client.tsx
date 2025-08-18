'use client';

import dynamic from 'next/dynamic';

const Item = dynamic(() => import('../../../pages/Item'), { ssr: false });

export function ClientOnly({ detailsId }: { detailsId: string }) {
  return <Item detailsId={detailsId} />;
}
