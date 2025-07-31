import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import MapComponent from '@pages/Home/MapComponent';
import { useEffect, useMemo, useState } from 'react';
import type { IMapBounds } from '@/types/map.types.ts';
import openskyService from '@/services/external/opensky/opensky.service.ts';
import { useQuery } from '@tanstack/react-query';

export const Home = () => {
	const [bbox, setBbox] = useState<IMapBounds | undefined>(undefined);

	const { data, isLoading, refetch, error, isError } = useQuery({
		queryKey: ['flights'],
		queryFn: async () => {
			if (!bbox) {
				throw new Error('Bounding box is required');
			}

			// Просто возвращаем результат без дополнительной обработки
			return await openskyService.fetchFlights(bbox);
		},
		enabled: !!bbox,
	});

	// const flights = useMemo(() => {
	// 	if (!data || !data.states)
	// })

	// Check data changing
	useEffect(() => {
		if (isError) {
			console.error('[Home] Error fetching data:', error);
		}

		if (data) {
			console.debug('[Home] Data fetched:', data);
		}
	}, [data, error, isError]);

	useEffect(() => {
		if (bbox) {
			console.debug('[Home] Bounding box updated:', bbox);
			refetch().then();
		}
	}, [bbox, refetch]);

	return (
		<div>
			<MapComponent
				data={data}
				setBbox={setBbox}
			/>
			<Layout>
				<FlightList />
				<FlightDetails />
			</Layout>
		</div>
	);
};
