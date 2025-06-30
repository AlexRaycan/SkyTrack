import { memo, type PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';
import MapComponent from '@pages/Home/MapComponent';

interface LayoutProps extends PropsWithChildren {
	className?: string;
}

const Layout = memo(function Layout({ ...props }: LayoutProps) {
	const { className, children, ...otherProps } = props;

	return (
		<main
			className={cn(
				// 'block content-center justify-between',
				'text-foreground bg-background leading-none',
				'flex items-stretch gap-3 p-0 md:gap-6 md:p-10',
				className,
			)}
			{...otherProps}
		>
			<h1 hidden>SkyTrack – flight tracking service</h1>
			<MapComponent />
			{/*<Header />*/}
			{children}
		</main>
	);
});

export default Layout;
