import renderStoreFoodList from './StoreFoodListTmpl.hbs';
import { StoreFoodElement } from '../StoreFoodElement/StoreFoodElement.js';

export class StoreFoodList {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
    }

    render (foods) {
        console.log(this.root, foods)
        this.root.innerHTML = renderStoreFoodList({});
        const foodList = document.getElementById('food-list-ul');
        this.elements = [];
        if (foods) {
            for (const food of foods) {
                const element = new StoreFoodElement({
                    root: foodList,
                    food: food
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
