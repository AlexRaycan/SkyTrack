import axios from 'axios';
import type { IMapBounds } from '@/types/map.types.ts';

class OpenskyService {
	private readonly baseUrl: string;

	constructor() {
		this.baseUrl = 'https://opensky-network.org/api';
	}

	private get flightsUrl() {
		return new URL(`${this.baseUrl}/states/all`);
	}

	private async getOpenSkyToken(): Promise<string> {
		const response = await axios.get('/api/opensky-token'); // если используете proxy в vite, иначе укажите полный адрес
		const token = response.data.access_token;
		localStorage.setItem('opensky_token', token);

		return token;
	}

	async fetchFlights(bbox: IMapBounds | undefined) {
		if (!bbox) {
			throw new Error('Bounding box is required');
		}

		const { lamin, lamax, lomin, lomax } = bbox;

		console.debug('[OpenskyService] fetchFlights called with params:', { lamin, lamax, lomin, lomax });
		const url = this.flightsUrl;
		/*let token = localStorage.getItem('opensky_token');

		if (!token) {
			// If no token is found, fetch a new one
			try {
				token = await this.getOpenSkyToken();
			} catch (error) {
				throw new Error(`Failed to fetch OpenSky token: ${error}`);
			}
		}*/

		url.searchParams.append('lamin', lamin.toString());
		url.searchParams.append('lamax', lamax.toString());
		url.searchParams.append('lomin', lomin.toString());
		url.searchParams.append('lomax', lomax.toString());

		// Time in seconds since epoch in Unix format
		// const unixTime = Math.floor(Date.now() / 1000);
		const response = await axios.get(url.toString(), {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		console.debug('[OpenskyService] fetchFlights response:', response.data);

		if (response.status !== 200) {
			throw new Error('Failed to fetch flights');
		}

		return response.data;
	}
}

export default new OpenskyService();
