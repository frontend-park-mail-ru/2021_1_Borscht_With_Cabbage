import { restaurantAddDishPost } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import AddingDishEvents from '../events/AddingDish.js';

export class RestaurantMainModel {
    addDish ({ name, description, price, weight}) {
        restaurantAddDishPost({ name, description, price, weight})
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(AddingDishEvents.addingDishSuccess, {})
                } else {
                    eventBus.emit(AddingDishEvents.addingDishFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(AddingDishEvents.addingDishFailed, res.parsedJSON));
    }
}
