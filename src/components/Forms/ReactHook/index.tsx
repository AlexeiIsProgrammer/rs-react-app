import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {useDispatch} from "react-redux";
import {addSubmission, formSelector} from "../../../store/slices/formSlice";
import {FormField} from "../../UI/FormField";
import {checkPasswordStrength} from "../../../utils/validation";
import {toBase64} from "../../../utils/toBase64";
import styles from "../Forms.module.scss";
import {useAppSelector} from "../../../store";

interface ControlledFormProps {
  onClose: () => void;
}

interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: FileList;
  country: string;
}

const schema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .test("first-uppercase", "First letter must be uppercase", (value) => value?.[0] === value?.[0]?.toUpperCase()),
  age: yup.number().required("Age is required").min(0, "Age cannot be negative").max(150, "Age seems unrealistic"),
  email: yup.string().required("Email is required").email("Invalid email format"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .test("password-strength", "Password is too weak", (value) => {
      if (!value) return false;
      const strength = checkPasswordStrength(value);
      return strength.score >= 3;
    }),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
  gender: yup.string().required("Gender is required"),
  terms: yup.boolean().required("You must accept the terms and conditions").oneOf([true], "You must accept the terms and conditions"),
  picture: yup
    .mixed()
    .required("Picture is required")
    .test("file-type", "Only JPEG and PNG files are allowed", (value) => {
      if (!value || !value[0]) return false;
      return ["image/jpeg", "image/png"].includes(value[0].type);
    })
    .test("file-size", "File size must be less than 5MB", (value) => {
      if (!value || !value[0]) return false;
      return value[0].size <= 5 * 1024 * 1024;
    }),
  country: yup.string().required("Country is required"),
});

const ControlledForm: React.FC<ControlledFormProps> = ({onClose}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: {errors, isValid},
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {countries} = useAppSelector(formSelector);

  const password = watch("password");
  const passwordStrength = password ? checkPasswordStrength(password) : {score: 0};

  const onSubmit = async (data: FormValues) => {
    try {
      const pictureBase64 = await toBase64(data.picture[0]);

      dispatch(
        addSubmission({
          id: Date.now().toString(),
          name: data.name,
          age: data.age,
          email: data.email,
          gender: data.gender,
          picture: pictureBase64,
          country: data.country,
          formType: "controlled",
          timestamp: Date.now(),
        })
      );

      onClose();
    } catch (error) {
      console.error("Failed to process image:", error);
    }
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
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}>
      <h2>Controlled Form (React Hook Form)</h2>

      <FormField
        label="Name"
        htmlFor="name"
        error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          id="name"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Age"
        htmlFor="age"
        error={errors.age?.message}>
        <input
          {...register("age", {valueAsNumber: true})}
          type="number"
          id="age"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Email"
        htmlFor="email"
        error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          id="email"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          id="password"
          className={styles.input}
        />
        {renderPasswordStrength()}
      </FormField>

      <FormField
        label="Confirm Password"
        htmlFor="confirmPassword"
        error={errors.confirmPassword?.message}>
        <input
          {...register("confirmPassword")}
          type="password"
          id="confirmPassword"
          className={styles.input}
        />
      </FormField>

      <FormField
        label="Gender"
        htmlFor="gender"
        error={errors.gender?.message}>
        <select
          {...register("gender")}
          id="gender"
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
        error={errors.country?.message}>
        <input
          {...register("country")}
          list="countries"
          id="country"
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
        error={errors.picture?.message as string}>
        <input
          {...register("picture")}
          type="file"
          id="picture"
          accept="image/jpeg,image/png"
          className={styles.fileInput}
        />
      </FormField>

      <FormField
        htmlFor="terms"
        error={errors.terms?.message}>
        <div className={styles.checkboxContainer}>
          <input
            {...register("terms")}
            type="checkbox"
            id="terms"
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
          className={styles.submitButton}
          disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ControlledForm;
