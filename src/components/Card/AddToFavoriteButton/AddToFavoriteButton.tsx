import Button from '@components/Button';
import { Heart } from '@components/animate-ui/icons/heart.tsx';
import { cn } from '@/lib/utils.ts';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { addFavorite, removeFavorite } from '@/store/favorites/favorites.slice.ts';
import { type MouseEvent, useCallback, useMemo } from 'react';
import type { ButtonProps } from '@components/Button/Button.tsx';

interface AddToFavoriteButtonProps extends ButtonProps {
	flightNumber: string;
}

const AddToFavoriteButton = (props: AddToFavoriteButtonProps) => {
	const { className, flightNumber } = props;
	const dispatch = useAppDispatch();
	const favorites = useAppSelector((state) => state.favorites);
	const isFavorite = useMemo(() => favorites.includes(flightNumber), [favorites, flightNumber]);

	const handleAddToFavorites = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			e.preventDefault();

			if (isFavorite) {
				console.log('Removing from favorites:', flightNumber);
				dispatch(removeFavorite(flightNumber));
			} else {
				console.log('Adding to favorites:', flightNumber);
				dispatch(addFavorite(flightNumber));
			}
		},
		[dispatch, flightNumber, isFavorite],
	);

	return (
		<Button
			className={cn('text-muted-foreground', className)}
			isTransparent
			size={'small'}
			icon={
				<Heart
					fill={isFavorite ? 'currentColor' : 'none'}
					stroke={!isFavorite ? 'currentColor' : 'none'}
					height={24}
					width={24}
				/>
			}
			onClick={handleAddToFavorites}
		/>
	);
};

export default AddToFavoriteButton;
