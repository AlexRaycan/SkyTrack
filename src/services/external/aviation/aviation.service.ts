import type { IFetchFlightsParams } from './aviation.types';
import axios from 'axios';

class AviationService {
	private readonly baseUrl: string;
	private readonly apiKey: string;

	constructor() {
		this.baseUrl = 'https://api.aviationstack.com/v1';
		this.apiKey = import.meta.env.VITE_AVIATIONSTACK_API_KEY ?? '';
	}

	private get flightsUrl() {
		const url = new URL(`${this.baseUrl}/flights`);
		url.searchParams.append('access_key', this.apiKey);

		return url;
	}

	async fetchFlights({ airline, flightStatus, fromCountry, limit = 10, offset }: IFetchFlightsParams) {
		const url = this.flightsUrl;

		if (flightStatus) {
			url.searchParams.append('flight_status', flightStatus);
		} else {
			// Default to 'active' if no flight status is provided
			url.searchParams.append('flight_status', 'active');
		}

		if (airline) {
			url.searchParams.append('airline_iata', airline);
		}

		if (fromCountry) {
			url.searchParams.append('country_iso2', fromCountry);
		}

		if (limit) {
			url.searchParams.append('limit', limit.toString());
		}

		if (offset) {
			url.searchParams.append('offset', offset.toString());
		}

		const response = await axios.get(url.toString());

		if (response.status !== 200) {
			throw new Error('Failed to fetch flights');
		}

		return response.data;
	}
}

export default new AviationService();
