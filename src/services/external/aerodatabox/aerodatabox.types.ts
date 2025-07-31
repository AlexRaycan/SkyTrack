export interface IAeroDataBoxAircraft {
	model: string;
	reg: string;
}

export interface IAeroDataBoxAirline {
	name: string;
}

export interface IAeroDataBoxAirportLocation {
	lat: number;
	lon: number;
}

export interface IAeroDataBoxAirport {
	countryCode?: string;
	iata?: string;
	icao: string;
	location?: IAeroDataBoxAirportLocation;
	municipalityName?: string;
	name: string;
	shortName?: string;
}

export interface IAeroDataBoxArrivalOrDeparture {
	actualTimeLocal?: string;
	actualTimeUtc?: string;
	airport: IAeroDataBoxAirport;
	baggageBelt?: string;
	checkInDesk?: string;
	gate?: string;
	quality: string[];
	scheduledTimeLocal?: string;
	scheduledTimeUtc?: string;
	terminal?: string;
}

export interface IAeroDataBoxGreatCircleDistance {
	feet: number;
	km: number;
	meter: number;
	mile: number;
	nm: number;
}

export type IAeroDataBoxCodeshareStatus = 'IsOperator' | 'IsCodeshared';

export interface IAeroDataBoxFlight {
	aircraft: IAeroDataBoxAircraft;
	airline: IAeroDataBoxAirline;
	arrival: IAeroDataBoxArrivalOrDeparture;
	callSign?: string;
	codeshareStatus: IAeroDataBoxCodeshareStatus;
	departure: IAeroDataBoxArrivalOrDeparture;
	greatCircleDistance?: IAeroDataBoxGreatCircleDistance;
	isCargo: boolean;
	lastUpdatedUtc: string;
	number: string;
	status: string;
}

export type IAeroDataBoxFlightResponse = IAeroDataBoxFlight[];
