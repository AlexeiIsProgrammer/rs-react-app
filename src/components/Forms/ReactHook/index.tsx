import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {useDispatch} from "react-redux";
import {addSubmission, formSelector} from "../../../store/slices/formSlice";
import {FormField} from "../../UI/FormField";
import {checkPasswordStrength} from "../../../utils/validation";
import {toBase64} from "../../../utils/toBase64";
import styles from "../Forms.module.scss";
import {useAppSelector} from "../../../store";
import {ReactHookProps} from "./types";
import schema from "./schema";
import PasswordStrength from "../../PasswordStrength";
import {FormValues} from "../../../types";

const ReactHook = ({onClose}: ReactHookProps) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
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
        <PasswordStrength score={passwordStrength.score} />
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

export default ReactHook;
