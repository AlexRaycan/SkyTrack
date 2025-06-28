import { memo, type PropsWithChildren } from 'react';
import { cn } from '@/helpers/classNames';
import SwitchTheme from '@/layouts/Layout/SwitchTheme';

interface LayoutProps extends PropsWithChildren {
	className?: string;
}

const Layout = memo(function Layout({ ...props }: LayoutProps) {
	const { className, children, ...otherProps } = props;

	return (
		<main
			className={cn(
				'text-foreground bg-background block content-center justify-between text-xl leading-none',
				className,
			)}
			{...otherProps}
		>
			<SwitchTheme />
			{children}
		</main>
	);
});

export default Layout;
