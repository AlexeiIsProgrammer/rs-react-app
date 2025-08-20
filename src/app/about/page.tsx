import dynamic from 'next/dynamic';

const About = dynamic(() => import('../../pages/About'));

export default function Page() {
  return <About />;
}
