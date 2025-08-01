import axios from 'axios';
import type { IMapBounds } from '@/types/map.types.ts';
import type {
	IOpenSkyFlight,
	IOpenskyRawResponse,
	IOpenskyStateArray,
	IProcessedFlights,
} from '@/services/external/opensky/opensky.types.ts';

class OpenskyService {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = import.meta.env.VITE_BASE_URL_API ?? '/api';
	}

	async fetchFlights(bbox: IMapBounds | undefined): Promise<IProcessedFlights> {
		if (!bbox) {
			throw new Error('Bounding box is required');
		}

		const { lamin, lamax, lomin, lomax } = bbox;

		console.debug('[OpenskyService] fetchFlights called with params:', { lamin, lamax, lomin, lomax });

		try {
			// Формируем URL запроса с параметрами
			const url = `${this.baseUrl}/states/all`;
			const params = { lamin, lamax, lomin, lomax };

			console.debug('[OpenskyService] fetchFlights url:', url, params);

			// Выполняем запрос к прокси-серверу
			const response = await axios.get<IOpenskyRawResponse>(url, { params });

			console.debug('[OpenskyService] fetchFlights response received');

			return this.transformFlightData(response.data);
		} catch (error) {
			console.error('[OpenskyService] fetchFlights error:', error);
			throw error;
		}
	}

	private transformFlightData(data: IOpenskyRawResponse): IProcessedFlights {
		if (!data || !data.states) {
			console.warn('[OpenskyService] No flight data available');

			return { flights: [], timestamp: Math.floor(Date.now() / 1000), total: 0 };
		}

		let stateArrays: IOpenskyStateArray[];

		if (Array.isArray(data.states[0][0])) {
			// @ts-expect-error - здесь мы уже проверили, что это массив массивов
			stateArrays = data.states.flat();
		} else {
			// @ts-expect-error - здесь мы знаем, что это массив состояний
			stateArrays = data.states;
		}

		const flights = stateArrays.map((state) => this.mapStateToFlight(state));

		return {
			flights,
			timestamp: data.time,
			total: flights.length,
		};
	}

	// Преобразуем массив состояний в структурированный объект
	private mapStateToFlight(state: IOpenskyStateArray): IOpenSkyFlight {
		return {
			icao24: state[0],
			callsign: state[1]?.trim(),
			originCountry: state[2],
			position: {
				longitude: state[5],
				latitude: state[6],
				baroAltitude: state[7],
				geoAltitude: state[13],
			},
			time: {
				positionTime: state[3],
				lastContact: state[4],
			},
			movement: {
				onGround: state[8],
				velocity: state[9],
				heading: state[10],
				verticalRate: state[11],
			},
			details: {
				squawk: state[14],
				spi: state[15],
				sensors: state[12],
				positionSource: state[16],
				category: state[17],
			},
		};
	}
}

export default new OpenskyService();
