import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Local Claude Code artefacts — worktrees contiennent leurs propres .next.
    ".claude/**",
    "**/.next/**",
    // node_modules au cas où.
    "node_modules/**",
  ]),
  // Demo pages are intentionally unique playgrounds — relax the strictest rules
  // that punish patterns we accept in those self-contained demos.
  {
    files: ["src/app/demos/**/*.{ts,tsx}"],
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
]);

export default eslintConfig;
