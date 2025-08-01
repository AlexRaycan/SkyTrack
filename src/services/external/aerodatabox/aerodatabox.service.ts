import axios from 'axios';
import type { IAeroDataBoxFlightResponse } from './aerodatabox.types.ts';

class AeroDataBoxService {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = import.meta.env.VITE_BASE_URL_API ?? '/api';
	}

	async fetchFlightData(icao24: string): Promise<IAeroDataBoxFlightResponse> {
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
			console.error('[AeroDataBox] fetchFlights error:', error);
			throw error;
		}
	}
}

export default new AeroDataBoxService();
