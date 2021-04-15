import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { postBasket } from './api.js';
import basket from './basket.js';

export function auth (promise) {
    if (promise.status !== 200) {
        eventBus.emit(AuthEvents.notAuth, {});
    } else {
        eventBus.emit(AuthEvents.userSignIn, promise.parsedJSON);
    }

    if (basket.foods) {
        if (basket.foods.length > 0) {
            return postBasket({
                restaurantID: basket.restaurantID,
                foods: basket.foods
            }).then(_ => promise);
        } else {
            return promise;
        }
    } else {
        return promise;
    }
}
