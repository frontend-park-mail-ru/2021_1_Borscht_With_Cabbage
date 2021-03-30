const KEY = 'BORSCHT_WITH_CABBAGE_CACHE';

self.addEventListener('install', event => {
    event.waitUntil(self.skipWaiting());
});

self.addEventListener('message', event => {
    if (event.data.type === 'CACHE_URLS') {
        event.waitUntil(
            caches
                .open(KEY)
                .then(cache => {
                    return cache.addAll(event.data.payload);
                })
                .catch(err => console.log(err)),
        );
    }
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function() {
                    return true;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    event.respondWith(  // отменяем поведение по умолчанию
        caches
            .match(request) // промис, который ищет закэшированный респонс
            .then(async cachedResponse => {
                if (navigator.onLine) { // если онлайн, то сходим в нет
                    if (!url.href.includes(':5000')) {
                        const response = await fetch(request);
                        const respClone = response.clone(); // респонс -- поток и мы можем прочитать его лишь раз (иначе не закэшировать)
                        caches
                            .open(KEY)
                            .then(cache => cache.put(request, respClone));
                        return response;
                    }
                    return fetch(request);
                }

                if (cachedResponse) {
                    return cachedResponse;
                }

                if (url.href.includes(':5000')) {
                    const init = {
                        status: 200
                    };

                    const data = { code: 418, message: 'Контент недоступен в оффлайн режиме' };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    return new Response(blob, init);
                } else {
                    const baseUrl = url.toString().replace(url.pathname, '/');
                    try {
                        const cache = await caches.open(KEY);
                        const keys = await cache.keys();
                        const request = keys.find(key => key.url.toString() === baseUrl);
                        return await caches.match(request);
                    } catch (e) {
                        console.log(e);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    );
});
