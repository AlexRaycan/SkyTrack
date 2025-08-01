// Сырые данные, получаемые от OpenSky API
export interface IOpenskyRawResponse {
	time: number;
	states: Array<IOpenskyStateArray> | Array<Array<IOpenskyStateArray>>;
}

// Типизация массива с данными о рейсе (индексы соответствуют API)
export type IOpenskyStateArray = [
	string, // 0: icao24
	string | null, // 1: callsign
	string, // 2: origin_country
	number | null, // 3: time_position
	number, // 4: last_contact
	number | null, // 5: longitude
	number | null, // 6: latitude
	number | null, // 7: baro_altitude
	boolean, // 8: on_ground
	number | null, // 9: velocity
	number | null, // 10: true_track (heading)
	number | null, // 11: vertical_rate
	number[] | null, // 12: sensors
	number | null, // 13: geo_altitude
	string | null, // 14: squawk
	boolean, // 15: spi
	number, // 16: position_source
	number?, // 17: category (может отсутствовать в некоторых ответах)
];

// Структурированные данные о рейсе после преобразования
export interface IOpenSkyFlight {
	icao24: string;
	callsign?: string;
	originCountry: string;
	position: {
		latitude: number | null;
		longitude: number | null;
		baroAltitude: number | null;
		geoAltitude: number | null;
	};
	time: {
		positionTime: number | null;
		lastContact: number;
	};
	movement: {
		onGround: boolean;
		velocity: number | null;
		heading: number | null;
		verticalRate: number | null;
	};
	details: {
		squawk: string | null;
		spi: boolean;
		sensors: number[] | null;
		positionSource: number;
		category?: number; // может отсутствовать
	};
}

// Обработанные данные для UI
export interface IProcessedFlights {
	flights: IOpenSkyFlight[];
	timestamp: number;
	total: number;
}
