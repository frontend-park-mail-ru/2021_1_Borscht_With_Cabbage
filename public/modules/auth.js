import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { postBasket } from './api.js';
import basket from './basket.js';
import address from './address.js';

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

    setAddress(res.parsedJSON);

    if (basket.foods) {
        if (basket.foods.length > 0) {
            return setBasket(res);
        }
    }

    return res;
}

function setAddress (user) {
    const localAddr = address.getAddress();
    const realAddr = localAddr.name ? localAddr : user.address;
    eventBus.emit(AuthEvents.changeActiveAddress, realAddr);
}

function setBasket (res) {
    return postBasket({
        restaurantID: basket.restaurantID,
        foods: basket.foods
    })
        .then(res => {
            if (res.status === 200) {
                basket.makeNew(res.parsedJSON);
            }
        })
        .then(_ => res);
}