// ESLint flat config for Angular 18 library "puzzle"
// Scopes linting to projects/puzzle and aligns with Prettier
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['dist/**', 'example/**', 'node_modules/**']
  },
  {
    files: ['projects/puzzle/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@angular-eslint': angular,
      '@angular-eslint/template': angularTemplate
    },
    processor: angularTemplate.processors['extract-inline-html'],
    rules: {
      ...angular.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'pzl', style: 'camelCase' }],
      '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'pzl', style: 'kebab-case' }]
    }
  },
  {
    files: ['projects/puzzle/**/*.html'],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules
    }
  },
  eslintConfigPrettier
];
