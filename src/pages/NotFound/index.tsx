import { Link } from 'react-router';

import notFound from '#assets/not-found.svg';

import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.description}>
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className={styles.imageContainer}>
        <img src={notFound} alt="Not found illustration" />
      </div>
      <Link to="/" className={styles.homeLink}>
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
