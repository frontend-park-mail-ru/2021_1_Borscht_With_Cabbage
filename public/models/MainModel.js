import { restaurantsGet } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { MainEvents } from '../events/MainEvents.js';

class MainModel {
    getRestaurants (url) {
        restaurantsGet({ url: url })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(MainEvents.mainGetRestaurantsSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(MainEvents.mainGetRestaurantsFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(MainEvents.mainGetRestaurantsFailed, res.parsedJSON));
    }
}

export default new MainModel();
