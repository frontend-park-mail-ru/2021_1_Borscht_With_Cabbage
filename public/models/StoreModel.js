import eventBus from 'Modules/eventBus.js';
import {addDishInBasket, getBasket, storeGet, getReviews, getRecommendations} from 'Modules/api.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { ChangeBasketEvents } from 'Events/ChangeBasketEvents.js';
import user from '../modules/user.js';
import basket from '../modules/basket.js';
import address from "Modules/address.js";

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

    getRecommendations(id) {
        let address_ = address.getAddress()
        address_.latitude = parseFloat(address_.latitude)
        address_.longitude = parseFloat(address_.longitude)
         getRecommendations(id, address_.latitude, address_.longitude)
            .then(res =>{
                if (res.status === 200) {
                    eventBus.emit(StoreEvents.storeGetRecommendationsSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(StoreEvents.storeGetRecommendationsFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(StoreEvents.storeGetRecommendationsFailed, res.parsedJSON);
            })
    }
}

export default new StoreModel();
