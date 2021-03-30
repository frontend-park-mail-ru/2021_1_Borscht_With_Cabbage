export default function registerSW () {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/serviceWorker.js', { scope: '/' })
            .then(registration => {
                if (registration.installing) {
                    const data = {
                        type: 'CACHE_URLS',
                        payload: [location.href, ...performance.getEntriesByType('resource').map(r => r.name)],
                    };
                    registration.installing.postMessage(data);
                }
            })
            .catch(err => console.log('SW registration FAIL:', err));
    }
}
