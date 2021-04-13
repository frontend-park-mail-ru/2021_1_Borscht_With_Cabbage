import eventBus from './eventBus.js';
import { ChangeBasketEvents } from '../events/ChangeBasketEvents.js';

class Basket {
    constructor () {
        eventBus.on(ChangeBasketEvents.chooseFoodSuccess, this.makeNew.bind(this))
    }

    makeNew(basket) {
        this.id = basket.id;
        this.restaurantName = basket.restaurantName;
        this.restaurantID = basket.restaurantID;
        this.foods = basket.foods;
        this.deliveryPrice = basket.deliveryPrice;
        this.totalPrice = basket.totalPrice;
    }
}

export default new Basket();
