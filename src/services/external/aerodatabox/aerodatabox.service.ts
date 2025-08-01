import axios from 'axios';
import type { IMapBounds } from '@/types/map.types.ts';
import type {
	IOpenSkyFlight,
	IOpenskyRawResponse,
	IOpenskyStateArray,
	IProcessedFlights,
} from '@/services/external/opensky/opensky.types.ts';

class AeroDataBoxService {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = import.meta.env.VITE_BASE_URL_API ?? '/api';
	}

	async fetchFlights(icao24: string) {
		if (!icao24) {
			throw new Error('Bounding box is required');
		}

		try {
			// Формируем URL запроса с параметрами
			const url = `${this.baseUrl}/flight-info/${icao24}`;

			// Выполняем запрос к прокси-серверу
			const response = await axios.get(url);

			console.debug('[AeroDataBox] fetchFlights response received');

			return response.data;
		} catch (error) {
			console.error('[OpenskyService] fetchFlights error:', error);
			throw error;
		}
	}
}

export default new AeroDataBoxService();
