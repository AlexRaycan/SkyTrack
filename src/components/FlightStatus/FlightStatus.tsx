import { memo } from 'react';
import { cn } from '@/lib/utils';

import AirplaneIcon from '@assets/icons/other/airplane.svg?react';

import './FlightStatus.css';

interface FlightStatusProps {
	className?: string;
	percentage?: number; // Optional prop for percentage completion
}

const FlightStatus = memo(function FlightStatus(props: FlightStatusProps) {
	const { className, percentage } = props;
	const progressBarStyle = percentage ? { width: `${percentage}%` } : {};

	return (
		<div className={cn('bg-muted relative h-1 w-full gap-3 rounded-full', className)}>
			<div
				className={cn('card-progress-bar transition-all duration-500 ease-in-out')}
				style={progressBarStyle}
			/>
			<AirplaneIcon
				className={cn(
					'text-foreground absolute top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out',
				)}
				style={{ left: `${percentage}%` }}
			/>
		</div>
	);
});

export default FlightStatus;
