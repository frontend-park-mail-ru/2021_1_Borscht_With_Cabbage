import { Validator } from '../modules/validation.js';
import { RestaurantMainModel } from '../models/RestaurantMainModel.js';

export class RestaurantMainController {
    constructor () {
        this.mainModel = new RestaurantMainModel();
    }

    getDishes () { 
        this.mainModel.getDish();
    }

    addDish ({ name, description, price, weight }) {
        const nameError = Validator.validateName(name);
        const descriptionError = Validator.validateDescription(description);
        const priceError = Validator.validateNumber(price);
        const weightError = Validator.validateNumber(weight);

        if (nameError.result * descriptionError.result * priceError.result * weightError.result) {
            this.mainModel.addDish({ name, description, price: Number(price), weight: Number(weight) });
            return {
                error: false
            }
        } else {
            return {
                error: true,
                nameError,
                descriptionError,
                priceError,
                weightError
            }
        }
    }
}
