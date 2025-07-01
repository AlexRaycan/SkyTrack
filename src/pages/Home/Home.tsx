import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';

export const Home = () => {
	return (
		<Layout>
			<FlightList />
			<FlightDetails />
		</Layout>
	);
};
