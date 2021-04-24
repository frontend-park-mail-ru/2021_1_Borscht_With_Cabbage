import eventBus from '../modules/eventBus.js';
import { addDishInBasket, getBasket, storeGet } from '../modules/api.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { ChangeBasketEvents } from '../events/ChangeBasketEvents.js';
import user from '../modules/user.js';
import basket from '../modules/basket.js';

class StoreModel {
    getDishes (url) {
        const promises = [];
        promises.push(storeGet({ url }));
        if (!user.isAuth) {

        } else {
            promises.push(getBasket());
        }

        Promise.all(promises)
            .then(res => {
                const data_ = {};
                if (res[0].status !== 200) {
                    data_.status = res[0].status;
                    data_.parsedJSON = res[0].parsedJSON;
                } else {
                    data_.status = res[0].status;
                    if (res.length > 1) {
                        if (res[1].status !== 200) {
                            data_.parsedJSON = Object.assign(res[0].parsedJSON, { basket: {} });
                        } else {
                            data_.parsedJSON = Object.assign(res[0].parsedJSON, { basket: res[1].parsedJSON });
                        }
                    } else {
                        data_.parsedJSON = Object.assign(res[0].parsedJSON, { basket: {} });
                    }
                }
                console.log(data_)
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
        isNewBasket = true,
        isPlus = true,
        food,
        restaurant
    } = {}) {
        if (!user.isAuth) {
            basket.addNew({
                food,
                restaurant
            });
            return;
        }
        addDishInBasket({
            dishID: food.id,
            restaurantID: restaurant.id,
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

export default new StoreModel();
