import Button from '@components/Button';
import { Link, type LinkProps, useSearch } from '@tanstack/react-router';
import type { IHeaderMenuItemProps } from '@components/Header/Header-menu.data.ts';
import { cn } from '@/lib/utils.ts';
import { useWindowWidth } from '@/hooks/useWindowWidth.ts';
import { type ReactElement } from 'react';

import { UserRound } from '@components/animate-ui/icons/user-round.tsx';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import MoreIcon from '@assets/icons/other/more.svg?react';
import Logo from '@assets/logo/logo.svg?react';

interface HeaderMenuItemProps extends LinkProps {
	className?: string;
	item: IHeaderMenuItemProps;
}

const HeaderMenuItem = (props: HeaderMenuItemProps) => {
	const { className, item } = props;
	const { windowWidth, breakpoints } = useWindowWidth();
	const isMobile = windowWidth < breakpoints.md; // Сравнение с брейкпоинтом 'md'

	const search = useSearch({
		strict: false,
	});

	const defaultIcons: { [key: string]: ReactElement } = {
		Profile: <UserRound />,
		Favorites: <Heart />,
		More: <MoreIcon />,
		Home: <Logo className={cn('-my-3 -ml-1 size-9')} />,
	};

	return (
		<Link
			to={item.to}
			{...(item.search && { search: { ...search, ...item.search } })}
			className={cn('inline-flex flex-1 justify-center md:flex-none', className)}
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
