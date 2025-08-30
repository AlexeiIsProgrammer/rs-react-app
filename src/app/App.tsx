import { Suspense } from 'react';
import styles from './App.module.scss';
import Spinner from '../components/Spinner';

const App = () => {
  return (
    <div className={styles.app}>
      <Suspense fallback={<Spinner />}>App</Suspense>
    </div>
  );
};

export default App;
