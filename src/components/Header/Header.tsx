import { cn } from '@/lib/utils.ts';
import Button from '@components/Button';
import { UserRound } from '@components/animate-ui/icons/user-round.tsx';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import MoreIcon from '@assets/icons/other/more.svg?react';
import Logo from '@assets/logo/logo.svg?react';
import SwitchTheme from '@/layouts/Layout/SwitchTheme';
import { Link } from '@tanstack/react-router';
import { useWindowWidth } from '@/hooks/useWindowWidth.ts';

interface HeaderProps {
	className?: string;
}

const Header = (props: HeaderProps) => {
	const { className } = props;
	const { windowWidth, breakpoints } = useWindowWidth();
	const isMobile = windowWidth < breakpoints.md; // Сравнение с брейкпоинтом 'md'
	const linkActiveStyle = {
		style: {
			color: 'var(--color-accent)',
		},
	};

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
					<li className={'header-logo inline-flex flex-1 justify-center md:flex-none'}>
						<Link
							to="/"
							className={cn('inline-flex flex-1 justify-center md:flex-none')}
							activeProps={linkActiveStyle}
						>
							<Button
								title={'Profile'}
								size={'large'}
								isHorizontal={!isMobile}
								isTransparent
								icon={<Logo />}
							>
								Home
							</Button>
						</Link>
					</li>
					<li className={'inline-flex flex-1 justify-center md:flex-none'}>
						<Button
							title={'Profile'}
							size={'large'}
							{...(!isMobile && { isHorizontal: true })}
							isTransparent
							icon={<UserRound />}
						>
							Profile
						</Button>
					</li>
					<li className={'inline-flex flex-1 justify-center md:flex-none'}>
						<Button
							className={'flex-1'}
							title={'Favorites'}
							size={'large'}
							{...(!isMobile && { isHorizontal: true })}
							isTransparent
							icon={<Heart />}
						>
							Favorites
						</Button>
					</li>
					{isMobile && (
						<li className={'inline-flex flex-1 justify-center md:flex-none'}>
							<Button
								className={'flex-1'}
								title={'Favorites'}
								size={'large'}
								isHorizontal={!isMobile}
								isTransparent
								icon={<MoreIcon />}
							>
								More
							</Button>
						</li>
					)}
				</ol>
				{!isMobile && (
					<ol>
						<li>
							<SwitchTheme />
						</li>
					</ol>
				)}
			</nav>
			{isMobile && (
				<nav>
					<ol className={cn('fixed top-5 right-5 z-20')}>
						<li>
							<SwitchTheme />
						</li>
					</ol>
				</nav>
			)}
		</>
	);
};

export default Header;
