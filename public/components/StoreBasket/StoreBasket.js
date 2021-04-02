import { renderStoreBasket } from './StoreBasketTmpl.js';
import { StoreBasketFood } from './StoreBasketFood/StoreBasketFood.js';

export class StoreBasket {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
        this.elements = [];
    }

    render (goTo) {
        this.root.innerHTML = renderStoreBasket({});
        document.getElementById('restaurant-basket__order')
            .addEventListener('click', () => goTo('basket'));
    }

    append (food, isPlus) {
        const element = document.getElementById('chosen_food-id-' + food.id);
        const totalSum = document.getElementById('restaurant-basket__sum');
        if (isPlus) {
            if (element) {
                this.elements.forEach(element => {
                    if (element.food.id === food.id) {
                        element.add();
                    }
                });
            } else { // if new element
                const foodElement = new StoreBasketFood({
                    root: document.getElementById('restaurant-basket__items'),
                    food: food
                });
                foodElement.render();
                this.elements.push(foodElement);
            }
            totalSum.textContent = String(Number(totalSum.textContent) + Number(food.price));
        } else {
            if (element) {
                let index = null;
                this.elements.forEach((element, i) => {
                    if (element.food.id === food.id) {
                        if (element.takeAway()) {
                            index = i;
                        }
                    }
                });
                if (index !== null) {
                    this.elements.splice(index, 1);
                }
                totalSum.textContent = String(Number(totalSum.textContent) - Number(food.price));
            } else { // if new element
                console.log('I try to takeAway element, that not exist (StoreBasket->append)\nKinda error?');
            }
        }
    }
}
