import * as yup from "yup";
import {checkPasswordStrength} from "../../../utils/validation";

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
    .mixed<FileList>()
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

export default schema;
