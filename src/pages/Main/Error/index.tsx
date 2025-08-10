import styles from './Error.module.scss';
import type { ErrorProps } from './types';

const Error = ({ error }: ErrorProps) => {
  return (
    <div className={styles.errorMessage} data-testid="error-message">
      {'error' in error ? error.error : 'Unknown error'}
    </div>
  );
};

export default Error;
