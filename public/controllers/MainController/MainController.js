import { MainModel } from '../../models/MainModel.js';

export class MainController {
    constructor () {
        this.mainModel = new MainModel()
    }

    getRestaurants (url) {
        this.mainModel.getRestaurants(url)
    }
}
