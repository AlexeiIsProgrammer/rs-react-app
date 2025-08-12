import styles from './Error.module.scss';
import type { ErrorProps } from './types';

const Error = ({ error }: ErrorProps) => {
  return (
    <div data-testid="error-message" className={styles.errorMessage}>
      {'error' in error ? error.error : 'Unknown error'}
    </div>
  );
};

export default Error;
