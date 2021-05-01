import eventBus from 'Modules/eventBus.js';
import { getBasket, orderPost } from 'Modules/api.js';
import { BasketEvents } from 'Events/BasketEvents.js';


export class BasketModel {
    getBasket () {
        getBasket()
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(BasketEvents.basketGetBasketSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(BasketEvents.basketGetBasketFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(BasketEvents.basketGetBasketFailed, res.parsedJSON);
            });
    }

    order ({
        address,
        number,
        comments
    } = {}) {
        orderPost({ address, number, comments })
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
