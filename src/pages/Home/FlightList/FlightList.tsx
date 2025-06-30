import { memo } from 'react';
import { cn } from '@/lib/utils.ts';
import { FLIGHTS } from './Flight.data.ts';
import Card from '@components/Card';

interface FlightListProps {
	className?: string;
}

const FlightList = memo(function FlightList({ ...props }: FlightListProps) {
	const { className } = props;

	return (
		<section
			className={cn(
				className,
				'fixed',
				'scrollbar-hidden z-10 flex max-h-dvh flex-col gap-3 overflow-auto pt-10 pb-10 pl-9',
			)}
		>
			<h2 hidden>Flight List</h2>
			{FLIGHTS.map((flight) => (
				<Card
					key={flight.flight.flightNumber}
					flight={flight}
				/>
			))}
		</section>
	);
});

export default FlightList;
