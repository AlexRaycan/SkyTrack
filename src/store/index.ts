import { configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from '@/store/favorites/favorites.slice.ts';

export const store = configureStore({
	reducer: {
		favorites: favoritesReducer,
	},
});

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;
