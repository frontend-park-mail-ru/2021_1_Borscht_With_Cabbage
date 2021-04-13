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

    render (foods) {
        this.root.innerHTML = renderStoreFoodList({});
        const foodList = document.getElementById('food-list-ul');
        this.elements = [];
        if (foods) {
            for (const food of foods) {
                const element = new StoreFoodElement({
                    root: foodList,
                    food: food,
                    info: this.info
                });
                element.render();
                this.elements.push(element);
            }

            this.elements.forEach((element) => {
                console.log('elem -> ',element)
                element.addListener();
            });
        }
    }
}
