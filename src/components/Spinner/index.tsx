import styles from './Spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles['spinner-container']}>
      <div className={styles.spinner}></div>
      <p>Loading CO2 data...</p>
    </div>
  );
};

export default Spinner;
