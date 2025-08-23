import React, {useRef, useState} from "react";

import {addSubmission, formSelector} from "../../store/slices/formSlice";
import {FormField} from "../UI/FormField";
import {
  validateName,
  validateAge,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateGender,
  validateTerms,
  validatePicture,
  validateCountry,
  checkPasswordStrength,
} from "../../utils/validation";
import {toBase64} from "../../utils/toBase64";
import {ValidationErrors} from "../../types";
import styles from "./forms.module.scss";
import {useAppDispatch, useAppSelector} from "../../store";

interface UncontrolledFormProps {
  onClose: () => void;
}

const Uncontrolled: React.FC<UncontrolledFormProps> = ({onClose}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState({score: 0});

  const {countries} = useAppSelector(formSelector);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name") as string;
    const age = parseInt(formData.get("age") as string);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;
    const gender = formData.get("gender") as string;
    const terms = formData.get("terms") === "on";
    const picture = formData.get("picture") as File;
    const country = formData.get("country") as string;

    const newErrors: ValidationErrors = {
      name: validateName(name),
      age: validateAge(age),
      email: validateEmail(email),
      password: validatePassword(password),
      confirmPassword: validateConfirmPassword(password, confirmPassword),
      gender: validateGender(gender),
      terms: validateTerms(terms),
      picture: validatePicture(picture),
      country: validateCountry(country),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== undefined);

    if (hasErrors) return;

    try {
      const pictureBase64 = await toBase64(picture);

      dispatch(
        addSubmission({
          id: Date.now().toString(),
          name,
          age,
          email,
          gender,
          picture: pictureBase64,
          country,
          formType: "uncontrolled",
          timestamp: Date.now(),
        })
      );

      onClose();
    } catch {
      setErrors({...errors, picture: "Failed to process image"});
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(checkPasswordStrength(password));
  };

  const renderPasswordStrength = () => {
    if (!passwordStrength.score) return null;

    return (
      <div className={styles.passwordStrength}>
        <div className={styles.strengthMeter}>
          <div className={`${styles.strengthBar} ${passwordStrength.score >= 1 ? styles.active : ""}`}></div>
          <div className={`${styles.strengthBar} ${passwordStrength.score >= 2 ? styles.active : ""}`}></div>
          <div className={`${styles.strengthBar} ${passwordStrength.score >= 3 ? styles.active : ""}`}></div>
          <div className={`${styles.strengthBar} ${passwordStrength.score >= 4 ? styles.active : ""}`}></div>
        </div>
        <div className={styles.strengthText}>{passwordStrength.score < 2 ? "Weak" : passwordStrength.score < 4 ? "Medium" : "Strong"}</div>
      </div>
    );
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}>
      <h2>Uncontrolled Form</h2>

      <FormField
        label="Name"
        htmlFor="name"
        error={errors.name}>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Age"
        htmlFor="age"
        error={errors.age}>
        <input
          type="number"
          id="age"
          name="age"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="email"
        error={errors.email}>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        error={errors.password}>
        <input
          type="password"
          id="password"
          name="password"
          className={styles.input}
          onChange={handlePasswordChange}
        />
        {renderPasswordStrength()}
      </FormField>

      <FormField
        label="Confirm Password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword}>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Gender"
        htmlFor="gender"
        error={errors.gender}>
        <select
          id="gender"
          name="gender"
          className={styles.select}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </FormField>

      <FormField
        label="Country"
        htmlFor="country"
        error={errors.country}>
        <input
          list="countries"
          id="country"
          name="country"
          className={styles.input}
          autoComplete="off"
        />
        <datalist id="countries">
          {countries.map((country) => (
            <option
              key={country}
              value={country}
            />
          ))}
        </datalist>
      </FormField>

      <FormField
        label="Profile Picture"
        htmlFor="picture"
        error={errors.picture}>
        <input
          type="file"
          id="picture"
          name="picture"
          accept="image/jpeg,image/png"
          className={styles.fileInput}
        />
      </FormField>

      <FormField
        htmlFor="terms"
        error={errors.terms}>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            className={styles.checkbox}
          />
          <label
            htmlFor="terms"
            className={styles.checkboxLabel}>
            I accept the Terms and Conditions
          </label>
        </div>
      </FormField>

      <div className={styles.buttonGroup}>
        <button
          type="button"
          onClick={onClose}
          className={styles.cancelButton}>
          Cancel
        </button>
        <button
          type="submit"
          className={styles.submitButton}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Uncontrolled;
