import { memo } from 'react';
import { cn } from '@/lib/utils.ts';
import Cell from '@components/Cell';
import type { IFlightLocation } from '@/types/flight.types.ts';

interface FICityProps {
	className?: string;
	city: IFlightLocation;
}

const FlightDetailsCity = memo(function FICity({ ...props }: FICityProps) {
	const { className, city } = props;

	return (
		<Cell
			className={cn(className, 'text-center')}
			isBG
			isColumn
			isCentered
			gap={4}
		>
			<h5 className={cn('text-3xl leading-none font-medium uppercase', 'md:text-5xl')}>{city.airport}</h5>
			<Cell
				isCentered
				isColumn
				gap={3}
			>
				<p className={cn('text-xl leading-none md:text-2xl')}>{city.city}</p>
				<p className={cn('text-muted-foreground leading-none')}>{city.timezone}</p>
			</Cell>
		</Cell>
	);
});

export default FlightDetailsCity;
