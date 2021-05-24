import { getBaskets } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';

class ChoseModel {
    deleteBasket (id) {

    }

    getBaskets (params, successEvent, failEvent) {
        getBaskets(params)
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(successEvent, res.parsedJSON);
                } else {
                    eventBus.emit(failEvent, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(failEvent, res.parsedJSON));
    }
}

export default new ChoseModel();
