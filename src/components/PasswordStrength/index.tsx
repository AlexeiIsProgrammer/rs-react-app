import styles from "./PasswordStrength.module.scss";
import {PasswordStrengthProps} from "./types";

const PasswordStrength = ({score}: PasswordStrengthProps) => {
  if (!score) return null;

  return (
    <div
      className={styles.passwordStrength}
      title="strength">
      <div className={styles.strengthMeter}>
        <div className={`${styles.strengthBar} ${score >= 1 ? styles.active : ""}`}></div>
        <div className={`${styles.strengthBar} ${score >= 2 ? styles.active : ""}`}></div>
        <div className={`${styles.strengthBar} ${score >= 3 ? styles.active : ""}`}></div>
        <div className={`${styles.strengthBar} ${score >= 4 ? styles.active : ""}`}></div>
      </div>
      <div className={styles.strengthText}>{score < 2 ? "Weak" : score < 4 ? "Medium" : "Strong"}</div>
    </div>
  );
};

export default PasswordStrength;
