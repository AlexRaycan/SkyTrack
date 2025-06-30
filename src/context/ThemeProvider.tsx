import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { type Theme, ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>(() => {
		const savedTheme = localStorage.getItem('theme') as Theme;
		// Проверяем системные предпочтения, если в localStorage ничего нет
		const userMedia = window.matchMedia('(prefers-color-scheme: dark)');

		if (savedTheme) {
			return savedTheme;
		}

		if (userMedia.matches) {
			return 'dark';
		}

		return 'light';
	});

	useEffect(() => {
		// ! TODO: настраивать только тёмную тему, `light` не настраивать
		const root = document.documentElement;
		root.classList.toggle('light', theme === 'light');
		root.classList.toggle('dark', theme === 'dark');
		localStorage.setItem('theme', theme);
	}, [theme]);

	const toggleTheme = useCallback(() => {
		setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
	}, []);

	const value = useMemo(
		() => ({
			theme,
			toggleTheme,
		}),
		[theme, toggleTheme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
