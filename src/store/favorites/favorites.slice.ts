import { createSlice } from '@reduxjs/toolkit';

const LS_KEY = 'favorites';

export const getFavoritesFromLocalStorage = () => {
	const favorites = localStorage.getItem(LS_KEY);

	if (!favorites) return [];

	try {
		const parsedFavorites = JSON.parse(favorites);

		if (Array.isArray(parsedFavorites)) {
			// Ensure all items are objects with the expected properties
			console.log('Parsed favorites from localStorage:', parsedFavorites);

			return parsedFavorites;
		} else {
			console.warn('Favorites in localStorage is not an array:', parsedFavorites);

			return [];
		}
	} catch (error) {
		console.error('Error parsing favorites from localStorage:', error);
		// If parsing fails, return an empty array
		localStorage.removeItem(LS_KEY); // Optionally clear the corrupted data

		return [];
	}
};

const saveFavoritesToLocalStorage = (favorites: string[]) => {
	try {
		localStorage.setItem(LS_KEY, JSON.stringify(favorites));
	} catch (error) {
		console.error('Error saving favorites to localStorage:', error);
	}
};

const initialState: string[] = getFavoritesFromLocalStorage();

const favoritesSlice = createSlice({
	name: LS_KEY,
	initialState,
	reducers: {
		addFavorite: (state, action) => {
			const newFavorite = action.payload;

			if (!state.includes(newFavorite)) {
				state.push(newFavorite);
				saveFavoritesToLocalStorage(state);
			}
		},
		removeFavorite: (state, action) => {
			const index = state.indexOf(action.payload);

			if (index !== -1) {
				state.splice(index, 1);
				saveFavoritesToLocalStorage(state);
			}
		},
	},
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
