import { cn } from '@/lib/utils.ts';
import Button from '@components/Button';
import { UserRound } from '@components/animate-ui/icons/user-round.tsx';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import Logo from '@assets/logo/logo.svg?react';
import SwitchTheme from '@/layouts/Layout/SwitchTheme';
import { Link } from '@tanstack/react-router';

interface HeaderProps {
	className?: string;
}

const Header = (props: HeaderProps) => {
	const { className } = props;

	return (
		<nav className={cn('fixed top-10 right-10 z-50 flex items-center justify-end gap-2', className)}>
			<ol className={'bg-secondary flex items-center justify-end gap-2 overflow-hidden rounded-full'}>
				<li>
					<Link to="/">
						<Button
							title={'Home'}
							size={'large'}
							isHorizontal
							isTransparent
							icon={
								<Logo
									height={40}
									width={40}
								/>
							}
						/>
					</Link>
				</li>
				<li>
					<Button
						title={'Profile'}
						size={'large'}
						isHorizontal
						isTransparent
						icon={
							<UserRound
								height={24}
								width={24}
							/>
						}
					/>
				</li>
				<li>
					<Button
						title={'Favorites'}
						size={'large'}
						isHorizontal
						isTransparent
						icon={
							<Heart
								height={24}
								width={24}
							/>
						}
					/>
				</li>
			</ol>
			<ol>
				<li>
					<SwitchTheme />
				</li>
			</ol>
		</nav>
	);
};

export default Header;
