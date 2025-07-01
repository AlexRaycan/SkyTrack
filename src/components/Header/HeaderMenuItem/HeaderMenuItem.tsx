import { cn } from '@/helpers/classNames';
import Button from '@components/Button';
import { Link } from '@tanstack/react-router';
import type { IHeaderMenuItemProps } from '@components/Header/Header-menu.data.ts';

interface HeaderMenuItemProps {
	className?: string;
	item: IHeaderMenuItemProps;
}

const HeaderMenuItem = (props: HeaderMenuItemProps) => {
	const { className, item } = props;

	return (
		<Link
			to={item.to}
			className={cn('inline-flex flex-1 justify-center md:flex-none', className)}
			activeProps={linkActiveStyle}
		>
			<Button
				title={'Profile'}
				size={'large'}
				isHorizontal={!isMobile}
				isTransparent
				icon={item.icon}
			>
				{item.label}
			</Button>
		</Link>
	);
};

export default HeaderMenuItem;
