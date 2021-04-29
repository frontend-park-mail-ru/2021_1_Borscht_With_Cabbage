import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { getWSKey, postBasket } from './api.js';
import basket from './basket.js';
import address from './address.js';
import socket from './socket.js';
import user from './user.js';

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
    return getWSKey()
        .then(responseKey => {
            socket.connect(responseKey.parsedJSON);
            return setBasket(res);
        })
        .catch(_ => setBasket(res));

}

function setAddress (user) {
    const localAddr = address.getAddress();
    const realAddr = localAddr.name ? localAddr : user.address;
    eventBus.emit(AuthEvents.changeActiveAddress, realAddr);
}

function setBasket (res) {
    if (basket.foods && user.role === 'user') {
        if (basket.foods.length > 0) {
            return sendBasketToServer(res);
        }
    }

    return res;
}

function sendBasketToServer (res) {
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
