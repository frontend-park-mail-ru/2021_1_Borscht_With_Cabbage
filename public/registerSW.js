import eventBus from './modules/eventBus.js';
import { AuthEvents } from './events/AuthEvents.js';

export default function registerSW () {
    const message = { message: 'Контент не доступен в оффлайн режиме' };

    if (!navigator.onLine) {
        eventBus.emit(AuthEvents.offline, message);
    }

    window.addEventListener('offline', () => {
        eventBus.emit(AuthEvents.offline, message);
    });

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('serviceWorker.js', { scope: '/' })
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
