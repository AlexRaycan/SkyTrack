import { along, bearing, length, lineSliceAlong, lineString, multiLineString, type Units } from '@turf/turf';
import type { Feature, LineString, MultiLineString, Point, Position } from 'geojson';

/**
 * Вычисляет прогресс прохождения маршрута (LineString или MultiLineString) на заданном расстоянии.
 *
 * Возвращает точку на маршруте на указанном расстоянии, а также сегменты маршрута:
 * - solidRouteFeature: пройденная часть маршрута (сплошная линия)
 * - dashedRouteFeature: оставшаяся часть маршрута (пунктирная линия)
 *
 * @param feature - Маршрут в виде GeoJSON Feature типа LineString или MultiLineString.
 * @param distance - Расстояние вдоль маршрута, на котором нужно определить прогресс.
 * @param options - Необязательные параметры, включая единицы измерения (по умолчанию 'kilometers').
 * @returns Объект с точкой на маршруте, сплошным и пунктирным сегментами маршрута, либо null, если тип feature не поддерживается.
 */
export const getRouteProgress = (
	feature: Feature<LineString | MultiLineString>,
	distance: number,
	options: { units: Units } = { units: 'kilometers' },
) => {
	if (feature.geometry.type === 'LineString') {
		const pointAlong = along(feature as Feature<LineString>, distance, options);
		const nextPoint = along(feature as Feature<LineString>, distance + 0.001, options);

		pointAlong.properties ??= {};
		pointAlong.properties.bearing = bearing(pointAlong, nextPoint) - 90;

		const solidLine = lineSliceAlong(feature as Feature<LineString>, 0, distance, options);
		const dashedLine = lineSliceAlong(feature as Feature<LineString>, distance, length(feature, options), options);

		return {
			aircraftPointFeature: pointAlong,
			solidRouteFeature: solidLine,
			dashedRouteFeature: dashedLine,
		};
	} else if (feature.geometry.type === 'MultiLineString') {
		let remaining = distance;
		const coordinates = feature.geometry.coordinates;

		let pointAlong: Feature<Point> | null = null;
		const multiLineCoordinatesSolid: Position[][] = [];
		const multiLineCoordinatesDashed: Position[][] = [];

		coordinates.forEach((coords) => {
			const line = lineString(coords);
			const len = length(line, options);

			if (remaining > 0 && remaining <= len) {
				const nextPoint = along(feature as Feature<LineString>, distance + 0.001, options);
				pointAlong ??= along(line, remaining, options);

				pointAlong.properties ??= {};
				pointAlong.properties.bearing = bearing(pointAlong, nextPoint) - 90;

				multiLineCoordinatesDashed.push(lineSliceAlong(line, remaining, len, options).geometry.coordinates);
			} else if (remaining < 0) {
				multiLineCoordinatesDashed.push(line.geometry.coordinates);
			}

			remaining -= len;
		});

		const solidLine = multiLineString(multiLineCoordinatesSolid);
		const dashedLine = multiLineString(multiLineCoordinatesDashed);

		// Если дистанция превышает длину MultiLineString, вернуть последнюю точку
		const lastLine = lineString(coordinates[coordinates.length - 1]);
		pointAlong ??= along(lastLine, length(lastLine, options), options);

		return {
			aircraftPointFeature: pointAlong,
			solidRouteFeature: solidLine,
			dashedRouteFeature: dashedLine,
		};
	}

	return {
		aircraftPointFeature: null,
		solidRouteFeature: null,
		dashedRouteFeature: null,
	};
};
