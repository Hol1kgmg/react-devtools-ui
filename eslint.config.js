import eslintConfigPrettier from 'eslint-config-prettier/flat';
import command from 'eslint-plugin-command/config';
import oxlint from 'eslint-plugin-oxlint';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks/flat';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactYouMightNotNeedAnEffect from 'eslint-plugin-react-you-might-not-need-an-effect';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';

const eslintConfig = defineConfig([
  globalIgnores(['node_modules/**', 'dist/**', 'build/**', 'out/**']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
    },
    rules: {
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
        },
      ],
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  reactHooks.configs.recommended,
  reactRefresh.configs.vite,
  reactCompiler.configs.recommended,
  reactYouMightNotNeedAnEffect.configs.recommended,
  command(),
  eslintConfigPrettier,
  ...oxlint.buildFromOxlintConfigFile('.oxlintrc.json'),
]);
export default eslintConfig;
