import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tanstackRouter from '@tanstack/router-plugin/vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	base: '/SkyTrack',
	server: {
		host: '0.0.0.0',
		port: 4004,
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@api': path.resolve(__dirname, 'src/api'),
			'@assets': path.resolve(__dirname, 'src/assets'),
			'@fonts': path.resolve(__dirname, 'src/assets/fonts'),
			'@pages': path.resolve(__dirname, 'src/pages'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@styles': path.resolve(__dirname, 'src/styles/_index.css'),
			'@lib': path.resolve(__dirname, 'src/lib'),
		},
	},
	plugins: [
		tanstackRouter({
			target: 'react',
			autoCodeSplitting: true,
		}),
		tailwindcss(),
		svgr(),
		react(),
	],
});
