export const Home = () => {
    return (
        <main className="h-dvh content-center bg-gray-900 text-white">
            <div key="map" className="h-dvh w-dvw content-center">
                Map
            </div>
            <aside className="absolute top-0 left-0 flex max-h-dvh">
                <h2>Flights</h2>
            </aside>
            <aside className="absolute top-0 right-0 flex max-h-dvh">
                <h2>Current Flight</h2>
            </aside>
        </main>
    );
};
