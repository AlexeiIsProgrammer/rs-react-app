import { ClientOnly } from './client';

export function generateStaticParams() {
  return [{ detailsId: '1' }, { detailsId: '2' }, { detailsId: '3' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ detailsId: string }>;
}) {
  const { detailsId } = await params;
  return <ClientOnly detailsId={detailsId || ''} />;
}
