import { BasketModel } from '../models/BasketModel.js';
import { Validator } from '../modules/validation.js';

export class BasketController {
    constructor () {
        this.basketModel = new BasketModel();
    }

    getBasket () {
        this.basketModel.getBasket();
    }

    order ({
        address = '',
        number = '',
        comments = ''
    } = {}) {
        const addressError = Validator.validateDescription(address);
        const numberError = Validator.validateNumber(number);

        if (addressError && numberError) {
            this.basketModel.order({ address, number, comments });
            return {
                error: false
            };
        }
        return {
            error: true,
            addressError,
            numberError
        };
    }
}
