import { restaurantAddDishPost, allDishesGet } from '../modules/api.js';
import { restaurantUpdateDishPut, restaurantDeleteDish } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { DishEvents } from '../events/DishEvents.js';

export class RestaurantMainModel {
    getDish () {
        allDishesGet().then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.getAllDishSuccess, res.parsedJSON)
                } else {
                    eventBus.emit(DishEvents.getAllDishFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(DishEvents.getAllDishFailed, res.parsedJSON));
    }

    addDish ({ name, description, price, weight }) {
        restaurantAddDishPost({ name, description, price, weight})
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.addingDishSuccess, res.parsedJSON)
                } else {
                    eventBus.emit(DishEvents.addingDishFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(DishEvents.addingDishFailed, res.parsedJSON));
    }

    updateDish ({ id, name, description, price, weight }) {
        restaurantUpdateDishPut({ id, name, description, price, weight})
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(DishEvents.updateDishSuccess, res.parsedJSON)
                } else {
                    eventBus.emit(DishEvents.updateDishFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(DishEvents.updateDishFailed, res.parsedJSON));
    }

    deleteDish ({ id }) {
        restaurantDeleteDish({ id: id })
            .then(res => {
                if (res.status === 200) {
                    console.log('model success');
                    eventBus.emit(DishEvents.deleteDishSuccess)
                } else {
                    console.log('model failed');
                    eventBus.emit(DishEvents.deleteDishFailed, res.parsedJSON)
                }
            })
            .catch(res => {
                console.log('model failed');
                // TODO: понять почему здесь вызывается когда проходит по then
            });
    }
}
