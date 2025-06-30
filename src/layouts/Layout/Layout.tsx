import { memo, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';
import Header from '@/components/Header';

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
			<Header />
			{children}
		</main>
	);
});

export default Layout;
