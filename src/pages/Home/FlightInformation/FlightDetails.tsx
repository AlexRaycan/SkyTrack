import { memo, useMemo } from 'react';
import { cn } from '@/lib/utils.ts';
import 'flag-icons/css/flag-icons.min.css';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import Section from '@components/Section';
import Cell from '@components/Cell';
import FlightDetailsCity from '@pages/Home/FlightInformation/FlightDetailsCity';
import FlightDetailsCell from '@pages/Home/FlightInformation/FlightDetailsCell';
import FlightDetailsActionButtons from '@pages/Home/FlightInformation/FlightDetailsActionButtons';
import FlightDetailsHeader from '@pages/Home/FlightInformation/FlightDetailsHeader';
import { useWindowWidth } from '@/hooks/useWindowWidth.ts';
import { useFlightSelectionState } from '@/hooks/useFlightSelectionState.ts';
import FlightStatus from '@components/FlightStatus';
import AirplaneUpIcon from '@assets/icons/other/airplane-up.svg?react';
import { AnimatePresence, m } from 'framer-motion';

interface FlightInformationProps {
	className?: string;
}

const FlightDetails = memo(function FlightInformation({ ...props }: FlightInformationProps) {
	const { className } = props;
	const { windowWidth, breakpoints } = useWindowWidth();
	const isMobile = windowWidth < breakpoints.md; // Сравнение с брейкпоинтом 'md'

	const { flightNumber } = useFlightSelectionState();

	const flight = useMemo(() => FLIGHTS.find((fl) => fl.flight.flightNumber === flightNumber), [flightNumber]);

	if (!flight) {
		return null; // Возвращаем null, если полет не найден
	}

	return (
		<AnimatePresence mode="wait">
			<m.div
				initial={{ x: '100%' }}
				animate={{ x: 0 }}
				exit={{ x: '100%' }}
				transition={{
					type: 'tween',
					duration: 0.3,
					ease: 'easeOut',
				}}
				className={cn(
					isMobile && 'fixed inset-0 z-20 mb-12',
					'z-20 max-h-dvh min-w-full',
					'md:mb-5 md:min-w-lg md:rounded-3xl',
					'2xl:mb-10',
					'scrollbar-hidden overflow-auto',
					'pointer-events-auto',
				)}
			>
				<aside
					className={cn(className, 'bg-secondary flex flex-col overflow-hidden pb-6 md:gap-4 md:rounded-3xl')}
				>
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
							<Cell
								isInteractive={false}
								className={cn('relative')}
							>
								<FlightDetailsCity city={flight.flight.from} />
								<div
									className={cn(
										'bg-secondary text-accent absolute top-1/2 aspect-square -translate-y-1/2 rounded-full p-2',
									)}
								>
									<AirplaneUpIcon />
								</div>
								<FlightDetailsCity city={flight.flight.to} />
							</Cell>
							<Cell
								isBG
								isColumn
								gap={6}
								className={cn('text-muted-foreground')}
							>
								<FlightStatus
									percentage={flight.route.completedPercentage}
									className={cn('mb-4 md:mb-6')}
								/>
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
									alignment={'right'}
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
									alignment={'right'}
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
									alignment={'right'}
								>
									<div className={cn('block space-x-2')}>
										<span
											className={cn(`fi fi-${flight.flightInfo.country.code.toLowerCase()}`)}
										></span>
										<span>{flight.flightInfo.country.name}</span>
									</div>
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
									alignment={'right'}
								/>
							</Cell>
						</Section>
						<FlightDetailsActionButtons />
					</section>
				</aside>
			</m.div>
		</AnimatePresence>
	);
});

export default FlightDetails;
