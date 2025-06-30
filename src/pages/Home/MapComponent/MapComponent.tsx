import { cn } from '@/lib/utils';
import MapPlaceholder from '@assets/images/map-placeholder.jpg';

interface MapProps {
	className?: string;
}

const MapComponent = (props: MapProps) => {
	const { className } = props;

	return (
		<div
			key="map"
			className={cn('absolute inset-0 z-0 h-dvh w-dvw content-center', className)}
		>
			<img
				src={MapPlaceholder}
				alt=""
				className="h-full w-full object-cover"
			/>
		</div>
	);
};

export default MapComponent;
