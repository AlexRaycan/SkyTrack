import FlightList from '@pages/Home/FlightList';
import MapPlaceholder from '@assets/images/map-placeholder.jpg';
import FlightInformation from '@pages/Home/FlightInformation';

export const Home = () => {
	return (
		<main className="flex h-dvh w-dvw content-center justify-between bg-gray-900 text-white">
			<FlightList />
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
			<FlightInformation />
		</main>
	);
};
