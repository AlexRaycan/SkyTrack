import type { LayerProps } from 'react-map-gl/maplibre';
import Map, { FullscreenControl, Layer, Marker, Source } from 'react-map-gl/maplibre';
import type { FeatureCollection } from 'geojson';
import AirplaneIcon from '@assets/icons/other/airplane.svg?react';

const geojson: FeatureCollection = {
	type: 'FeatureCollection',
	features: [
		{
			type: 'Feature',
			geometry: {
				type: 'LineString',
				coordinates: [
					[23.411436, 42.695194], // Sofia (SOF)
					[116.587097, 40.080101], // Beijing (PEK)
				],
			},
			properties: {
				airline: '2B',
				airline_id: '410',
				src: 'ASF',
				src_id: '2966',
				dst: 'KZN',
				dst_id: '2990',
				codeshare: '',
				stops: '0',
				equipment: 'CR2',
			},
		},
	],
};

const layerStylePath: LayerProps = {
	id: 'path',
	type: 'line',
	source: 'geojson-source',
	layout: {},
	paint: {
		'line-color': '#007cbf',
		'line-width': 4,
	},
};

const layerStylePoint: LayerProps = {
	id: 'point',
	type: 'circle',
	source: 'geojson-source',
	layout: {},
	paint: {
		'circle-color': '#007cbf',
		'circle-radius': 10,
	},
};

const mapStyle = '01980e13-49e3-7035-9cac-73918fb0bbba';

const MapComponent = () => {
	return (
		<Map
			initialViewState={{
				longitude: 69.9992665,
				latitude: 41.3901475,
				zoom: 10, // Initial zoom level
			}}
			mapStyle={`https://api.maptiler.com/maps/${mapStyle}/style.json?key=${import.meta.env.VITE_MAP_API_KEY}`}
			style={{ width: '100dvw', height: '100dvh', position: 'absolute', overflow: 'hidden' }}
		>
			<Marker
				longitude={39.9566}
				latitude={43.449902}
				draggable={false}
			>
				<AirplaneIcon />
			</Marker>
			<FullscreenControl />
			<Source
				id="geojson-source"
				type="geojson"
				data={geojson}
			>
				<Layer {...layerStylePath} />
				<Layer {...layerStylePoint} />
			</Source>
		</Map>
	);
};

export default MapComponent;
