import { RestaurantMainModel } from '../models/RestaurantMainModel.js';
// import { Validator } from '../modules/validation.js';

export class RestaurantMainController {
    constructor () {
        this.mainModel = new RestaurantMainModel();
    }
}
