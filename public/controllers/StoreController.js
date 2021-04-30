import { StoreModel } from '../models/StoreModel.js';

export class StoreController {
    constructor () {
        this.storeModel = new StoreModel();
    }

    getDishes (url) {
        this.storeModel.getDishes(url.substring('/restaurant'.length));
    }

    addDish ({
        dishID = '',
        restaurantID = '',
        isNewBasket = true,
        isPlus = true
    } = {}) {
        this.storeModel.addDish({
            dishID,
            restaurantID,
            isNewBasket,
            isPlus
        })
    }

    getReviews(storeID) {
        this.storeModel.getReviews(storeID)
    }
}
