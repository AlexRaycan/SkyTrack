import type { IFlight } from '@/types/flight.types.ts';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';
import { getFlightFeatures } from '@lib/getFlightFeatures.ts';

export const useMapData = (flight?: IFlight) => {
	const inactiveFlights = FLIGHTS.filter((fl) => fl.flight.flightNumber !== flight?.flight.flightNumber).map((fl) =>
		getFlightFeatures(fl),
	);

	return {
		...getFlightFeatures(flight),
		inactiveFlights,
	};
};
