import { cn } from '@/lib/utils.ts';
import { memo } from 'react';
import type { IFlightLocation } from '@/types/types.ts';

interface CityProps {
	className?: string;
	departure: IFlightLocation;
}

const City = memo(function City({ ...props }: CityProps) {
	const { className, departure } = props;

	return (
		<div className={cn(className, 'inline-flex flex-col items-start justify-end gap-1')}>
			<span className={cn(`${className}__departure-city`, 'text-base leading-none font-normal')}>
				{departure.city}
			</span>
			<span className={cn(`${className}__departure-airport`, 'text-5xl leading-none font-medium uppercase')}>
				{departure.airport}
			</span>
		</div>
	);
});

export default City;
