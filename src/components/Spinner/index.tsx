import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}></div>
      <p>Loading data...</p>
    </div>
  );
};

export default Spinner;
