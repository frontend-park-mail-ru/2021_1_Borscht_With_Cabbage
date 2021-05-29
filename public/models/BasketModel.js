import eventBus from 'Modules/eventBus.js';
import { getBasket, orderPost } from 'Modules/api.js';
import { BasketEvents } from 'Events/BasketEvents.js';
import address from "Modules/address";

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
        deliveryAddress,
        number,
        comments,
        basketID
    } = {}) {
        let address_ = address.getAddress()
        address_.latitude = parseFloat(address_.latitude)
        address_.longitude = parseFloat(address_.longitude)
        orderPost({ deliveryAddress, number, comments, basketID, }, address_.latitude, address_.longitude )
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
