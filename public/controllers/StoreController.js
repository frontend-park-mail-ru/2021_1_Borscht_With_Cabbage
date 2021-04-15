import { StoreModel } from '../models/StoreModel.js';

export class StoreController {
    constructor () {
        this.storeModel = new StoreModel();
    }

    getDishes (url) {
        this.storeModel.getDishes(url.substring('/store'.length));
    }

    addDish ({
        isNewBasket = true,
        isPlus = true,
        food = {},
        restaurant = {}
    } = {}) {
        this.storeModel.addDish({
            isNewBasket,
            isPlus,
            food,
            restaurant
        });
    }
}
