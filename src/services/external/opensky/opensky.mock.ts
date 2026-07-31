import type { IMapBounds } from '@/types/map.types.ts';
import type { IOpenSkyFlight, IProcessedFlights } from './opensky.types.ts';

const MOCK_FLIGHTS = [
	['DLH410', 'Germany'],
	['SAS903', 'Sweden'],
	['JAL042', 'Japan'],
	['KAL081', 'Republic of Korea'],
	['FIN073', 'Finland'],
	['UAL960', 'United States'],
	['AFR276', 'France'],
	['BAW005', 'United Kingdom'],
	['THA910', 'Thailand'],
	['CPA830', 'Hong Kong'],
	['ANA106', 'Japan'],
	['SIA012', 'Singapore'],
] as const;

const interpolate = (minimum: number, maximum: number, ratio: number) => minimum + (maximum - minimum) * ratio;

export const createMockFlights = (bbox: IMapBounds): IProcessedFlights => {
	const now = Math.floor(Date.now() / 1000);
	const latitudeRange = Math.max(bbox.lamax - bbox.lamin, 0.1);
	const longitudeRange = Math.max(bbox.lomax - bbox.lomin, 0.1);

	const flights: IOpenSkyFlight[] = MOCK_FLIGHTS.map(([callsign, originCountry], index) => {
		const horizontalRatio = ((index * 37) % 97) / 100;
		const verticalRatio = ((index * 61 + 17) % 91) / 100;
		const latitude = interpolate(bbox.lamin, bbox.lamin + latitudeRange, verticalRatio);
		const longitude = interpolate(bbox.lomin, bbox.lomin + longitudeRange, horizontalRatio);

		return {
			icao24: `demo${index.toString(16).padStart(2, '0')}`,
			callsign,
			originCountry,
			position: {
				latitude,
				longitude,
				baroAltitude: 8_900 + index * 180,
				geoAltitude: 9_050 + index * 180,
			},
			time: {
				positionTime: now - index * 7,
				lastContact: now - index * 3,
			},
			movement: {
				onGround: false,
				velocity: 210 + index * 4,
				heading: (24 + index * 31) % 360,
				verticalRate: index % 3 === 0 ? 2.5 : 0,
			},
			details: {
				squawk: `${4300 + index}`,
				spi: false,
				sensors: null,
				positionSource: 0,
				category: 3,
			},
		};
	});

	return {
		flights,
		timestamp: now,
		total: flights.length,
	};
};
