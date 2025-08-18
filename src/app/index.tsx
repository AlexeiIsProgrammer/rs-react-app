import Image from 'next/image';

import icon from '/public/icon.svg';

import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.container}>
      <Image width="200" height="200" alt="Logo" src={icon.src} />
    </div>
  );
}

export default App;
