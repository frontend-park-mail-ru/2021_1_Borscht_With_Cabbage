import eventBus from '../../modules/eventBus.js';
import { noop } from '../../modules/utils.js';
import { RestaurantMainController } from "../../controllers/RestaurantMainController.js";
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { renderRestaurantMenu } from "./RestaurantMenuTmpl.js";
import AddingDishEvents from "../../events/AddingDish.js";

export class RestaurantMenuComponent {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        eventBus.on(AddingDishEvents.addingDishSuccess, this.addingSuccess.bind(this));
    }

    render () {
        this.root.innerHTML += renderRestaurantMenu({});

        this.addAddDishEventListeners();
    }

    addAddDishEventListeners () {
        const addDish = this.root.querySelector('.menu-container__add-section');
        if (!addDish) {
            return;
        }

        addDish.addEventListener('click', e => {
            e.preventDefault();

            this.addingDishItem = document.createElement('div');
            this.root.append(this.addingDishItem);

            const addingDish = new RestaurantAddingDish({
                root: this.addingDishItem,
                goTo: this.goTo,
                controller: this.controller
            });
            addingDish.render();
        });
    }

    addingSuccess () {
        this.addingDishItem.innerHTML = '';
    }
}
