import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginJest from 'eslint-plugin-jest'

export default [
  // 1. Базовые настройки
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    }
  },

  // 2. Рекомендации ESLint
  pluginJs.configs.recommended,

  // 3. Prettier
  eslintPluginPrettierRecommended,

  // 4. Настройки для тестов (Jest)
  {
    files: ['**/*.test.js', '**/*.spec.js', 'tests/**/*.js'],
    languageOptions: {
      globals: {
        ...pluginJest.environments.globals.globals
      }
    },
    plugins: {
      jest: pluginJest
    },
    rules: {
      ...pluginJest.configs.recommended.rules,
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error'
    }
  }
]
