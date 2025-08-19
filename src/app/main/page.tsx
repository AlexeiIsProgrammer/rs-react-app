import dynamic from 'next/dynamic';

const Main = dynamic(() => import('../../pages/Main'));

export default async function Page() {
  return <Main />;
}
