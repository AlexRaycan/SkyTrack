import { memo } from 'react';
import { cn } from '@/helpers/classNames';
import Button from '@components/Button';
import Section from '@components/Section';

// Icons imports
import RouteIcon from '@assets/icons/other/route.svg?react';
import FollowIcon from '@assets/icons/action/follow.svg?react';
import ShareIcon from '@assets/icons/action/share.svg?react';
import MoreIcon from '@assets/icons/other/more.svg?react';

interface FIActionButtonsProps {
	className?: string;
}

const FIActionButtons = memo(function FIActionButtons({ ...props }: FIActionButtonsProps) {
	const { className } = props;

	return (
		<Section className={cn(className)}>
			<Button icon={<RouteIcon />}>{'Route'}</Button>
			<Button icon={<FollowIcon />}>Follow</Button>
			<Button icon={<ShareIcon />}>Share</Button>
			<Button icon={<MoreIcon />}>More</Button>
		</Section>
	);
});

export default FIActionButtons;
