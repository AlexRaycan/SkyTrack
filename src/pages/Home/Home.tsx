import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import MapComponent from '@pages/Home/MapComponent';
import { useState } from 'react';
import type { IMapBounds } from '@/types/map.types.ts';
import openskyService from '@/services/external/opensky/opensky.service.ts';
import { useQuery } from '@tanstack/react-query';
import type { IProcessedFlights } from '@/services/external/opensky/opensky.types.ts';

export const Home = () => {
	const [bbox, setBbox] = useState<IMapBounds | undefined>(undefined);
	const bboxQueryKey = bbox
		? [bbox.lamin, bbox.lamax, bbox.lomin, bbox.lomax].map((coordinate) => coordinate.toFixed(2))
		: [];

	const { data, isSuccess } = useQuery({
		queryKey: ['flights', ...bboxQueryKey],
		queryFn: async () => {
			if (!bbox) {
				throw new Error('Bounding box is required');
			}

			return await openskyService.fetchFlights(bbox);
		},
		select: (data: IProcessedFlights) => {
			return {
				...data,
				flights: data.flights
					.filter(
						(fl) => !fl.movement.onGround && fl.position.longitude != null && fl.position.latitude != null,
					)
					.slice(0, 100),
			} as IProcessedFlights;
		},
		enabled: !openskyService.usesStaticDemoData && !!bbox,
		refetchInterval: openskyService.usesStaticDemoData ? false : 30_000,
		retry: 1,
	});

	return (
		<div>
			<MapComponent
				data={data}
				setBbox={setBbox}
				usesStaticDemoData={openskyService.usesStaticDemoData}
			/>
			<Layout>
				<FlightList isSuccess={openskyService.usesStaticDemoData || isSuccess} />
				<FlightDetails />
			</Layout>
		</div>
	);
};
