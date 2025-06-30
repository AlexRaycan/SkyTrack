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
				// 'fixed pt-10 pb-10 pl-9',
				'scrollbar-hidden z-10 flex max-h-dvh w-dvw flex-col gap-3 overflow-auto',
				'px-5 pt-20 pb-32 md:p-0',
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
