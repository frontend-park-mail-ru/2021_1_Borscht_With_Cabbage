import { BasketModel } from '../models/BasketModel.js';

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
        if (address) {
            this.basketModel.order( { address, number, comments });
        }
    }
}
