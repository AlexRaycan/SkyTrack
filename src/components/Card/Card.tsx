import { cn } from '@/lib/utils.ts';
import './Card.css';
import { memo, useMemo } from 'react';
import type { IFlight } from '@/types/types.ts';
import City from '@components/City';
import { Link, useSearch } from '@tanstack/react-router';
import Tag from '@components/Tag';

interface ICardProps {
	className?: string;
	flight: IFlight;
}

const Card = memo(function Card({ ...props }: ICardProps) {
	const { className, flight } = props;
	const selected = useSearch({
		from: '/',
		select: (search) => {
			const { flightNumber } = search as { flightNumber: string };

			return flightNumber;
		},
	});

	const isActive = useMemo(() => selected === flight.flight.flightNumber, [flight.flight.flightNumber, selected]);

	// ! TODO: раскидать по компонентам
	// ! Сделать градиентную обводку для карточки

	return (
		<Link
			to="/"
			search={isActive ? {} : { flightNumber: flight.flight.flightNumber }}
		>
			<div
				className={cn(
					className,
					'card',
					'w-md rounded-3xl bg-transparent p-1',
					'hover:scale-95',
					isActive && 'from-destructive to-accent bg-gradient-to-r',
					'transition-all duration-200',
				)}
			>
				<div
					className={cn(
						'bg-background hover:bg-background-hover flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl p-5',
						'transition-all duration-200',
					)}
				>
					<div className={cn('card__row--wrapper', 'flex justify-between')}>
						<div className={cn('card__info--wrapper', 'inline-flex items-center justify-start gap-3')}>
							<img
								className={cn('card__image', 'overflow-hidden rounded-full bg-white')}
								src={flight.flight.airline.logo}
								alt=""
								width="44"
								height="44"
								loading="lazy"
							/>
							<h3 className={cn('card__flight-number', 'text-base')}>{flight.flight.flightNumber}</h3>
						</div>
						<div className={cn('inline-flex items-center justify-end gap-3 text-xs')}>
							<Tag label={flight.flight.callSign} />
							<Tag label={flight.flight.typeCode} />
						</div>
					</div>
					<div className={cn('card__row--wrapper', 'flex gap-3')}>
						<City
							className={cn('card__city__departure')}
							departure={flight.flight.from}
						/>
						<div
							className={cn('card-progress-bar', 'bg-muted relative mt-10 h-1 w-full gap-3 rounded-full')}
						/>
						<City
							className={cn('card__city__arrival')}
							departure={flight.flight.to}
						/>
					</div>
				</div>
			</div>
		</Link>
	);
});

export default Card;
