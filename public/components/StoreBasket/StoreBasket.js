import { renderStoreBasket } from './StoreBasketTmpl.js';
import { StoreBasketFood } from '../StoreBasketFood/StoreBasketFood.js';

export class StoreBasket {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
    }

    render (goTo) {
        this.root.innerHTML = renderStoreBasket({});
        document.getElementById('store-basket-order')
            .addEventListener('click', () => goTo('basket'));
    }

    append (food) {
        const foodElement = new StoreBasketFood({
            root: document.getElementById('store-basket-food_list')
        });
        foodElement.render(food);
        const totalSum = document.getElementById('store-basket-total');
        totalSum.textContent = String(Number(totalSum.textContent) + Number(food.price));
    }
}