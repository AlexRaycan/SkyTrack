export interface IFetchFlightsParams {
	limit?: number;
	offset?: number;
	airline?: string | null;
	fromCountry?: string | null;
}

export interface IFetchFlightsResponse {
	data: IFlight[];
	pagination: {
		count: number;
		offset: number;
		limit: number;
	};
}
