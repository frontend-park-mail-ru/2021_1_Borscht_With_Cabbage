import { restaurantsGet } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { MainEvents } from 'Events/MainEvents.js';

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
