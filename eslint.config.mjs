import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Desativa regras de formatação que conflitam com o Prettier.
  prettier,
  {
    rules: {
      // Permite `const { descartado, ...rest } = obj` sem falso positivo.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Onde o pacote de hospedagem e extraido para teste: e o proprio build
    // copiado, entao o lint reclamaria de milhares de linhas de JS minificado.
    ".teste-pacote/**",
  ]),
]);

export default eslintConfig;
