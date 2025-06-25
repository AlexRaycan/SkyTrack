import { cn } from '@/helpers/classNames';
import './Card.css';
import { memo, useMemo } from 'react';
import type { IFlight } from '@/types/types.ts';
import City from '@components/City';
import { Link, useSearch } from '@tanstack/react-router';

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

	const infoWrapperStyles = useMemo(() => 'inline-flex items-center justify-start gap-3', []);

	return (
		<Link
			to="/"
			search={isActive ? {} : { flightNumber: flight.flight.flightNumber }}
			className={cn(
				className,
				'card',
				'flex min-h-48 flex-col justify-between overflow-hidden rounded-3xl bg-zinc-900 p-5 text-white',
				isActive && 'active',
			)}
		>
			<div className={cn('card__row--wrapper', 'flex justify-between')}>
				<div className={cn('card__info--wrapper', infoWrapperStyles)}>
					<img
						className={cn('card__image', 'overflow-hidden rounded-full bg-white')}
						src={flight.flight.airline.logo}
						alt=""
						width="44"
						height="44"
						loading="lazy"
					/>
					<h2 className={cn('card__flight-number', 'text-base')}>{flight.flight.flightNumber}</h2>
				</div>
				<div className={cn('card__info--wrapper', infoWrapperStyles)}>
					<div className={cn('inline-flex items-center justify-end gap-3 text-xs')}>
						<span className={cn('inline-flex justify-center gap-3 rounded-full bg-gray-100/10 px-3 py-2')}>
							{flight.flight.callSign}
						</span>
						<span className={cn('inline-flex justify-center gap-3 rounded-full bg-gray-100/10 px-3 py-2')}>
							{flight.flight.typeCode}
						</span>
					</div>
				</div>
			</div>
			<div className={cn('card__row--wrapper', 'flex gap-3')}>
				<City
					className={cn('card__city__departure')}
					departure={flight.flight.from}
				/>
				<div
					className={cn('card-progress-bar', 'relative mt-10 h-1 w-full gap-3 rounded-full bg-gray-100/10')}
				/>
				<City
					className={cn('card__city__arrival')}
					departure={flight.flight.to}
				/>
			</div>
		</Link>
	);
});

export default Card;
