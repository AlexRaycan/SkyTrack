import { memo, useContext } from 'react';
import { cn } from '@/helpers/classNames';
import Button from '@components/Button';
import SwitchThemeIcon from '@assets/icons/action/swtich-theme.svg?react';
import { ThemeContext } from '@/context/ThemeContext';

interface SwitchThemeProps {
	className?: string;
}

const SwitchTheme = memo(function SwitchTheme({ ...props }: SwitchThemeProps) {
	const { className } = props;
	const themeContext = useContext(ThemeContext);

	if (!themeContext) {
		// Это произойдет, если компонент используется вне ThemeProvider
		throw new Error('SwitchTheme must be used within a ThemeProvider');
	}

	const { toggleTheme } = themeContext;

	return (
		<div className={cn('fixed top-10 left-1/2 z-10 -translate-x-1/2', className)}>
			<Button
				icon={
					<SwitchThemeIcon
						height={16}
						width={16}
					/>
				}
				onClick={toggleTheme}
			/>
		</div>
	);
});

export default SwitchTheme;
