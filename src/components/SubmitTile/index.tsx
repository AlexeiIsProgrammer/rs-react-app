import {useEffect, useState} from "react";
import styles from "./SubmitTile.module.scss";
import {SubmissionTileProps} from "./types";

const SubmitTile = ({submission}: SubmissionTileProps) => {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsNew(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.tile} ${isNew ? styles.newTile : ""}`}>
      <div className={styles.tileHeader}>
        <h3>{submission.name}</h3>
        <span className={styles.formType}>{submission.formType}</span>
      </div>

      {submission.picture && (
        <div className={styles.picture}>
          <img
            src={submission.picture}
            alt={submission.name}
          />
        </div>
      )}

      <div className={styles.tileContent}>
        <p>
          <strong>Age:</strong> {submission.age}
        </p>
        <p>
          <strong>Email:</strong> {submission.email}
        </p>
        <p>
          <strong>Gender:</strong> {submission.gender}
        </p>
        <p>
          <strong>Country:</strong> {submission.country}
        </p>
        <p>
          <strong>Submitted:</strong> {new Date(submission.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default SubmitTile;
