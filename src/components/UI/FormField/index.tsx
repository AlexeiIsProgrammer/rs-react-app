import styles from "./form-field.module.scss";
import {FormFieldProps} from "./types";

export const FormField = ({label, htmlFor, error, children}: FormFieldProps) => {
  return (
    <div className={styles.formField}>
      <label
        htmlFor={htmlFor}
        className={styles.label}>
        {label}
      </label>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};
