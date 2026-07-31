import type { IFlight } from '@/types/flight.types.ts';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import { getFlightFeatures } from '@lib/getFlightFeatures.ts';
import { useMemo } from 'react';

export const useMapData = (flight?: IFlight) => {
	const flightNumber = flight?.flight.flightNumber;

	return useMemo(() => {
		const activeFlight = FLIGHTS.find((candidate) => candidate.flight.flightNumber === flightNumber);
		const inactiveFlights = FLIGHTS.filter((candidate) => candidate.flight.flightNumber !== flightNumber).map(
			(candidate) => ({
				flightNumber: candidate.flight.flightNumber,
				...getFlightFeatures(candidate),
			}),
		);

		return {
			...getFlightFeatures(activeFlight),
			inactiveFlights,
		};
	}, [flightNumber]);
};
