import FlightList from '@pages/Home/FlightList';
import FlightDetails from '@pages/Home/FlightInformation';
import Layout from '@/layouts/Layout';
import Header from '@components/Header';

export const Home = () => {
	return (
		<Layout>
			<FlightList />
			<Header />
			<FlightDetails />
		</Layout>
	);
};
