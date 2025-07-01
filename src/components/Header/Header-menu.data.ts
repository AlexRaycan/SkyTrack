import { UserRound } from '@components/animate-ui/icons/user-round.tsx';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import MoreIcon from '@assets/icons/other/more.svg?react';
import Logo from '@assets/logo/logo.svg?react';
import type { ReactNode } from 'react';

export interface IHeaderMenuItemProps {
	label: string;
	to: string;
	icon: ReactNode;
}

export const HEADER_MENU: IHeaderMenuItemProps[] = [
	{
		label: 'Home',
		to: '/',
		icon: Logo,
	},
	{
		label: 'Profile',
		to: '/profile',
		icon: UserRound,
	},
	{
		label: 'Favorites',
		to: '/favorites',
		icon: Heart,
	},
	{
		label: 'More',
		to: '/more',
		icon: MoreIcon,
	},
];
