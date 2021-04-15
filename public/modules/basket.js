import eventBus from './eventBus.js';
import { ChangeBasketEvents } from '../events/ChangeBasketEvents.js';
import { StoreEvents } from '../events/StoreEvents.js';

class Basket {
    constructor () {
        eventBus.on(ChangeBasketEvents.chooseFoodSuccess, this.makeNew.bind(this));
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.makeNew_.bind(this))
    }

    makeNew ({
        id = '',
        restaurantName = '',
        restaurantID = '',
        foods = [],
        deliveryPrice = 0,
        totalPrice = 0
    } = {}) {
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantID = restaurantID;
        this.foods = foods;
        this.deliveryPrice = deliveryPrice;
        this.totalPrice = totalPrice;
    }

    clear () {
        this.makeNew({});
    }

    makeNew_ (store) {
        const basket = store.basket;
        this.makeNew(basket);
    }

    addNew ({
        food = {},
        restaurant = {}
    } = {}) {
        if (this.restaurantID !== restaurant.id) {
            this.clear();
            this.restaurantID = restaurant.id;
            this.restaurantName = restaurant.title;
            this.deliveryPrice = restaurant.deliveryPrice;
        }
        const thatFood = this.foods.find(value => value.id === food.id);
        if (thatFood) {
            for (const food_ of this.foods) {
                if (food_ === thatFood.id) {
                    food_.num += 1;
                    break;
                }
            }
        } else {
            this.foods.push({ id: food.id, num: 1 })
        }
        this.totalPrice += food.price;
    }
}

export default new Basket();
