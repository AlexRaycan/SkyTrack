import { memo, useMemo, useState } from 'react';
import { cn } from '@/lib/utils.ts';
import { FLIGHTS } from './Flight.data.ts';
import Card from '@components/Card';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useFlightSelectionState } from '@/hooks/useFlightSelectionState.ts';
import Skeleton from '@components/Skeleton';

interface FlightListProps {
	className?: string;
}

const FlightList = memo(function FlightList({ ...props }: FlightListProps) {
	const { className } = props;
	const [isLoading, setIsLoading] = useState(false);
	const favorites = useAppSelector((state) => state.favorites);

	const { isFavorite } = useFlightSelectionState();

	const [filter, setFilter] = useState<string>('');
	const filteredFlights = useMemo(() => {
		let flights = FLIGHTS;

		if (isFavorite) {
			flights = flights.filter((flight) => favorites.includes(flight.flight.flightNumber));
		}

		if (!filter) return flights;

		return FLIGHTS.filter((flight) => {
			const flightInfo = [
				flight.flight.flightNumber,
				/*flight.flight.typeCode,
				flight.flight.callSign,
				flight.flight.airline.name,
				flight.flight.from.city,
				flight.flight.from.airport,
				flight.flight.to.city,
				flight.flight.to.airport,
				flight.flightInfo.aircraft,
				flight.flightInfo.country.code,
				flight.flightInfo.country.name,*/
			]
				.join(' ')
				.toLowerCase();

			return flightInfo.includes(filter.toLowerCase());
		});
	}, [favorites, filter, isFavorite]);

	return (
		<section
			className={cn(
				className,
				'scrollbar-hidden z-10 flex max-h-full w-dvw flex-col gap-3 overflow-auto',
				'px-5 pt-20 pb-44',
				'md:w-1/5 md:p-0 md:pb-5',
				'2xl:pb-10',
				'pointer-events-auto',
			)}
		>
			<h2 hidden>Flight List</h2>
			<form className={'relative flex max-h-16 min-h-16 flex-1'}>
				<label
					aria-label={'Flight filter'}
					className={'relative flex flex-1'}
				>
					<input
						className={cn('bg-background text-foreground min-w-full rounded-full px-4 py-2 text-sm')}
						id={'flightFilter'}
						type="text"
						name="filter flight"
						placeholder="Flight number, city arriving, destination, airline, aircraft model and so on"
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
					/>
				</label>
			</form>
			{isLoading && Array.from({ length: 10 }).map((_, idx) => <Skeleton key={idx} />)}
			{!isLoading &&
				filteredFlights.map((flight) => (
					<Card
						key={flight.flight.flightNumber}
						flight={flight}
					/>
				))}
		</section>
	);
});

export default FlightList;
