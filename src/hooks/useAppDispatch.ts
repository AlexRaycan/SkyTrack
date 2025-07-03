import { useDispatch } from 'react-redux';
import type { TAppDispatch } from '@/store';

export const useAppDispatch = () => {
	return useDispatch<TAppDispatch>();
};
