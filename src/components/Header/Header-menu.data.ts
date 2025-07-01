export interface IHeaderMenuItemProps {
	label: string;
	to: string;
}

export const HEADER_MENU: IHeaderMenuItemProps[] = [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Profile',
		to: '/profile',
	},
	{
		label: 'Favorites',
		to: '/favorites',
	},
];
