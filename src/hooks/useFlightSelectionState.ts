import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useSearch } from '@tanstack/react-router';
import { useMemo } from 'react';
import type { IFlight } from '@/types/types.ts';

export const useFlightSelectionState = (flight?: IFlight) => {
	const favorites = useAppSelector((state) => state.favorites);
	const { selected, isFavorite } = useSearch({
		strict: false,
		select: (search) => {
			const { flightNumber, filter } = search as { flightNumber: string; filter: string };

			return { selected: flightNumber, isFavorite: !!filter };
		},
	});

	const isActive = useMemo(() => {
		const isSelected = selected === flight?.flight.flightNumber;

		if (isFavorite && isSelected) {
			return favorites.includes(selected);
		}

		return isSelected;
	}, [selected, flight?.flight.flightNumber, isFavorite, favorites]);

	return { selected, isActive, isFavorite };
};
