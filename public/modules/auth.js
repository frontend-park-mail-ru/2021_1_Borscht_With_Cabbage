import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { postBasket } from './api.js';
import basket from './basket.js';

/**
 *
 * @param res
 * @returns {*|Promise<{parsedJSON: Object, status: Number}>}
 */
export function auth (res) {
    if (res.status !== 200) {
        eventBus.emit(AuthEvents.notAuth, {});
    } else {
        eventBus.emit(AuthEvents.userSignIn, res.parsedJSON);
    }

    if (basket.foods) {
        if (basket.foods.length > 0) {
            return postBasket({
                restaurantID: basket.restaurantID,
                foods: basket.foods
            })
                .then(res => {
                    if (res.status === 200) {
                        basket.makeNew(res.parsedJSON);
                    }
                })
                .then(_ => {console.log(_, res); return res;});
        } else {
            return res;
        }
    } else {
        return res;
    }
}
