import { Suspense } from 'react';
import styles from './App.module.scss';
import Spinner from '../components/Spinner';
import Dashboard from '../components/Dashboard';

const App = () => {
  return (
    <div className={styles.app}>
      <Suspense fallback={<Spinner />}>
        <Dashboard />
      </Suspense>
    </div>
  );
};

export default App;
