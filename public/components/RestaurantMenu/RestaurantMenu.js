import eventBus from '../../modules/eventBus.js';
import { noop } from '../../modules/utils.js';
import { RestaurantMainController } from '../../controllers/RestaurantMainController.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { renderRestaurantMenu } from './RestaurantMenuTmpl.js';
import { DishComponent } from '../Dish/Dish.js'
import { renderDishAdding } from '../DishAdding/DishAdding.js'
import { DishEvents } from '../../events/DishEvents.js';

export class RestaurantMenuComponent {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        eventBus.on(DishEvents.addingDishSuccess, this.addingSuccess.bind(this));
        eventBus.on(DishEvents.getAllDishSuccess, this.appendDishes.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.dishLoadingError.bind(this));
    }

    render () {
        this.root.innerHTML += renderRestaurantMenu({});

        this.controller.getDishes();
    }

    appendDish (content, dish) {
        if(!content || !dish) {
            return;
        }

        const dishAddingBtn = content.querySelector('.card-add');
        if (dishAddingBtn) {
            dishAddingBtn.remove();
        }
        const dishItem = new DishComponent({ root: content, dish: dish });
        dishItem.render();
        content.innerHTML += renderDishAdding();
        this.addAddDishEventListeners();
    }

    dishLoadingError (error) {
        // TODO: показать пользователю ошибку
    }

    appendDishes (dishes) {
        // TODO: в будущем, когда будут разделы в меню, надо будет поменять
        const content = this.root.querySelector('.menu-container__content');
        dishes.forEach(dish => {
            this.appendDish(content, dish);
        });
    }

    addAddDishEventListeners () {
        const addDish = this.root.querySelector('.card-add');
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

    addingSuccess (dish) {
        this.addingDishItem.innerHTML = '';
        this.appendDish(dish);
    }
}
