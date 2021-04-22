import storeModel from '../models/StoreModel.js';
import { noop } from '../modules/utils.js';
import eventBus from '../modules/eventBus.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { StoreView } from '../views/StoreView.js';

export class StoreController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.storeView = new StoreView({ root, goTo, controller: this })
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.storePageDraw.bind(this));
        eventBus.on(StoreEvents.storeGetDishesFailed, this.loadError.bind(this));
    }

    getDishes (url) {
        storeModel.getDishes(url.substring('/store'.length));
    }

    addDish ({
        isNewBasket = true,
        isPlus = true,
        food = {},
        restaurant = {}
    } = {}) {
        storeModel.addDish({
            isNewBasket,
            isPlus,
            food,
            restaurant
        });
    }

    render (url) {
        this.getDishes(url);
    }

    storePageDraw (info) {
        this.storeView.render(info);
    }

    loadError (error) {
        this.storeView.renderServerError(error);
    }
}
