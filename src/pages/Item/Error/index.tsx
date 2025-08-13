import styles from './Error.module.scss';
import type { ErrorProps } from './types';

const Error = ({ error }: ErrorProps) => {
  return (
    <div data-testid="error-message" className={styles.errorMessage}>
      {error &&
        'status' in error &&
        (error.status === 404
          ? 'Character not found'
          : `Status: ${error.status}, Message: ${
              'data' in error &&
              error.data &&
              typeof error.data === 'object' &&
              error.data !== null &&
              'message' in error.data &&
              typeof error.data.message === 'string'
                ? error?.data.message
                : 'Unknown error'
            }`)}
    </div>
  );
};

export default Error;
