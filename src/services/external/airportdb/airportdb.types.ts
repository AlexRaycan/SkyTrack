export interface IFetchAirportsParams {
	icao: string;
}

export interface IAirportCodes {
	ident: string;
	gps_code: string;
	iata_code: string;
	local_code: string;
	icao_code: string;
}

export interface IAirportLocation {
	latitude_deg: number;
	longitude_deg: number;
	elevation_ft: string;
	continent: string;
	iso_country: string;
	iso_region: string;
	municipality: string;
}

export interface IAirportInfo {
	type: string;
	name: string;
	scheduled_service: string;
	home_link: string;
	wikipedia_link: string;
	keywords: string;
}

export interface IFetchAirportsResponse extends IAirportCodes, IAirportLocation, IAirportInfo {}
