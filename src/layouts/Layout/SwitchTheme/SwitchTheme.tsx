import { memo } from 'react';
import { cn } from '@/helpers/classNames';
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
		<div className={cn('fixed top-10 left-1/2 z-10 -translate-x-1/2', className)}>
			<Button
				icon={
					theme === 'dark' ? (
						<SwitchThemeDarkIcon
							height={16}
							width={16}
						/>
					) : (
						<SwitchThemeLightIcon
							height={16}
							width={16}
						/>
					)
				}
				onClick={toggleTheme}
			/>
		</div>
	);
});

export default SwitchTheme;
