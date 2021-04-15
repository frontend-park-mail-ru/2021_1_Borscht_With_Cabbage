import renderStoreFoodList from './StoreFoodListTmpl.hbs';
import { StoreFoodElement } from '../StoreFoodElement/StoreFoodElement.js';

export class StoreFoodList {
    constructor ({
        root = document.body,
        info = {}
    } = {}) {
        this.root = root;
        this.info = info;
    }

    render () {
        this.root.innerHTML = renderStoreFoodList({});
        const foodList = document.getElementById('food-list-ul');
        this.elements = [];
        if (this.info.foods) {
            for (const food of this.info.foods) {
                const element = new StoreFoodElement({
                    root: foodList,
                    food: food,
                    restaurant: this.info
                });
                element.render();
                this.elements.push(element);
            }

            this.elements.forEach((element) => {
                element.addListener();
            });
        }
    }
}
