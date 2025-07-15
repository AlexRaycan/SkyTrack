import { memo, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';
import MapComponent from '@pages/Home/MapComponent';
import Header from '@components/Header';

interface LayoutProps extends PropsWithChildren {
	className?: string;
}

const Layout = memo(function Layout({ ...props }: LayoutProps) {
	const { className, children, ...otherProps } = props;

	return (
		<main
			className={cn(
				// 'block content-center justify-between',
				'relative flex max-h-dvh flex-col overflow-hidden',
				'text-foreground bg-background min-h-screen leading-none',
				'p-0',
				'md:gap-6 md:p-5 md:pb-0 2xl:p-10 2xl:pb-0',
				className,
			)}
			{...otherProps}
		>
			<h1 hidden>SkyTrack – flight tracking service</h1>
			<MapComponent />
			<Header />
			<div className={cn('flex max-h-full items-stretch gap-3 overflow-hidden md:justify-between')}>
				{children}
			</div>
		</main>
	);
});

export default Layout;
