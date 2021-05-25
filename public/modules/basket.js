import eventBus from './eventBus.js';
import { ChangeBasketEvents } from 'Events/ChangeBasketEvents.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { AuthEvents } from '../events/AuthEvents.js';
import { BasketEvents } from '../events/BasketEvents.js';

class Basket {
    constructor () {
        eventBus.on(ChangeBasketEvents.chooseFoodSuccess, this.makeNew.bind(this));
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.makeNew_.bind(this));
        eventBus.on(BasketEvents.basketGetBasketsSuccess, this.renewBaskets.bind(this));
        // eventBus.on(AuthEvents.userLogout, this.clear.bind(this));
        // eventBus.on(BasketEvents.basketOrderSuccess, this.clear.bind(this));
        // this.clear();
        this.baskets = [];
    }

    makeNew ({
        id = '',
        restaurantName = '',
        restaurantID = '',
        foods = [],
        deliveryPrice = 0,
        totalPrice = 0
    } = {}) {
        console.log('makeNew', this.baskets)
        if (!id) {
            return;
        }

        const curBasket = this.baskets.find(basket => basket.restaurantID === restaurantID);
        if (!curBasket) {
            this.baskets.push({
                id,
                restaurantName,
                restaurantID,
                foods,
                deliveryPrice,
                totalPrice
            });
        } else {
            curBasket.id = id;
            curBasket.foods = foods;
            curBasket.totalPrice = totalPrice;
        }
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
        if (basket.id) {
            console.log('here not null mister', basket)
            this.makeNew(basket);
        }
    }

    addNew ({
        food = {},
        restaurant = {},
        isPlus = true
    } = {}) {
        console.log('addNew 0 ', this.baskets, food, restaurant, isPlus)
        const curBasket = this.baskets.find(basket => basket.restaurantID === restaurant.id);
        console.log('addNew 1', curBasket, this.baskets)
        const _food = {
            id: food.id,
            num: 1,
            image: food.image,
            name: food.name,
            price: food.price
        };
        console.log('before before before', this.baskets)
        if (curBasket) {
            const thatFood = curBasket.foods.find(value => value.id === food.id);
            if (thatFood) {
                for (const food_ of curBasket.foods) {
                    if (food_.id === thatFood.id) {
                        if (isPlus) {
                            food_.num += 1;
                            curBasket.totalPrice += food.price;
                        } else {
                            if (food_.num === 1) {
                                curBasket.foods = curBasket.foods.filter(food__ => food__ !== food_);
                            } else {
                                food_.num -= 1;
                            }
                            curBasket.totalPrice -= food.price;
                        }
                        break;
                    }
                }
            } else {
                curBasket.foods.push(_food);
            }
        } else {
            console.log('before before', this.baskets)
            const countID = this.baskets.length ? this.baskets[this.baskets.length - 1].id + 1 : 1;
            console.log('before', this.baskets)
            this.makeNew({
                id: countID,
                restaurantName: restaurant.title,
                restaurantID: restaurant.id,
                foods: [_food],
                deliveryPrice: restaurant.deliveryCost,
                totalPrice: _food.price
            });
            console.log('after', this.baskets)
        }


        console.log('addNew end', this.baskets, curBasket)
    }

    renewBaskets (baskets) {
        console.log('renewBaskets')
        this.baskets = [];
        baskets.forEach(basket => {
            this.baskets.push(basket)
        });
    }
}

export default new Basket();
