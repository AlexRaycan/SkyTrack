import axios from 'axios';
import type { IFetchAirportsParams, IFetchAirportsResponse } from './airportdb.types';

class AirportdbService {
	private readonly baseUrl: string;
	private readonly apiKey: string;

	constructor() {
		this.baseUrl = 'https://airportdb.io/api/v1';
		this.apiKey = import.meta.env.VITE_AIRPORTDB_API_KEY ?? '';
	}

	async fetchAirport({ icao }: IFetchAirportsParams) {
		const url = new URL(`${this.baseUrl}/airport/${icao}`);
		url.searchParams.append('apiToken', this.apiKey);

		const response = await axios.get<IFetchAirportsResponse>(url.toString());

		if (response.status !== 200) {
			throw new Error('Failed to fetch flights');
		}

		return response.data;
	}
}

export default new AirportdbService();
