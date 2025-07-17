import Map, { Layer, type LayerProps, type MapRef, Source } from 'react-map-gl/maplibre';
import type { Feature, FeatureCollection, Point, Position } from 'geojson';
// import AirplaneIcon from '@assets/icons/other/airplane.svg?react';
import { useEffect, useMemo, useRef } from 'react';
import { useFlightSelectionState } from '@/hooks/useFlightSelectionState.ts';
import 'maplibre-gl/dist/maplibre-gl.css';
import { AIRPORTS } from '@pages/Home/MapComponent/Airport.data.ts';
import * as turf from '@turf/turf';

const layerStylePath: LayerProps = {
	id: 'path',
	type: 'line',
	source: 'geojson-active-source',
	layout: {},
	paint: {
		'line-color': '#007cbf',
		'line-width': 4,
	},
};

const layerStylePoint: LayerProps = {
	id: 'point',
	type: 'circle',
	source: 'geojson-active-source',
	layout: {},
	paint: {
		'circle-color': '#007cbf',
		'circle-radius': 10,
	},
};

const layerStyleAircraft: LayerProps = {
	id: 'point',
	type: 'symbol',
	source: 'geojson-active-source',
	layout: {
		'icon-image': 'airplane-icon', // Assuming you have an icon for the aircraft
		'icon-rotate': ['get', 'bearing'],
		'icon-rotation-alignment': 'map',
		'icon-overlap': 'always',
		'icon-ignore-placement': true,
	},
};

const mapStyle = '01980e13-49e3-7035-9cac-73918fb0bbba';

type AirportCoordinates = {
	longitude: number;
	latitude: number;
};

type AirportData = {
	[key: string]: AirportCoordinates;
};

const MapComponent = () => {
	const mapRef = useRef<MapRef | null>(null);
	const { currentFlight } = useFlightSelectionState();

	const airportPoints = useMemo<AirportData[] | null>(() => {
		if (!currentFlight?.flight.from.airport || !currentFlight?.flight.to.airport) {
			return null;
		}

		const fromAirport = Object.entries(AIRPORTS).find(([code]) => code === currentFlight.flight.from.airport);
		const toAirport = Object.entries(AIRPORTS).find(([code]) => code === currentFlight.flight.to.airport);
		console.debug('[MapComponent] airport points', fromAirport, toAirport);

		return [
			{
				[fromAirport?.[0] ?? '']: {
					longitude: fromAirport?.[1].longitude ?? 0,
					latitude: fromAirport?.[1].latitude ?? 0,
				},
			},
			{
				[toAirport?.[0] ?? '']: {
					longitude: toAirport?.[1].longitude ?? 0,
					latitude: toAirport?.[1].latitude ?? 0,
				},
			},
		];
	}, [currentFlight?.flight.from.airport, currentFlight?.flight.to.airport]);

	const airportFeatures = useMemo<FeatureCollection | null>(() => {
		console.debug('[MapComponent] airportPoints', airportPoints);

		if (!airportPoints?.length) {
			return null;
		}

		const features = airportPoints.map((airport) => {
			const [code, { longitude, latitude }] = Object.entries(airport)[0];
			console.debug('[MapComponent] airport coordinates', code, longitude, latitude);

			return {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [longitude, latitude],
				},
				properties: {
					code: code,
					iconSize: [30, 30],
					iconImage: 'airport-icon', // Assuming you have an icon for airports
				},
			} as Feature;
		});
		console.debug('[MapComponent] airport features', features);

		return {
			type: 'FeatureCollection',
			features: features,
		} as FeatureCollection;
	}, [airportPoints]);

	const pathCoordinates = useMemo<Position[]>(() => {
		return (
			airportFeatures?.features.map((feature) => {
				const geometry = feature.geometry as Point;
				console.debug('[MapComponent] path feature geometry', geometry);

				return geometry?.coordinates ?? [];
			}) ?? []
		);
	}, [airportFeatures?.features]);

	const pathDistance = useMemo(
		() => (pathCoordinates ? turf.length(turf.lineString(pathCoordinates), { units: 'kilometers' }) : 0),
		[pathCoordinates],
	);

	const pathDistanceCompleted = useMemo(() => {
		return pathDistance * ((currentFlight?.route?.completedPercentage ?? 0) / 100);
	}, [pathDistance, currentFlight?.route?.completedPercentage]);

	const aircraftCoordinates = useMemo(
		() =>
			turf.along(
				turf.lineString(
					pathCoordinates ?? [
						[0, 0],
						[0, 0],
					],
				),
				pathDistanceCompleted,
				{ units: 'kilometers' },
			),
		[pathDistanceCompleted, pathCoordinates],
	);

	const geojsonActive = useMemo<FeatureCollection>(() => {
		const coordinates = pathCoordinates ?? [
			[0, 0],
			[0, 0],
		];
		const result: FeatureCollection = {
			type: 'FeatureCollection',
			features: [
				{
					type: 'Feature',
					geometry: {
						type: 'LineString',
						coordinates: coordinates,
					},
					properties: {},
				},
			],
		};

		return result;
	}, [pathCoordinates]);

	// fly to the current flight if it is active
	useEffect(() => {
		console.debug('[MapComponent] current flight', currentFlight);

		if (!currentFlight || !mapRef.current || !aircraftCoordinates) return;

		console.debug('[MapComponent] aircraftCoordinates', aircraftCoordinates);
		const { coordinates } = aircraftCoordinates.geometry;

		mapRef.current.flyTo({
			center: [coordinates[0], coordinates[1]], // [longitude latitude],
			zoom: 5, // Initial zoom level
			speed: 1, // Adjust the speed of the flyTo animation
			curve: 1, // Adjust the curve of the flyTo animation
			essential: true,
		});
	}, [aircraftCoordinates, currentFlight]);

	return (
		<Map
			id="map"
			ref={mapRef}
			initialViewState={{
				longitude: 69.9992665,
				latitude: 41.3901475,
				zoom: 6, // Initial zoom level
			}}
			mapStyle={`https://api.maptiler.com/maps/${mapStyle}/style.json?key=${import.meta.env.VITE_MAP_API_KEY}`}
			style={{ width: '100dvw', height: '100dvh', position: 'absolute', overflow: 'hidden' }}
		>
			<Source
				id="geojson-active-source"
				type="geojson"
				data={geojsonActive}
			>
				<Layer {...layerStylePath} />
				<Layer {...layerStylePoint} />
				<Layer {...layerStyleAircraft} />
			</Source>
		</Map>
	);
};

export default MapComponent;
