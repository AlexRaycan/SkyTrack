import { memo, useMemo } from 'react';
import { cn } from '@/helpers/classNames';
import Button from '@components/Button';
import { X } from '@components/animate-ui/icons/x.tsx';
import type { IAirlineGradient, IFlight } from '@/types/types.ts';
import { Link } from '@tanstack/react-router';

interface FIHeaderProps {
	className?: string;
	flight: IFlight;
}

const FIHeader = memo(function FIHeader({ ...props }: FIHeaderProps) {
	const { className, flight } = props;

	const gradient = useMemo<IAirlineGradient>(
		() => flight.flight.airline.gradient ?? { from: '#101828', to: '#101828' },
		[flight.flight.airline.gradient],
	);

	return (
		<section
			className={cn('inline-flex w-full flex-col gap-3 p-5', className)}
			style={{
				background: `linear-gradient(to bottom, ${gradient.from}, ${gradient.to})`,
			}}
		>
			<header className={cn('bg-secondary inline-flex w-full items-center justify-between rounded-2xl p-5')}>
				<div className={cn('inline-flex flex-col gap-2')}>
					<h3 className={cn('text-accent text-3xl')}>{flight.flight.flightNumber}</h3>
					<p>{flight.flight.airline.name}</p>
				</div>
				<Link to="/">
					<Button
						icon={
							<X
								animateOnHover
								animateOnTap
							/>
						}
						onClick={() => console.debug('Close information')}
					/>
				</Link>
			</header>
			<img
				className={cn('h-52')}
				src={flight.flightInfo.photo ?? ''}
				alt={`${flight.flightInfo.aircraft} by ${flight.flight.airline.name}`}
				width=""
				height=""
				loading="lazy"
			/>
		</section>
	);
});

export default FIHeader;
