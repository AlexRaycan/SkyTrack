import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen.ts';
import './index.css';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from '@/context/ThemeProvider.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { domAnimation, LazyMotion } from 'framer-motion';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('root')!;

if (!rootElement.innerHTML) {
	const root = createRoot(rootElement);
	root.render(
		<StrictMode>
			<ThemeProvider>
				<LazyMotion features={domAnimation}>
					<Provider store={store}>
						<RouterProvider
							basepath="/SkyTrack"
							router={router}
						/>
					</Provider>
				</LazyMotion>
			</ThemeProvider>
		</StrictMode>,
	);
}
