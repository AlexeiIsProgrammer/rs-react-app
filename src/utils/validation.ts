import {PasswordStrength} from "../types";

export const validateName = (name: string): string | undefined => {
  if (!name) return "Name is required";
  if (name[0] !== name[0]?.toUpperCase()) return "First letter must be uppercase";
  return undefined;
};

export const validateAge = (age: number): string | undefined => {
  if (!age && age !== 0) return "Age is required";
  if (isNaN(age)) return "Age must be a number";
  if (age < 0) return "Age cannot be negative";
  if (age > 150) return "Age seems unrealistic";
  return undefined;
};

export const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format";
  return undefined;
};

export const checkPasswordStrength = (password: string): PasswordStrength => {
  const hasNumber = /\d/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

  let score = 0;
  if (hasNumber) score++;
  if (hasUpperCase) score++;
  if (hasLowerCase) score++;
  if (hasSpecialChar) score++;

  return {hasNumber, hasUpperCase, hasLowerCase, hasSpecialChar, score};
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";

  const strength = checkPasswordStrength(password);
  if (strength.score < 3) return "Password is too weak";

  return undefined;
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string | undefined => {
  if (!confirmPassword) return "Please confirm your password";
  if (password !== confirmPassword) return "Passwords do not match";
  return undefined;
};

export const validateGender = (gender: string): string | undefined => {
  if (!gender) return "Gender is required";
  return undefined;
};

export const validateTerms = (accepted: boolean): string | undefined => {
  if (!accepted) return "You must accept the terms and conditions";
  return undefined;
};

export const validatePicture = (file: File | null): string | undefined => {
  if (!file) return "Picture is required";
  const validTypes = ["image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) return "Only JPEG and PNG files are allowed";
  if (file.size > 5 * 1024 * 1024) return "File size must be less than 5MB";
  return undefined;
};

export const validateCountry = (country: string): string | undefined => {
  if (!country) return "Country is required";
  return undefined;
};
