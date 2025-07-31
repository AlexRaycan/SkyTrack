import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import MapComponent from '@pages/Home/MapComponent';
import { useEffect, useState } from 'react';
import type { IMapBounds } from '@/types/map.types.ts';
import openskyService from '@/services/external/opensky/opensky.service.ts';
import { useQuery } from '@tanstack/react-query';

export const Home = () => {
	const [bbox, setBbox] = useState<IMapBounds | undefined>(undefined);

	const { data, isLoading, refetch, isRefetching } = useQuery({
		queryKey: ['flights'],
		queryFn: async () => {
			const response = await openskyService.fetchFlights(bbox);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			console.debug('[Home] fetchFlights response:', response);

			return response.json();
		},
		enabled: false, // Disable automatic fetching
	});

	useEffect(() => {
		if (!bbox) return;

		console.debug('[Home] BBox updated:', bbox);
		refetch();
	}, [bbox, refetch]);

	// Check data changing
	useEffect(() => {
		if (data) {
			console.debug('[Home] Data fetched:', data);
		}
	}, [data]);

	return (
		<div>
			<MapComponent
				// refetch={refetch}
				// data={data}
				bbox={bbox}
				setBbox={setBbox}
			/>
			<Layout>
				<FlightList />
				<FlightDetails />
			</Layout>
		</div>
	);
};
