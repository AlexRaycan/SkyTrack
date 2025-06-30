import { memo } from 'react';
import { cn } from '@/lib/utils.ts';
import Button from '@components/Button';
import SwitchThemeDarkIcon from '@assets/icons/action/swtich-theme-dark.svg?react';
import SwitchThemeLightIcon from '@assets/icons/action/swtich-theme-light.svg?react';
import { useTheme } from '@/context/useTheme.ts';

interface SwitchThemeProps {
	className?: string;
}

const SwitchTheme = memo(function SwitchTheme({ ...props }: SwitchThemeProps) {
	const { className } = props;
	const themeContext = useTheme();

	if (!themeContext) {
		// Это произойдет, если компонент используется вне ThemeProvider
		throw new Error('SwitchTheme must be used within a ThemeProvider');
	}

	const { theme, toggleTheme } = themeContext;

	return (
		<Button
			title={`Switch Theme to the ${theme === 'dark' ? 'Light' : 'Dark'}`}
			className={cn(className)}
			size={'large'}
			icon={
				theme === 'dark' ? (
					<SwitchThemeDarkIcon
						height={24}
						width={24}
					/>
				) : (
					<SwitchThemeLightIcon
						height={24}
						width={24}
					/>
				)
			}
			onClick={toggleTheme}
		/>
	);
});

export default SwitchTheme;
