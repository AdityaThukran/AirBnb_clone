mapboxgl.accessToken = mapToken;

document.addEventListener('DOMContentLoaded', function () {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;

    // Validate coordinates before initializing
    const coords = listing && listing.geometry && listing.geometry.coordinates;
    if (!coords || !Array.isArray(coords) || coords.length < 2) {
        console.warn('Map: invalid or missing coordinates, skipping map init.');
        return;
    }

    try {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: coords,
            zoom: 9,
            scrollZoom: false
        });

        // Force resize at multiple intervals to handle layout shifts
        setTimeout(function () { map.resize(); }, 100);
        setTimeout(function () { map.resize(); }, 300);
        setTimeout(function () { map.resize(); }, 600);

        map.on('load', function () {
            map.resize();
        });

        map.addControl(new mapboxgl.NavigationControl(), 'top-right');

        const marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat(coords)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking!</p>`)
            )
            .addTo(map);

        const observer = new ResizeObserver(function () {
            map.resize();
        });
        observer.observe(mapContainer);

    } catch (err) {
        console.error('Map initialization error:', err);
    }
});