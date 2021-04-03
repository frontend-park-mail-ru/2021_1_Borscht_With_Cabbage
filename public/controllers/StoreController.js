import { StoreModel } from '../models/StoreModel.js';

export class StoreController {
    constructor () {
        this.storeModel = new StoreModel();
    }

    getDishes (url) {
        this.storeModel.getDishes(url.substring('/restaurant'.length));
    }
}
