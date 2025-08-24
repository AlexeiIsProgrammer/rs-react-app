export type FormData = {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  picture: string | null;
  country: string;
  formType: "uncontrolled" | "controlled";
  timestamp: number;
};

export type FormValues = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: FileList;
  country: string;
};

export type FormState = {
  submissions: FormData[];
  countries: string[];
};

export type PasswordStrength = {
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
  score: number;
};

export type ValidationErrors = {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  terms?: string;
  picture?: string;
  country?: string;
};
