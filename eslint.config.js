// @ts-check

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';

export default tseslint.config(
	{
		ignores: [
			'dist',
			'**/*.scss',
			'**/*.css',
			'vite.config.ts',
			'.eslintrc.cjs',
			'eslint.config.js',
			'.idea',
			'.sonarlint',
			'.vscode',
			'temp',
			'src/components/animate-ui',
		],
	},
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			globals: globals.browser,
		},
		plugins: {
			'@stylistic': stylistic,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

			'@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }],

			// Разрешаем пустые интерфейсы, у которых есть ровно один super-тип
			'@typescript-eslint/no-empty-object-type': [
				'error',
				{
					allowInterfaces: 'always',
					allowWithName: 'Props$',
				},
			],

			'padding-line-between-statements': [
				'error',
				{ blankLine: 'always', prev: '*', next: 'return' },
				{ blankLine: 'always', prev: '*', next: 'if' },
				{ blankLine: 'always', prev: '*', next: 'class' },
				{ blankLine: 'always', prev: '*', next: 'block' },
				{ blankLine: 'always', prev: '*', next: 'block-like' },
				{ blankLine: 'always', prev: '*', next: 'export' },
			],

			'@stylistic/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: '*',
					next: ['enum', 'interface', 'type'],
				},
			],

			'no-restricted-imports': [
				'error',
				{
					patterns: [
						{
							group: ['../'],
							message: 'Use absolute import with @',
						},
					],
				},
			],
		},
	},
);
