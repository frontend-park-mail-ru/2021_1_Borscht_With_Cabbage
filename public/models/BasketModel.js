import eventBus from 'Modules/eventBus.js';
import { getBasket, orderPost } from 'Modules/api.js';
import { BasketEvents } from 'Events/BasketEvents.js';

class BasketModel {
    getBasket (idRestaurant) {
        getBasket(idRestaurant)
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(BasketEvents.basketGetBasketSuccess, res.parsedJSON);
                } else {
                    // console.log('basket get failed', res)
                    eventBus.emit(BasketEvents.basketGetBasketFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                // console.log('basket get catch', res);
                eventBus.emit(BasketEvents.basketGetBasketFailed, res.parsedJSON);
            });
    }

    order ({
        address,
        number,
        comments,
        basketID
    } = {}) {
        orderPost({ address, number, comments, basketID })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(BasketEvents.basketOrderSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(BasketEvents.basketOrderFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(BasketEvents.basketOrderFailed, res.parsedJSON);
            });
    }
}

export default new BasketModel();
