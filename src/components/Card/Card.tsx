import { cn } from '@/lib/utils.ts';
import { memo } from 'react';
import type { IFlight } from '@/types/types.ts';
import City from '@components/City';
import { Link } from '@tanstack/react-router';
import Tag from '@components/Tag';
import AddToFavoriteButton from '@components/Card/AddToFavoriteButton';
import { useFlightSelectionState } from '@/hooks/useFlightSelectionState.ts';
import FlightStatus from '@components/FlightStatus';
import Skeleton from '@components/Skeleton';

interface ICardProps {
	className?: string;
	flight: IFlight;
	isLoading?: boolean;
}

const Card = memo(function Card({ ...props }: ICardProps) {
	const { className, flight, isLoading } = props;
	const { isActive } = useFlightSelectionState(flight);

	// ! TODO: раскидать по компонентам

	return (
		<Link
			to="."
			// search={isActive ? {} : { flightNumber: flight.flight.flightNumber }}
			search={(prev) => ({ ...prev, flightNumber: isActive ? undefined : flight.flight.flightNumber })}
		>
			<div
				className={cn(
					'w-full rounded-3xl bg-transparent p-1',
					'hover:scale-95',
					isActive && 'from-destructive to-accent bg-gradient-to-r',
					'transition-all duration-200',
					className,
				)}
			>
				<div
					className={cn(
						'bg-background hover:bg-background-hover relative flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-5',
						'transition-all duration-200',
					)}
				>
					{isLoading ? (
						<Skeleton />
					) : (
						<>
							<div className={cn('card__row--wrapper', 'flex justify-between', 'animate-fade-in')}>
								<div
									className={cn(
										'card__info--wrapper',
										'inline-flex items-center justify-start gap-3',
									)}
								>
									<img
										className={cn('card__image', 'overflow-hidden rounded-full bg-white')}
										src={flight.flight.airline.logo}
										alt=""
										width="44"
										height="44"
										loading="lazy"
									/>
									<h3 className={cn('card__flight-number', 'text-base')}>
										{flight.flight.flightNumber}
									</h3>
								</div>
								<div className={cn('inline-flex items-center justify-end gap-3 text-xs')}>
									<Tag label={flight.flight.callSign} />
									<Tag label={flight.flight.typeCode} />
									<AddToFavoriteButton flightNumber={flight.flight.flightNumber} />
								</div>
							</div>
							<div className={cn('card__row--wrapper', 'flex gap-3')}>
								<City
									className={cn('card__city__departure')}
									departure={flight.flight.from}
								/>
								<FlightStatus
									className={cn('mt-10')}
									percentage={flight.route.completedPercentage}
								/>
								<City
									className={cn('card__city__arrival')}
									departure={flight.flight.to}
								/>
							</div>
						</>
					)}
				</div>
			</div>
		</Link>
	);
});

export default Card;
