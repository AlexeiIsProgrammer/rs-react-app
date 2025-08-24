import {describe, it, expect} from "vitest";
import {
  checkPasswordStrength,
  validateName,
  validateAge,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateGender,
  validateTerms,
  validatePicture,
  validateCountry,
} from "../validation";

describe("Validation Functions", () => {
  describe("validateName", () => {
    it("should return error for empty name", () => {
      expect(validateName("")).toBe("Name is required");
    });

    it("should return error for lowercase first letter", () => {
      expect(validateName("john")).toBe("First letter must be uppercase");
    });

    it("should return undefined for valid name", () => {
      expect(validateName("John")).toBeUndefined();
      expect(validateName("John Doe")).toBeUndefined();
    });
  });

  describe("validateAge", () => {
    it("should return error for empty age", () => {
      expect(validateAge(NaN)).toBe("Age is required");
    });

    it("should return error for non-number age", () => {
      expect(validateAge("not a number")).toBe("Age must be a number");
    });

    it("should return error for negative age", () => {
      expect(validateAge(-5)).toBe("Age cannot be negative");
    });

    it("should return error for unrealistic age", () => {
      expect(validateAge(151)).toBe("Age seems unrealistic");
    });

    it("should return undefined for valid age", () => {
      expect(validateAge(0)).toBeUndefined();
      expect(validateAge(25)).toBeUndefined();
      expect(validateAge(150)).toBeUndefined();
    });
  });

  describe("validateEmail", () => {
    it("should return error for empty email", () => {
      expect(validateEmail("")).toBe("Email is required");
    });

    it("should return error for invalid email format", () => {
      expect(validateEmail("invalid")).toBe("Invalid email format");
      expect(validateEmail("invalid@")).toBe("Invalid email format");
      expect(validateEmail("invalid@domain")).toBe("Invalid email format");
      expect(validateEmail("invalid@domain.")).toBe("Invalid email format");
    });

    it("should return undefined for valid email", () => {
      expect(validateEmail("test@example.com")).toBeUndefined();
      expect(validateEmail("user.name+tag@domain.co.uk")).toBeUndefined();
    });
  });

  describe("checkPasswordStrength", () => {
    it("should correctly evaluate password strength", () => {
      expect(checkPasswordStrength("")).toEqual({
        hasNumber: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasSpecialChar: false,
        score: 0,
      });

      expect(checkPasswordStrength("password")).toEqual({
        hasNumber: false,
        hasUpperCase: false,
        hasLowerCase: true,
        hasSpecialChar: false,
        score: 1,
      });

      expect(checkPasswordStrength("Password")).toEqual({
        hasNumber: false,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialChar: false,
        score: 2,
      });

      expect(checkPasswordStrength("Password123")).toEqual({
        hasNumber: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialChar: false,
        score: 3,
      });

      expect(checkPasswordStrength("Password123!")).toEqual({
        hasNumber: true,
        hasUpperCase: true,
        hasLowerCase: true,
        hasSpecialChar: true,
        score: 4,
      });
    });
  });

  describe("validatePassword", () => {
    it("should return error for empty password", () => {
      expect(validatePassword("")).toBe("Password is required");
    });

    it("should return error for short password", () => {
      expect(validatePassword("short")).toBe("Password must be at least 8 characters");
    });

    it("should return error for weak password", () => {
      expect(validatePassword("password")).toBe("Password is too weak");

      expect(validatePassword("Password")).toBe("Password is too weak");
    });

    it("should return undefined for strong password", () => {
      expect(validatePassword("Password123")).toBeUndefined();

      expect(validatePassword("Password123!")).toBeUndefined();
    });
  });

  describe("validateConfirmPassword", () => {
    it("should return error for empty confirmation", () => {
      expect(validateConfirmPassword("password", "")).toBe("Please confirm your password");
    });

    it("should return error for non-matching passwords", () => {
      expect(validateConfirmPassword("password", "different")).toBe("Passwords do not match");
    });

    it("should return undefined for matching passwords", () => {
      expect(validateConfirmPassword("password", "password")).toBeUndefined();
    });
  });

  describe("validateGender", () => {
    it("should return error for empty gender", () => {
      expect(validateGender("")).toBe("Gender is required");
    });

    it("should return undefined for valid gender", () => {
      expect(validateGender("male")).toBeUndefined();
      expect(validateGender("female")).toBeUndefined();
      expect(validateGender("other")).toBeUndefined();
    });
  });

  describe("validateTerms", () => {
    it("should return error for not accepted terms", () => {
      expect(validateTerms(false)).toBe("You must accept the terms and conditions");
    });

    it("should return undefined for accepted terms", () => {
      expect(validateTerms(true)).toBeUndefined();
    });
  });

  describe("validatePicture", () => {
    it("should return error for no file", () => {
      expect(validatePicture(null)).toBe("Picture is required");
    });

    it("should return error for invalid file type", () => {
      const file = new File(["content"], "test.txt", {type: "text/plain"});
      expect(validatePicture(file)).toBe("Only JPEG and PNG files are allowed");
    });

    it("should return error for large file", () => {
      const largeFile = new File([new ArrayBuffer(5 * 1024 * 1024 + 1)], "test.png", {type: "image/png"});
      expect(validatePicture(largeFile)).toBe("File size must be less than 5MB");
    });

    it("should return undefined for valid file", () => {
      const jpgFile = new File(["content"], "test.jpg", {type: "image/jpeg"});
      expect(validatePicture(jpgFile)).toBeUndefined();

      const pngFile = new File(["content"], "test.png", {type: "image/png"});
      expect(validatePicture(pngFile)).toBeUndefined();
    });
  });

  describe("validateCountry", () => {
    it("should return error for empty country", () => {
      expect(validateCountry("")).toBe("Country is required");
    });

    it("should return undefined for valid country", () => {
      expect(validateCountry("United States")).toBeUndefined();
      expect(validateCountry("Canada")).toBeUndefined();
    });
  });
});
