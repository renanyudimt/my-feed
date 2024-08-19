import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'prettier';

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended, prettier, eslintConfigPrettier],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist', 'node_modules'],
  parser: '@typescript-eslint/parser',
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: [reactHooks, reactRefresh],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'warn',
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
});
