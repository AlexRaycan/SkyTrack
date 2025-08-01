import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import Button from '@components/Button';
import { X } from '@components/animate-ui/icons/x.tsx';
import type { IAirlineGradient, IFlight } from '@/types/flight.types.ts';
import { Link } from '@tanstack/react-router';
import AddToFavoriteButton from '@components/Card/AddToFavoriteButton';

interface FIHeaderProps {
	className?: string;
	flight: IFlight;
}

const FlightDetailsHeader = memo(function FIHeader({ ...props }: FIHeaderProps) {
	const { className, flight } = props;

	const gradient = useMemo<IAirlineGradient>(
		() => flight.flight.airline.gradient ?? { from: '#101828', to: '#101828' },
		[flight.flight.airline.gradient],
	);

	return (
		<section
			className={cn('inline-flex w-full flex-col gap-2 p-4 md:gap-3 md:p-5', className)}
			style={{
				background: `linear-gradient(to bottom, ${gradient.from}, ${gradient.to})`,
			}}
		>
			<header
				className={cn(
					'bg-secondary inline-flex w-full items-center justify-between rounded-lg p-4 md:rounded-2xl md:p-5',
				)}
			>
				<div className={cn('inline-flex flex-col gap-1 md:gap-2')}>
					<div className={cn('inline-flex items-center justify-start gap-2')}>
						<h3 className={cn('text-accent text-2xl font-medium', 'md:text-3xl')}>
							{flight.flight.flightNumber}
						</h3>
						<AddToFavoriteButton
							className={cn('-mt-1')}
							size={'small'}
							flightNumber={flight.flight.flightNumber}
						/>
					</div>
					<p>{flight.flight.airline.name}</p>
				</div>
				<Link
					to="."
					search={(prev) => ({ ...prev, flightNumber: undefined })}
				>
					<Button
						title={'Close information'}
						icon={
							<X
								animateOnHover
								animateOnTap
							/>
						}
					/>
				</Link>
			</header>
			<img
				className={cn('max-h-44 object-contain md:max-h-52')}
				src={flight.flightInfo.photo ?? ''}
				alt={`${flight.flightInfo.aircraft} by ${flight.flight.airline.name}`}
				width=""
				height=""
				loading="lazy"
			/>
		</section>
	);
});

export default FlightDetailsHeader;
