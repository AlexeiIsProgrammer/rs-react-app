import styles from './Data.module.scss';
import type { DataProps } from './types';

const Data = ({ data }: DataProps) => {
  return (
    <div className={styles.content}>
      <div>
        <h4 className={styles.name}>{data.name}</h4>
      </div>
      <div className={styles.detailsGrid}>
        <div>
          <p className={styles.detailLabel}>Birth Year</p>
          <p className={styles.detailValue}>{data.birth_year}</p>
        </div>
        <div>
          <p className={styles.detailLabel}>Gender</p>
          <p className={styles.detailValue}>{data.gender}</p>
        </div>
        <div>
          <p className={styles.detailLabel}>Height</p>
          <p className={styles.detailValue}>{data.height} cm</p>
        </div>
        <div>
          <p className={styles.detailLabel}>Mass</p>
          <p className={styles.detailValue}>{data.mass} kg</p>
        </div>
      </div>
    </div>
  );
};

export default Data;
