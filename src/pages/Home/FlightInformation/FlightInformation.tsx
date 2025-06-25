import { memo, useMemo } from 'react';
import { cn } from '@/helpers/classNames';
import type { IAirlineGradient } from '@/types/types.ts';
import { useSearch } from '@tanstack/react-router';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import Button from '@components/Button';
import CloseIcon from '@assets/icons/action/Close.svg?react';
import Section from '@components/Section';

interface FlightInformationProps {
	className?: string;
}

const FlightInformation = memo(function FlightInformation({ ...props }: FlightInformationProps) {
	const { className } = props;
	const selected = useSearch({
		from: '/',
		select: (search) => {
			const { flightNumber } = search as { flightNumber: string };

			return flightNumber;
		},
	});

	const flight = useMemo(() => FLIGHTS.find((fl) => fl.flight.flightNumber === selected), [selected]);

	const gradient = useMemo<IAirlineGradient>(
		() => flight?.flight.airline.gradient ?? { from: '#101828', to: '#101828' },
		[flight?.flight.airline.gradient],
	);

	return (
		<section
			className={cn(
				className,
				'z-10 mt-10 mr-10 mb-10 flex max-h-dvh w-lg flex-col gap-4 overflow-hidden rounded-3xl bg-[var(--color-dark)]',
			)}
		>
			<h1 hidden>{`${flight?.flight.flightNumber} information`}</h1>
			<section
				className="inline-flex w-full flex-col gap-3 p-5"
				style={{
					background: `linear-gradient(to bottom, ${gradient.from}, ${gradient.to})`,
				}}
			>
				<header
					className={cn(
						'inline-flex w-full items-center justify-between rounded-2xl bg-[var(--color-dark)] p-5',
					)}
				>
					<div>
						<h2 className={cn('text-3xl text-[var(--color-accent)]')}>{flight?.flight.flightNumber}</h2>
						<p>{flight?.flight.airline.name}</p>
					</div>
					<Button
						icon={<CloseIcon />}
						onClick={() => console.debug('Close information')}
					/>
				</header>
				<img
					className={cn('h-52')}
					src={flight?.flightInfo.photo ?? ''}
					alt={`${flight?.flightInfo.aircraft} by ${flight?.flight.airline.name}`}
					width=""
					height=""
					loading="lazy"
				/>
			</section>
			<section className={cn('inline-flex flex-col gap-3 overflow-auto p-4')}>
				<h2 hidden>Additional flight information</h2>
				<Section className={cn('inline-flex w-full flex-col gap-1 overflow-hidden rounded-3xl')}>
					<h3 hidden>Main flight information</h3>
					<div className={cn('inline-flex w-full justify-between gap-1')}>
						<div
							className={cn(
								'inline-flex w-full flex-col items-center justify-center bg-[var(--color-primary)]',
							)}
						>
							<h4>{flight?.flight.from.airport}</h4>
							<div>
								<p>{flight?.flight.from.city}</p>
								<p>{flight?.flight.from.timezone}</p>
							</div>
						</div>
						<div
							className={cn(
								'inline-flex w-full flex-col items-center justify-center bg-[var(--color-primary)]',
							)}
						>
							<h4>{flight?.flight.to.airport}</h4>
							<div>
								<p>{flight?.flight.to.city}</p>
								<p>{flight?.flight.to.timezone}</p>
							</div>
						</div>
					</div>
					<div>
						<div>Progress bar</div>
						<div>
							<span>{flight?.route.passed}</span>
							<span>·</span>
							<span>3h 1m</span>
						</div>
					</div>
					<div>
						<span>{flight?.route.remaining}</span>
						<span>·</span>
						<span>59m</span>
					</div>
					<div>
						<div>
							<h4>Scheduled</h4>
							<span>{flight?.flight.from.time.scheduled}</span>
						</div>
						<div>
							<h4>Actual</h4>
							<span>{flight?.flight.from.time.actual}</span>
						</div>
					</div>
					<div>
						<section>
							<h4>Scheduled</h4>
							<span>{flight?.flight.to.time.scheduled}</span>
						</section>
						<section>
							<h4>Estimated</h4>
							<span>{flight?.flight.to.time.estimated}</span>
						</section>
					</div>
				</Section>
				<Section>
					<h3>Flight information</h3>
					<div>
						<section>
							<h4 hidden>Aircraft</h4>
							<span>{flight?.flightInfo.aircraft}</span>
						</section>
						<section>
							<h4 hidden>Country</h4>
							<span>{`${flight?.flightInfo.country.flag} ${flight?.flightInfo.country.name}`}</span>
						</section>
					</div>
					<div>
						<section>
							<h4>Speed</h4>
							<span>{flight?.flightInfo.speed}</span>
						</section>
						<section>
							<h4>Altitude</h4>
							<span>{flight?.flightInfo.altitude}</span>
						</section>
					</div>
				</Section>
				<div>
					<Button>Route</Button>
					<Button>Follow</Button>
					<Button>Share</Button>
					<Button>More</Button>
				</div>
			</section>
		</section>
	);
});

export default FlightInformation;
