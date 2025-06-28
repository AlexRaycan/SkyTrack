import type { IFlight } from '@/types/types.ts';
// Импорт SVG логотипов
import turkishLogo from '@assets/logos/turkish.svg';
import ryanairLogo from '@assets/logos/ryanair.svg';
import s7Logo from '@assets/logos/s7.svg';
import swissLogo from '@assets/logos/swiss.svg';
import lufthansaLogo from '@assets/logos/lufthansa.svg';

// Импорт фото самолетов
import airbusA330 from '@assets/images/aircrafts/01_turkish_airbus-A330.png';
import boeing737 from '@assets/images/aircrafts/02_Ryanair_Boeing-737-800.png';
import airbusA320 from '@assets/images/aircrafts/03_s7_Airbus-A320.png';
import airbusA321 from '@assets/images/aircrafts/04_SWISS_Airbus-A321.png';
import airbusA350 from '@assets/images/aircrafts/05_Lufthansa_Airbus-A350-900.png';

export const FLIGHTS: IFlight[] = [
	{
		flight: {
			airline: {
				name: 'Turkish Airlines',
				logo: turkishLogo,
				gradient: {
					from: '#D43D3D', // мягкий красный
					to: '#FFA6A6',
				},
			},
			flightNumber: 'TK143',
			typeCode: 'TC-JFP',
			callSign: '93247',
			from: {
				airport: 'SOF', // Sofia
				city: 'Sofia',
				timezone: 'UTC+3',
				time: {
					scheduled: '2024-06-12T07:10:00+03:00',
					actual: '2024-06-12T07:16:00+03:00',
				},
			},
			to: {
				airport: 'PEK', // Beijing
				city: 'Beijing',
				timezone: 'UTC+8',
				time: {
					scheduled: '2024-06-12T18:45:00+08:00',
					estimated: '2024-06-12T18:52:00+08:00',
				},
			},
		},
		flightInfo: {
			aircraft: 'Airbus A330',
			country: { code: 'tr', name: 'Turkey' },
			speed: 870,
			altitude: 11200,
			photo: airbusA330,
		},
		route: {
			completed: false,
			completedPercentage: 45,
			passed: 3600,
			remaining: 4400,
		},
	},
	{
		flight: {
			airline: {
				name: 'Ryanair',
				logo: ryanairLogo,
				gradient: {
					from: '#336699', // осветлённый тёмно-синий
					to: '#8ABFFF',
				},
			},
			flightNumber: 'RN1782',
			typeCode: 'D-AISP',
			callSign: '7842',
			from: {
				airport: 'DUB', // Dublin
				city: 'Dublin',
				timezone: 'UTC+0',
				time: {
					scheduled: '2024-06-12T08:15:00+00:00',
					actual: '2024-06-12T08:24:00+00:00',
				},
			},
			to: {
				airport: 'LCA', // Larnaca
				city: 'Larnaca',
				timezone: 'UTC+3',
				time: {
					scheduled: '2024-06-12T13:25:00+03:00',
					estimated: '2024-06-12T13:23:00+03:00',
				},
			},
		},
		flightInfo: {
			aircraft: 'Boeing 737-800',
			country: { code: 'ie', name: 'Ireland' },
			speed: 870,
			altitude: 11300,
			photo: boeing737,
		},
		route: {
			completed: false,
			completedPercentage: 75,
			passed: 2150,
			remaining: 880,
		},
	},
	{
		flight: {
			airline: {
				name: 'S7 Airlines',
				logo: s7Logo,
				gradient: {
					from: '#AEEA66', // салатовый
					to: '#D9FFAA',
				},
			},
			flightNumber: 'S7124',
			typeCode: 'RA-73415',
			callSign: '88015',
			from: {
				airport: 'NCE', // Nice
				city: 'Nice',
				timezone: 'UTC+1',
				time: {
					scheduled: '2024-06-12T09:00:00+01:00',
					actual: '2024-06-12T09:10:00+01:00',
				},
			},
			to: {
				airport: 'TBS', // Tbilisi
				city: 'Tbilisi',
				timezone: 'UTC+4',
				time: {
					scheduled: '2024-06-12T13:30:00+04:00',
					estimated: '2024-06-12T13:40:00+04:00',
				},
			},
		},
		flightInfo: {
			aircraft: 'Airbus A320',
			country: { code: 'ru', name: 'Russia' },
			speed: 820,
			altitude: 10700,
			photo: airbusA320,
		},
		route: {
			completed: false,
			completedPercentage: 60,
			passed: 2100,
			remaining: 1400,
		},
	},
	{
		flight: {
			airline: {
				name: 'SWISS',
				logo: swissLogo,
				gradient: {
					from: '#D43D3D',
					to: '#FFA6A6',
				},
			},
			flightNumber: 'LX318',
			typeCode: 'HB-JHK',
			callSign: '94102',
			from: {
				airport: 'OPO', // Porto
				city: 'Porto',
				timezone: 'UTC+0',
				time: {
					scheduled: '2024-06-12T06:55:00+00:00',
					actual: '2024-06-12T07:05:00+00:00',
				},
			},
			to: {
				airport: 'GYD', // Baku
				city: 'Baku',
				timezone: 'UTC+4',
				time: {
					scheduled: '2024-06-12T15:00:00+04:00',
					estimated: '2024-06-12T15:15:00+04:00',
				},
			},
		},
		flightInfo: {
			aircraft: 'Airbus A321',
			country: { code: 'ch', name: 'Switzerland' },
			speed: 860,
			altitude: 10900,
			photo: airbusA321,
		},
		route: {
			completed: false,
			completedPercentage: 70,
			passed: 2800,
			remaining: 1200,
		},
	},
	{
		flight: {
			airline: {
				name: 'Lufthansa',
				logo: lufthansaLogo,
				gradient: {
					from: '#355D9B',
					to: '#A4C7FF',
				},
			},
			flightNumber: 'LH1234',
			typeCode: 'D-AIXQ',
			callSign: 'DLH4AB',
			from: {
				airport: 'FRA', // Frankfurt
				city: 'Frankfurt',
				timezone: 'UTC+1',
				time: {
					scheduled: '2024-06-12T10:30:00+01:00',
					actual: '2024-06-12T10:37:00+01:00',
				},
			},
			to: {
				airport: 'HND', // Tokyo Haneda
				city: 'Tokyo',
				timezone: 'UTC+9',
				time: {
					scheduled: '2024-06-13T05:55:00+09:00',
					estimated: '2024-06-13T06:05:00+09:00',
				},
			},
		},
		flightInfo: {
			aircraft: 'Airbus A350-900',
			country: { code: 'de', name: 'Germany' },
			speed: 900,
			altitude: 11500,
			photo: airbusA350,
		},
		route: {
			completed: false,
			completedPercentage: 35,
			passed: 3700,
			remaining: 6900,
		},
	},
];
