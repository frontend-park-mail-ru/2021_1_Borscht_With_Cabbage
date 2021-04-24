import renderStoreFoodList from './StoreFoodListTmpl.hbs';
import { StoreFoodElement } from '../StoreFoodElement/StoreFoodElement.js';
import { StoreController } from '../../../controllers/StoreController.js';

export class StoreFoodList {
    constructor ({
        root = document.body,
        info = {},
        foods = [],
        controller = new StoreController({ root })
    } = {}) {
        this.root = root;
        this.info = info;
        this.foods = foods;
        this.controller = controller;
    }

    render () {
        this.root.innerHTML = renderStoreFoodList({});
        const foodList = this.root.querySelector('[data-id="food-list-ul"]');
        this.elements = [];
        if (this.foods) {
            for (const food of this.foods) {
                const element = new StoreFoodElement({
                    root: foodList,
                    food,
                    restaurant: this.info,
                    controller: this.controller
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
