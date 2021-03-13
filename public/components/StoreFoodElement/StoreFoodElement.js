import { renderFoodElement } from './StoreFoodElementTmpl.js';

export class StoreFoodElement {
    constructor ({
        root = document.body,
        food = null
    } = {}) {
        this.root = root;
        this.food = food;
    }

    render () {
        if (this.food) {
            this.root.innerHTML += renderFoodElement({ food: this.food });
        }
    }

    addListener (callback) {
        document.getElementById('store-food_list-add-id' + this.food.id)
            .addEventListener('click', () => {
                callback(this.food);
            });
    }
}
