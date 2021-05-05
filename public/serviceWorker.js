const KEY = 'BORSCHT_WITH_CABBAGE_CACHE';
const LOCAL_STORAGE_BASKET = 'LOCAL_STORAGE_BASKET';

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
                .catch(err => console.log(err))
        );
    }
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function () {
                    return true;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    event.respondWith(
        caches
            .match(request) // промис, который ищет закэшированный респонс
            .then(async cachedResponse => {
                // if (url.href.includes('/user/basket')) {
                //     if (request.method.toUpperCase() === 'PUT') { // запрос на добавление в корзину
                //         const body = JSON.parse(request.body);
                //         const isAuth = body.isAuth;
                //         if (!isAuth) {     // if user not auth
                //             const dishID = body.dishID;
                //             const restaurantID = body.restaurantID;
                //             const basketString = localStorage[LOCAL_STORAGE_BASKET];
                //             const basket = basketString ? JSON.parse(basketString) : {};
                //             if (basket.restaurantID && basket.restaurantID === restaurantID) {
                //                 const isPlus = body.isPlus;
                //                 switch (isPlus) {
                //                 case true:          // plus
                //                     let isFind = false;
                //                     for (const food of basket.foods) {
                //                         if (food.id === dishID) {
                //                             food.num += 1;
                //                             isFind = true;
                //                             break;
                //                         }
                //                     }
                //                     if (!isFind) {
                //                         basket.foods.push({
                //                             id: dishID,
                //                             num: 1
                //                         });
                //                     }
                //                     break;
                //                 case false:          // minus
                //                     let isDelete = false;
                //                     let deleteFood = null;
                //                     for (const food of basket.foods) {
                //                         if (food.id === dishID) {
                //                             food.num -= 1;
                //                             if (food.num === 0) {
                //                                 isDelete = true;
                //                                 deleteFood = food;
                //                             }
                //                             break;
                //                         }
                //                     }
                //                     if (isDelete) {
                //                         basket.foods = basket.foods.filter(value => value !== deleteFood)
                //                     }
                //                 }
                //             } else {
                //                 basket.restaurantID = restaurantID;
                //                 basket.foods = [];
                //                 basket.foods.push({
                //                     id: dishID,
                //                     num: 1
                //                 });
                //             }
                //             localStorage[LOCAL_STORAGE_BASKET] = JSON.stringify(basket)
                //         } else {    // if user auth
                //             return fetch(request);
                //         }
                //     } else if (request.method.toUpperCase() === 'POST') { // запрос на формирование полной коризны
                //         request.body = localStorage[LOCAL_STORAGE_BASKET];
                //         return fetch(request);
                //     } else if (request.method.toUpperCase() === 'GET') {
                //         // TODO
                //     }
                // }
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
