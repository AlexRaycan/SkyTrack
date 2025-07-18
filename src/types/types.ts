export type IFlightTime = {
	scheduled: string;
	estimated?: string;
	actual?: string;
};

export type ICountry = {
	code: string;
	name: string;
};

export type ICoordinates = {
	longitude: number;
	latitude: number;
};

export type IFlightLocation = {
	time: IFlightTime;
	airport: string;
	city: string;
	timezone: string;
	coordinates: ICoordinates;
};

export type IAirlineGradient = {
	from: string;
	to: string;
};

export type IAirline = {
	name: string;
	logo: string;
	gradient: IAirlineGradient;
};

export type IAirlineFlightInfo = {
	aircraft: string;
	country: ICountry;
	speed: number;
	altitude: number;
	photo?: string;
};

export type IFlightRoute = {
	completed: boolean;
	completedPercentage: number;
	passed: number;
	remaining: number;
};

export type IFlightAirline = {
	airline: IAirline;
	flightNumber: string;
	typeCode: string;
	callSign: string;
	from: IFlightLocation;
	to: IFlightLocation;
};

export type IFlight = {
	flight: IFlightAirline;
	flightInfo: IAirlineFlightInfo;
	route: IFlightRoute;
};
