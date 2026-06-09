import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
  // TypeScript recommended flat config
  ...tsPlugin.configs["flat/recommended"],

  // Next.js recommended + core-web-vitals
  {
    name: "next/recommended",
    plugins: { "@next/next": nextPlugin },
    rules: nextPlugin.flatConfig.recommended.rules,
  },
  {
    name: "next/core-web-vitals",
    rules: nextPlugin.flatConfig.coreWebVitals.rules,
  },

  // Language options for TypeScript
  {
    name: "typescript-parser",
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Ignore patterns
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
