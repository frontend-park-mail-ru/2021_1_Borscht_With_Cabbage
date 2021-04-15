import eventBus from './eventBus.js';
import { ChangeBasketEvents } from '../events/ChangeBasketEvents.js';
import { StoreEvents } from '../events/StoreEvents.js';

class Basket {
    constructor () {
        eventBus.on(ChangeBasketEvents.chooseFoodSuccess, this.makeNew.bind(this));
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.makeNew_.bind(this))
    }

    makeNew(basket) {
        this.id = basket.id;
        this.restaurantName = basket.restaurantName;
        this.restaurantID = basket.restaurantID;
        this.foods = basket.foods;
        this.deliveryPrice = basket.deliveryPrice;
        this.totalPrice = basket.totalPrice;
    }

    makeNew_(store) {
        const basket = store.basket;
        this.id = basket.id;
        this.restaurantName = basket.restaurantName;
        this.restaurantID = basket.restaurantID;
        this.foods = basket.foods;
        this.deliveryPrice = basket.deliveryPrice;
        this.totalPrice = basket.totalPrice;
    }
}

export default new Basket();
