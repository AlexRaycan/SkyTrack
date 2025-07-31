import Map, { Layer, type LayerProps, type LngLatBounds, type MapRef, Marker, Source } from 'react-map-gl/maplibre';
import type { Point } from 'geojson';
import AirplaneIcon from '@assets/icons/other/airplane.svg?react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useFlightSelectionState } from '@/hooks/useFlightSelectionState.ts';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useMapData } from '@/hooks/useMapData.ts';
import { cn } from '@lib/utils.ts';
import type { IMapBounds } from '@/types/map.types.ts';

const layerStylePathSolid: LayerProps = {
	id: 'path',
	type: 'line',
	source: 'geojson-active-source',
	layout: {
		'line-cap': 'round', // Rounded line caps
		'line-join': 'round', // Rounded line joins
	},
	paint: {
		'line-color': '#E68B02',
		'line-width': 4,
		'line-gradient': ['interpolate', ['linear'], ['line-progress'], 0, '#E68B02', 1, '#D24242'],
	},
};

const layerStylePathDashed: LayerProps = {
	id: 'path-dashed',
	type: 'line',
	source: 'geojson-active-source',
	layout: {},
	paint: {
		'line-color': '#fff',
		'line-width': 2,
		'line-dasharray': [3, 4], // Dashed line style
		'line-opacity': 0.7, // Optional: make the dashed line semi-transparent
	},
};

const mapStyle = '01980e13-49e3-7035-9cac-73918fb0bbba';

interface MapComponentProps {
	refetch?: () => void;
	data?: any;
	setBbox: (bbox: IMapBounds | undefined) => void;
}

const MapComponent = ({ refetch, data, setBbox }: MapComponentProps) => {
	const mapRef = useRef<MapRef | null>(null);
	const { currentFlight } = useFlightSelectionState();
	const { aircraft, solidRoute, dashedRoute, inactiveFlights } = useMapData(currentFlight);
	const { coordinates } = (aircraft?.features[0]?.geometry as Point) ?? [];
	const aircraftBearing = (aircraft?.features[0]?.properties as { bearing?: number })?.bearing;

	const inactiveFlightsMarker = useMemo(() => {
		return inactiveFlights.map((fl, index) => {
			const bearing = (fl?.aircraft?.features[0]?.properties as { bearing?: number })?.bearing ?? 0;
			const coordinates = (fl?.aircraft?.features[0]?.geometry as { coordinates?: number[] })?.coordinates ?? [
				0, 0,
			];

			return (
				<Marker
					key={`inactive-flight-${index}`}
					longitude={coordinates[0] ?? 0}
					latitude={coordinates[1] ?? 0}
				>
					<div
						className={cn('scale-75 opacity-70')}
						style={{ rotate: `${bearing}deg` }}
					>
						<AirplaneIcon />
					</div>
				</Marker>
			);
		});
	}, [inactiveFlights]);

	const getBbox = () => {
		const bounds = mapRef.current?.getBounds();

		if (!bounds) {
			console.warn('[MapComponent] No bounds available');

			return undefined;
		}

		console.debug('[MapComponent] Initial map bounds:', bounds);

		return {
			lamin: bounds.getSouthWest().lat,
			lamax: bounds.getNorthEast().lat,
			lomin: bounds.getSouthWest().lng,
			lomax: bounds.getNorthEast().lng,
		} as IMapBounds;
	};

	const onMapLoad = useCallback(() => {
		console.debug('[MapComponent] Map loaded');
		setBbox(getBbox());

		mapRef.current?.on('moveend', () => {
			const newBbox = getBbox();

			if (newBbox) {
				console.debug('[MapComponent] Updated map bounds:', newBbox);
				setBbox(newBbox);
			}
		});
	}, [setBbox]);

	// fly to the current flight if it is active
	useEffect(() => {
		console.debug('[MapComponent] current flight', currentFlight);

		if (!currentFlight || !mapRef?.current || !coordinates) return;

		console.debug('[MapComponent] aircraftCoordinates', coordinates);

		mapRef.current?.flyTo({
			center: [coordinates[0], coordinates[1]], // [longitude latitude],
			zoom: 5, // Initial zoom level
			speed: 1, // Adjust the speed of the flyTo animation
			curve: 1, // Adjust the curve of the flyTo animation
			essential: true,
		});
	}, [coordinates, currentFlight, mapRef]);

	useEffect(() => {
		refetch?.();
	}, [refetch]);

	return (
		<Map
			id="map"
			ref={mapRef}
			initialViewState={{
				longitude: coordinates?.[0] ?? 131.8856,
				latitude: coordinates?.[1] ?? 43.1155,
				zoom: 6, // Initial zoom level
			}}
			reuseMaps
			mapStyle={`https://api.maptiler.com/maps/${mapStyle}/style.json?key=${import.meta.env.VITE_MAP_API_KEY}`}
			style={{ width: '100dvw', height: '100dvh', position: 'absolute', overflow: 'hidden' }}
			onLoad={onMapLoad}
		>
			{/*<Source
				id="geojson-active-source"
				type="geojson"
				data={geojsonActive}
			>
				<Layer {...layerStylePath} />
				<Layer {...layerStylePoint} />
			</Source>*/}
			{solidRoute && (
				<Source
					id="geojson-active-source-solid"
					type="geojson"
					data={solidRoute}
					lineMetrics
				>
					<Layer {...layerStylePathSolid} />
				</Source>
			)}
			{dashedRoute && (
				<Source
					id="geojson-active-source-dashed"
					type="geojson"
					data={dashedRoute}
				>
					<Layer {...layerStylePathDashed} />
				</Source>
			)}
			{aircraft && (
				<Marker
					longitude={coordinates[0]}
					latitude={coordinates[1]}
					anchor="center"
				>
					<div style={{ rotate: `${aircraftBearing ?? 0}deg` }}>
						<AirplaneIcon />
					</div>
				</Marker>
			)}
			{...inactiveFlightsMarker}
		</Map>
	);
};

export default MapComponent;
