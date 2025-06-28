import { memo } from 'react';
import { cn } from '@/helpers/classNames';
import Cell from '@components/Cell';
import type { IFlightLocation } from '@/types/types.ts';

interface FICityProps {
	className?: string;
	city: IFlightLocation;
}

const FICity = memo(function FICity({ ...props }: FICityProps) {
	const { className, city } = props;

	return (
		<Cell
			className={cn(className, 'text-center')}
			isBG
			isColumn
			isCentered
			gap={4}
		>
			<h5 className={cn('text-5xl leading-none font-medium uppercase')}>{city.airport}</h5>
			<Cell
				isCentered
				isColumn
				gap={3}
			>
				<p className={cn('text-2xl leading-none')}>{city.city}</p>
				<p className={cn('text-muted-foreground leading-none')}>{city.timezone}</p>
			</Cell>
		</Cell>
	);
});

export default FICity;
