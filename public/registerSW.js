import eventBus from 'Modules/eventBus.js';
import { AuthEvents } from 'Events/AuthEvents.js';

export default function registerSW () {
    const message = 'Контент не доступен в оффлайн режиме';

    if (!navigator.onLine) {
        eventBus.emit(AuthEvents.offline, { message, color: 'red' });
    }

    window.addEventListener('offline', () => {
        eventBus.emit(AuthEvents.offline, { message, color: 'red' });
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('serviceWorker.js', { scope: '/' })
            .then(registration => {
                if (registration.installing) {
                    const data = {
                        type: 'CACHE_URLS',
                        payload: [location.href, ...performance.getEntriesByType('resource').map(r => r.name)]
                    };
                    registration.installing.postMessage(data);
                }
            })
            .catch(err => console.log('SW registration FAIL:', err));
    }
}
