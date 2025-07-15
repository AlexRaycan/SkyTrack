import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import MapComponent from '@pages/Home/MapComponent';

export const Home = () => {
	return (
		<div>
			<MapComponent />
			<Layout>
				<FlightList />
				<FlightDetails />
			</Layout>
		</div>
	);
};
