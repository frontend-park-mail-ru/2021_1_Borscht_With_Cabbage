import eventBus from '../modules/eventBus.js';
import { addDishInBasket, getBasket, storeGet } from '../modules/api.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { ChangeBasketEvents } from '../events/ChangeBasketEvents.js';

export class StoreModel {
    getDishes (url) {
        const food = storeGet({ url: url });
        const basket = getBasket();

        Promise.all([food, basket])
            .then(res => {
                // const data_ = {};
                // data_.status = Math.max(res[0].status, res[1].status);
                // if (res[0].status !== 200 || res[1].status !== 200) {
                //     if (res[0].status !== 200) {
                //         data_.parsedJSON = res[0].parsedJSON;
                //     } else {
                //         data_.parsedJSON = res[1].parsedJSON;
                //     }
                // } else {
                //     data_.parsedJSON = Object.assign(
                //         res[0].parsedJSON, { basket: res[1].parsedJSON });
                // }
                const data_ = res[0]
                console.log('data_ -> ', data_)
                if (data_.status === 200) {
                    eventBus.emit(StoreEvents.storeGetDishesSuccess, data_.parsedJSON);
                } else {
                    eventBus.emit(StoreEvents.storeGetDishesFailed, data_.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(StoreEvents.storeGetDishesFailed, res.parsedJSON);
            });
    }

    addDish ({
        dishID = '',
        restaurantID = '',
        isNewBasket = true,
        isPlus = true
    } = {}) {
        console.log(dishID, restaurantID, isNewBasket, isPlus)
        addDishInBasket({
            dishID,
            restaurantID,
            same: !isNewBasket,
            isPlus
        })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(ChangeBasketEvents.chooseFoodSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(ChangeBasketEvents.chooseFoodFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(ChangeBasketEvents.chooseFoodFailed, res.parsedJSON);
            });
    }
}
