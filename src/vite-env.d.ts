/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

svgr({
	svgrOptions: {
		plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
		svgoConfig: {
			floatPrecision: 2,
		},
	},

	include: '**/*.svg?react',
});
/// <reference types="vite-plugin-svgr/client" />

svgr({
	svgrOptions: {
		plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
		svgoConfig: {
			floatPrecision: 2,
		},
	},

	include: '**/*.svg?react',
});
