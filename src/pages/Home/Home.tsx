import FlightList from '@pages/Home/FlightList';
import MapPlaceholder from '@assets/images/map-placeholder.jpg';
import FlightInformation from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import { cn } from '@/helpers/classNames.ts';

export const Home = () => {
	return (
		<Layout>
			<h1 hidden>SkyTrack – flight tracking service</h1>
			<div
				key="map"
				className="absolute inset-0 z-0 h-dvh w-dvw content-center"
			>
				<img
					src={MapPlaceholder}
					alt=""
					loading="lazy"
					className="h-full w-full object-cover"
				/>
			</div>
			<div className={cn('inset-0 h-dvh w-dvw')}>
				<FlightList />
				<FlightInformation />
			</div>
		</Layout>
	);
};
