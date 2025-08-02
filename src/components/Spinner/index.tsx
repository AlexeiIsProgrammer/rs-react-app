import styles from './Spinner.module.scss';

const Spinner = () => (
  <div
    className={styles.spinnerContainer}
    role="status"
    aria-label="loading"
    data-testid="spinner"
  >
    <div className={styles.spinner}></div>
  </div>
);

export default Spinner;
