import { restaurantAddDishPost, allDishesGet } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import DishEvents from '../events/Dish.js';

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

    addDish ({ name, description, price, weight}) {
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
}
