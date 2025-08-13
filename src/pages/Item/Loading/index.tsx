import Spinner from '#components/Spinner';

import styles from './Loading.module.scss';

const Loading = () => (
  <div className={styles.spinnerContainer}>
    <Spinner />
  </div>
);

export default Loading;
