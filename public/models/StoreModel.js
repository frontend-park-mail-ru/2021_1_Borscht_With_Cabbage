import eventBus from '../modules/eventBus.js';
import { storeGet } from '../modules/api.js';
import { StoreEvents } from '../events/StoreEvents.js';

export class StoreModel {
    getDishes (url) {
        storeGet({ url: url })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(StoreEvents.storeGetDishesSuccess, res.parsedJSON);
                } else {
                    eventBus.emit(StoreEvents.storeGetDishesFailed, res.parsedJSON);
                }
            })
            .catch(res => {
                eventBus.emit(StoreEvents.storeGetDishesFailed, res.parsedJSON);
            });
    }
}
