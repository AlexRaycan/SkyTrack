import Button from '@components/Button';
import { Link } from '@tanstack/react-router';
import type { IHeaderMenuItemProps } from '@components/Header/Header-menu.data.ts';
import { cn } from '@/lib/utils.ts';
import { useWindowWidth } from '@/hooks/useWindowWidth.ts';
import type { ReactElement } from 'react';

import { UserRound } from '@components/animate-ui/icons/user-round.tsx';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import MoreIcon from '@assets/icons/other/more.svg?react';
import Logo from '@assets/logo/logo.svg?react';

interface HeaderMenuItemProps {
	className?: string;
	item: IHeaderMenuItemProps;
}

const HeaderMenuItem = (props: HeaderMenuItemProps) => {
	const { className, item } = props;
	const { windowWidth, breakpoints } = useWindowWidth();
	const isMobile = windowWidth < breakpoints.md; // Сравнение с брейкпоинтом 'md'

	const defaultIcons: { [key: string]: ReactElement } = {
		Profile: <UserRound />,
		Favorites: <Heart />,
		More: <MoreIcon />,
		Home: <Logo />,
	};

	return (
		<Link
			to={item.to}
			className={cn('inline-flex flex-1 justify-center md:flex-none', className)}
			activeProps={{
				style: {
					color: 'var(--color-accent)',
				},
			}}
		>
			<Button
				title={'Profile'}
				size={'large'}
				isHorizontal={!isMobile}
				icon={defaultIcons[item.label]}
			>
				{item.label}
			</Button>
		</Link>
	);
};

export default HeaderMenuItem;
