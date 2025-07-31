import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { IFlight } from '@/types/flight.types.ts';
import { FLIGHTS } from '@pages/Home/FlightList/Flight.data.ts';

export const useFlightSelectionState = (flight?: IFlight) => {
	const favorites = useAppSelector((state) => state.favorites);
	const { flightNumber, isFavorite } = useSearch({
		strict: false,
		select: (search) => {
			const { flightNumber, filter } = search as { flightNumber: string; filter: string };

			return { flightNumber, isFavorite: !!filter };
		},
	});

	const isActive = useMemo(() => {
		const isSelected = flightNumber === flight?.flight.flightNumber;

		if (isFavorite && isSelected) {
			return favorites.includes(flightNumber);
		}

		return isSelected;
	}, [flightNumber, flight?.flight.flightNumber, isFavorite, favorites]);

	const currentFlight = useMemo(() => FLIGHTS.find((fl) => fl.flight.flightNumber === flightNumber), [flightNumber]);

	return { currentFlight, flightNumber, isActive, isFavorite };
};
