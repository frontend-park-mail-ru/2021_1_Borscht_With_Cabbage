import eventBus from './eventBus.js';
import { ChangeBasketEvents } from 'Events/ChangeBasketEvents.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { BasketEvents } from '../events/BasketEvents.js';

class Basket {
    constructor () {
        eventBus.on(ChangeBasketEvents.chooseFoodSuccess, this.makeNew.bind(this));
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.makeNew_.bind(this));
        eventBus.on(AuthEvents.userLogout, this.clear.bind(this));
        eventBus.on(BasketEvents.basketOrderSuccess, this.clear.bind(this));
        this.clear();
    }

    makeNew ({
        id = '',
        restaurantName = '',
        restaurantID = '',
        foods = [],
        deliveryPrice = 0,
        totalPrice = 0
    } = {}) {
        if (!id) {
            return;
        }
        this.id = id;
        this.restaurantName = restaurantName;
        this.restaurantID = restaurantID;
        this.foods = foods;
        this.deliveryPrice = deliveryPrice;
        this.totalPrice = totalPrice;
    }

    clear () {
        this.id = '';
        this.restaurantName = '';
        this.restaurantID = '';
        this.foods = [];
        this.deliveryPrice = 0;
        this.totalPrice = 0;
    }

    makeNew_ (store) {
        const basket = store.basket;
        if (basket) {
            this.makeNew(basket);
        }
    }

    addNew ({
        food = {},
        restaurant = {},
        isPlus = true
    } = {}) {
        if (this.restaurantID !== restaurant.id) {
            this.clear();
            this.restaurantID = restaurant.id;
            this.restaurantName = restaurant.title;
            this.deliveryPrice = restaurant.deliveryCost;
        }
        const thatFood = this.foods.find(value => value.id === food.id);
        if (thatFood) {
            for (const food_ of this.foods) {
                if (food_.id === thatFood.id) {
                    if (isPlus) {
                        food_.num += 1;
                        this.totalPrice += food.price;
                    } else {
                        if (food_.num === 1) {
                            this.foods = this.foods.filter(food__ => food__ !== food_);
                        } else {
                            food_.num -= 1;
                        }
                        this.totalPrice -= food.price;
                    }
                    break;
                }
            }
        } else {
            this.foods.push({
                id: food.id,
                num: 1,
                image: food.image,
                name: food.name,
                price: food.price
            });
        }
    }
}

export default new Basket();
