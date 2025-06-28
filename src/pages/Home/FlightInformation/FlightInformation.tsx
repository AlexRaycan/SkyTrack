import { memo, useMemo } from 'react';
import { cn } from '@/helpers/classNames';
import 'flag-icons/css/flag-icons.min.css';
import { useSearch } from '@tanstack/react-router';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import Section from '@components/Section';
import Cell from '@components/Cell';
import FICity from '@pages/Home/FlightInformation/FICity';
import FICell from '@pages/Home/FlightInformation/FICell';
import FIActionButtons from '@pages/Home/FlightInformation/FIActionButtons';
import FIHeader from '@pages/Home/FlightInformation/FIHeader';

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

	return (
		flight && (
			<aside
				className={cn(
					className,
					'bg-secondary z-10 mt-10 mr-10 mb-10 flex max-h-dvh w-lg flex-col gap-4 overflow-hidden rounded-3xl',
				)}
			>
				<h2 hidden>{`${flight.flight.flightNumber} information`}</h2>
				<FIHeader flight={flight} />
				<section
					className={cn('inline-flex flex-col gap-3 overflow-auto p-4')}
					style={{
						flex: 1,
					}}
				>
					<h3 hidden>Additional flight information</h3>
					<Section isColumn>
						<h4 hidden>Main flight information</h4>
						<Cell isInteractive={false}>
							<FICity city={flight.flight.from} />
							<FICity city={flight.flight.to} />
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
							<FICell
								title={'Scheduled'}
								value={'08:15'}
							/>
							{/*<span>{flight.flight.from.time.scheduled}</span>*/}
							<FICell
								title={'Actual'}
								value={'08:24'}
							/>
							{/*<span>{flight.flight.from.time.actual}</span>*/}
						</Cell>
						<Cell isInteractive={false}>
							<FICell
								title={'Scheduled'}
								value={'13:25'}
							/>
							{/*<span>{flight.flight.to.time.scheduled}</span>*/}
							<FICell
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
							<FICell
								title={'Aircraft'}
								isTitleHidden
								value={flight.flightInfo.aircraft}
							/>
							<FICell
								title={'Country'}
								isTitleHidden
								gap={4}
							>
								<span className={cn(`fi fi-${flight.flightInfo.country.code.toLowerCase()}`)}></span>
								<span>{flight.flightInfo.country.name}</span>
							</FICell>
						</Cell>
						<Cell isInteractive={false}>
							<FICell
								title={'Speed'}
								value={`${flight.flightInfo.speed} km/h`}
							/>
							<FICell
								title={'Altitude'}
								value={`${flight.flightInfo.altitude} m`}
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
