import { cn } from '@/lib/utils.ts';
import SwitchTheme from '@/layouts/Layout/SwitchTheme';
import { useWindowWidth } from '@/hooks/useWindowWidth.ts';
import { HEADER_MENU } from '@components/Header/Header-menu.data.ts';
import HeaderMenuItem from '@components/Header/HeaderMenuItem';

interface HeaderProps {
	className?: string;
}

const Header = (props: HeaderProps) => {
	const { className } = props;
	const { windowWidth, breakpoints } = useWindowWidth();
	const isMobile = windowWidth < breakpoints.md; // Сравнение с брейкпоинтом 'md'

	return (
		<>
			<nav
				className={cn(
					// 'fixed top-10 right-10',
					isMobile && 'fixed bottom-0',
					'z-30 flex w-full items-center gap-2 p-0 md:relative',
					className,
				)}
			>
				<ol
					className={cn(
						'bg-background flex min-h-12 w-full items-stretch justify-center overflow-hidden rounded-full md:justify-start',
						isMobile && 'rounded-t-2xl rounded-b-none pb-10',
					)}
				>
					{HEADER_MENU.map((item) => (
						<li
							key={item.label}
							className={cn('inline-flex flex-1 justify-center md:flex-none')}
						>
							<HeaderMenuItem item={item} />
						</li>
					))}
				</ol>
				{!isMobile && (
					<ol>
						<li>
							<SwitchTheme />
						</li>
					</ol>
				)}
			</nav>
			{isMobile && <SwitchTheme className={cn('fixed top-5 right-5 z-20')} />}
		</>
	);
};

export default Header;
