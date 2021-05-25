import eventBus from 'Modules/eventBus.js';
import { addDishInBasket, getBasket, storeGet, getReviews } from 'Modules/api.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { ChangeBasketEvents } from 'Events/ChangeBasketEvents.js';
import user from '../modules/user.js';
import basket from '../modules/basket.js';

class StoreModel {
    getDishes (url) {
        const promises = [];
        promises.push(storeGet({ url }));
        if (user.isAuth) {
            promises.push(getBasket(url.substr(1)));
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
                restaurant,
                isPlus
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

    getReviews(storeID) {
        getReviews(storeID)
            .then(res =>{
                if (res.status === 200) {
                    eventBus.emit(StoreEvents.storeGetReviewsSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(StoreEvents.storeGetReviewsFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(StoreEvents.storeGetReviewsFailed, res.parsedJSON);
            })
    }
}

export default new StoreModel();
