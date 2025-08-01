import { greatCircle, length, point } from '@turf/turf';
import { getRouteProgress } from '@lib/getMapRouteProgress.ts';
import type { FeatureCollection } from 'geojson';
import type { IFlight } from '@/types/flight.types.ts';

export const getFlightFeatures = (flight?: IFlight) => {
	if (!flight) {
		return {
			aircraft: null,
			solidRoute: null,
			dashedRoute: null,
		};
	}

	const { from, to, flightNumber } = flight.flight;
	const { completedPercentage } = flight.route;
	const origin = point([from.coordinates.longitude, from.coordinates.latitude]);
	const destination = point([to.coordinates.longitude, to.coordinates.latitude]);

	const route = greatCircle(origin, destination, {
		properties: {
			name: `Flight ${flightNumber} from ${from.city} (${from.airport}) to ${to.city} (${to.airport})`,
			flightNumber,
		},
		npoints: 128,
	});
	const totalLength = length(route, { units: 'kilometers' });
	const completedLength = totalLength * (completedPercentage / 100);

	const routeLength = {
		total: totalLength,
		completed: completedLength,
	};

	const { aircraftPointFeature, solidRouteFeature, dashedRouteFeature } = getRouteProgress(
		route,
		routeLength.completed,
	);

	if (!aircraftPointFeature || !solidRouteFeature || !dashedRouteFeature) {
		console.warn('[useMapData] No route progress data available');

		return {
			aircraft: null,
			solidRoute: null,
			dashedRoute: null,
		};
	}

	return {
		aircraft: {
			type: 'FeatureCollection',
			features: [aircraftPointFeature],
		} as FeatureCollection,
		solidRoute: {
			type: 'FeatureCollection',
			features: [solidRouteFeature],
		} as FeatureCollection,
		dashedRoute: {
			type: 'FeatureCollection',
			features: [dashedRouteFeature],
		} as FeatureCollection,
	};
};
