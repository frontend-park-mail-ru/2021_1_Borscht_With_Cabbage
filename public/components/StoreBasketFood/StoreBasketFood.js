import { renderStoreBasketFood } from './StoreBasketFoodTmpl.js';

export class StoreBasketFood {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
    }

    render (food) {
        this.root.innerHTML += renderStoreBasketFood({
            chosenDish: food
        });
    }
}
