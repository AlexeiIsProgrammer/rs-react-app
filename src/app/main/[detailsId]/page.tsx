import dynamic from 'next/dynamic';

const Item = dynamic(() => import('../../../pages/Item'));
const Main = dynamic(() => import('../../../pages/Main'));

export default async function Page({
  params,
}: {
  params: Promise<{ detailsId: string }>;
}) {
  const { detailsId } = await params;

  return (
    <Main>
      <Item detailsId={detailsId} />
    </Main>
  );
}
