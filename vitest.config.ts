import {defineConfig} from "vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupFiles.ts",

    coverage: {
      reporter: ["text", "json", "html"],
      provider: "istanbul",
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: [
        "src/**/*.test.{js,jsx,ts,tsx}",
        "src/**/*.spec.{js,jsx,ts,tsx}",
        "src/index.{js,jsx,ts,tsx}",
        "setupFiles.{js,ts}",
        "src/**/*.d.ts",
        "src/**/types.ts",
        "src/**/*.stories.{js,jsx,ts,tsx}",
      ],
      thresholds: {
        global: {
          statements: 80,
          branches: 50,
          functions: 50,
          lines: 50,
        },
      },
    },
  },
});
