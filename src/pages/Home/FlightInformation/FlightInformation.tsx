import { memo, useMemo } from 'react';
import { cn } from '@/helpers/classNames';
import 'flag-icons/css/flag-icons.min.css';
import type { IAirlineGradient } from '@/types/types.ts';
import { useSearch } from '@tanstack/react-router';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import Button from '@components/Button';
import CloseIcon from '@assets/icons/action/close.svg?react';
import Section from '@components/Section';
import Cell from '@components/Cell';
import FICity from '@pages/Home/FlightInformation/FICity';
import FICell from '@pages/Home/FlightInformation/FICell';
import FIActionButtons from '@pages/Home/FlightInformation/FIActionButtons';

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
		flight && (
			<aside
				className={cn(
					className,
					'z-10 mt-10 mr-10 mb-10 flex max-h-dvh w-lg flex-col gap-4 overflow-hidden rounded-3xl bg-[var(--color-dark)]',
				)}
			>
				<h2 hidden>{`${flight?.flight.flightNumber} information`}</h2>
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
							<h3 className={cn('text-3xl text-[var(--color-accent)]')}>{flight?.flight.flightNumber}</h3>
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
					<h3 hidden>Additional flight information</h3>
					<Section isColumn>
						<h4 hidden>Main flight information</h4>
						<Cell isInteractive={false}>
							<FICity city={flight?.flight.from} />
							<FICity city={flight?.flight.to} />
						</Cell>
						<Cell
							isBG
							isColumn
							gap={6}
							className={cn('text-[var(--color-text-secondary)]')}
						>
							<div>Progress bar</div>
							<Cell
								isBetween
								className={cn('px-4')}
								isInteractive={false}
							>
								<div className={cn('space-x-2')}>
									<span>{flight?.route.passed}</span>
									<span>·</span>
									<span>3h 1m</span>
								</div>
								<div className={cn('space-x-2')}>
									<span>{flight?.route.remaining}</span>
									<span>·</span>
									<span>59m</span>
								</div>
							</Cell>
						</Cell>
						<Cell isInteractive={false}>
							<FICell
								title={'Scheduled'}
								value={'08:15'}
							/>
							{/*<span>{flight?.flight.from.time.scheduled}</span>*/}
							<FICell
								title={'Actual'}
								value={'08:24'}
							/>
							{/*<span>{flight?.flight.from.time.actual}</span>*/}
						</Cell>
						<Cell isInteractive={false}>
							<FICell
								title={'Scheduled'}
								value={'13:25'}
							/>
							{/*<span>{flight?.flight.to.time.scheduled}</span>*/}
							<FICell
								title={'Estimated'}
								value={'13:23'}
							/>
							{/*<span>{flight?.flight.to.time.estimated}</span>*/}
						</Cell>
					</Section>
					<Section
						isColumn
						header={<h4>Flight information</h4>}
					>
						<Cell isInteractive={false}>
							<FICell
								title={'Aircraft'}
								isTitleHidden
								value={flight?.flightInfo.aircraft}
							/>
							<FICell
								title={'Country'}
								isTitleHidden
							>
								<span className={cn(`fi fi-${flight?.flightInfo.country.code.toLowerCase()}`)}></span>
								<span>{flight?.flightInfo.country.name}</span>
							</FICell>
						</Cell>
						<Cell isInteractive={false}>
							<FICell
								title={'Speed'}
								value={`${flight?.flightInfo.speed} km/h`}
							/>
							<FICell
								title={'Altitude'}
								value={`${flight?.flightInfo.altitude} m`}
							/>
						</Cell>
					</Section>
					<FIActionButtons />
				</section>
			</aside>
		)
	);
});

export default FlightInformation;
