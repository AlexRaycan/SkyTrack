import { useEffect, useState } from 'react';

const breakpoints = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	'2xl': 1536,
};

export const useWindowWidth = () => {
	const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
	const [orientation, setOrientation] = useState<string>(window.screen.orientation.type);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		const handleOrientationChange = () => {
			setOrientation(window.screen.orientation.type);
		};

		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleOrientationChange);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleOrientationChange);
		};
	}, []);

	return { windowWidth, orientation, breakpoints };
};
