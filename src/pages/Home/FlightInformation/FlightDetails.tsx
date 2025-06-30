import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import 'flag-icons/css/flag-icons.min.css';
import { useSearch } from '@tanstack/react-router';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import Section from '@components/Section';
import Cell from '@components/Cell';
import FlightDetailsCity from '@pages/Home/FlightInformation/FlightDetailsCity';
import FlightDetailsCell from '@pages/Home/FlightInformation/FlightDetailsCell';
import FlightDetailsActionButtons from '@pages/Home/FlightInformation/FlightDetailsActionButtons';
import FlightDetailsHeader from '@pages/Home/FlightInformation/FlightDetailsHeader';

interface FlightInformationProps {
	className?: string;
}

const FlightDetails = memo(function FlightInformation({ ...props }: FlightInformationProps) {
	const { className } = props;
	const selected = useSearch({
		from: '/',
		select: (search) => {
			const { flightNumber } = search as { flightNumber: string };

			return flightNumber;
		},
	});

	const flight = useMemo(() => FLIGHTS.find((fl) => fl.flight.flightNumber === selected), [selected]);

	return (
		flight && (
			<div
				className={cn(
					'fixed top-1/2 right-10 z-10 max-h-dvh w-lg -translate-y-1/2',
					'scrollbar-hidden overflow-auto',
				)}
			>
				<aside className={cn(className, 'bg-secondary flex flex-col gap-4 overflow-hidden rounded-3xl')}>
					<h2 hidden>{`${flight.flight.flightNumber} information`}</h2>
					<FlightDetailsHeader flight={flight} />
					<section
						className={cn('inline-flex flex-col gap-3 p-4')}
						style={{
							flex: 1,
						}}
					>
						<h3 hidden>Additional flight information</h3>
						<Section isColumn>
							<h4 hidden>Main flight information</h4>
							<Cell isInteractive={false}>
								<FlightDetailsCity city={flight.flight.from} />
								<FlightDetailsCity city={flight.flight.to} />
							</Cell>
							<Cell
								isBG
								isColumn
								gap={6}
								className={cn('text-muted-foreground')}
							>
								<div>Progress bar</div>
								<Cell
									isBetween
									className={cn('px-4')}
									isInteractive={false}
								>
									<div className={cn('space-x-2')}>
										<span>{flight.route.passed}</span>
										<span>·</span>
										<span>3h 1m</span>
									</div>
									<div className={cn('space-x-2')}>
										<span>{flight.route.remaining}</span>
										<span>·</span>
										<span>59m</span>
									</div>
								</Cell>
							</Cell>
							<Cell isInteractive={false}>
								<FlightDetailsCell
									title={'Scheduled'}
									value={'08:15'}
								/>
								{/*<span>{flight.flight.from.time.scheduled}</span>*/}
								<FlightDetailsCell
									title={'Actual'}
									value={'08:24'}
								/>
								{/*<span>{flight.flight.from.time.actual}</span>*/}
							</Cell>
							<Cell isInteractive={false}>
								<FlightDetailsCell
									title={'Scheduled'}
									value={'13:25'}
								/>
								{/*<span>{flight.flight.to.time.scheduled}</span>*/}
								<FlightDetailsCell
									title={'Estimated'}
									value={'13:23'}
								/>
								{/*<span>{flight.flight.to.time.estimated}</span>*/}
							</Cell>
						</Section>
						<Section
							isColumn
							header={<h4>Flight information</h4>}
						>
							<Cell isInteractive={false}>
								<FlightDetailsCell
									title={'Aircraft'}
									isTitleHidden
									value={flight.flightInfo.aircraft}
								/>
								<FlightDetailsCell
									title={'Country'}
									isTitleHidden
									gap={4}
								>
									<span
										className={cn(`fi fi-${flight.flightInfo.country.code.toLowerCase()}`)}
									></span>
									<span>{flight.flightInfo.country.name}</span>
								</FlightDetailsCell>
							</Cell>
							<Cell isInteractive={false}>
								<FlightDetailsCell
									title={'Speed'}
									value={`${flight.flightInfo.speed} km/h`}
								/>
								<FlightDetailsCell
									title={'Altitude'}
									value={`${flight.flightInfo.altitude} m`}
								/>
							</Cell>
						</Section>
						<FlightDetailsActionButtons />
					</section>
				</aside>
			</div>
		)
	);
});

export default FlightDetails;
