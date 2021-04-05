import eventBus from '../../modules/eventBus.js';
import { noop } from '../../modules/utils.js';
import { RestaurantMainController } from '../../controllers/RestaurantMainController.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { renderRestaurantMenu } from './RestaurantMenuTmpl.js';
import { DishComponent } from '../Dish/Dish.js'
import { renderDishAdding } from '../DishAdding/DishAdding.js'
import { DishEvents } from '../../events/DishEvents.js';
import { ConfirmationComponent } from '../Confirmation/Confirmation.js'
import { ConfirmationEvents } from '../../events/ConfirmationEvents.js'

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
        eventBus.on(DishEvents.updateDishSuccess, this.updateSuccess.bind(this));
        eventBus.on(DishEvents.getAllDishSuccess, this.appendDishes.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.dishLoadingError.bind(this));
        eventBus.on(DishEvents.closeAddingDishComponent, this.closeAddingDishComponent.bind(this));
        eventBus.on(DishEvents.editDish, this.editDish.bind(this));
        eventBus.on(DishEvents.deleteDish, this.deleteDish.bind(this));
        eventBus.on(ConfirmationEvents.confirmationSuccess, this.confirmationSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationFailed, this.confirmationFailed.bind(this));
        eventBus.on(DishEvents.deleteDishSuccess, this.deleteDishSuccess.bind(this));
        eventBus.on(DishEvents.deleteDishFailed, this.deleteDishFailed.bind(this));
    }

    render () {
        this.root.innerHTML = renderRestaurantMenu({});

        this.controller.getDishes();
    }

    appendDish (content, dish) {
        if(!content || !dish) {
            return;
        }

        let dishAddingBtn = content.querySelector('.card-add');
        if (dishAddingBtn) {
            dishAddingBtn.remove();
        }
        const dishItem = new DishComponent({ root: content, dish: dish });
        dishItem.render();

        dishAddingBtn = document.createElement('li');
        dishAddingBtn.classList.add('card-add', 'card');
        dishAddingBtn.innerHTML = renderDishAdding();
        content.appendChild(dishAddingBtn);

        this.addAddDishEventListeners();
    }

    dishLoadingError (error) {
        // TODO: показать пользователю ошибку
    }

    appendDishes (dishes) {
        // TODO: в будущем, когда будут разделы в меню, надо будет поменять
        const content = this.root.querySelector('.menu-container__content');
        if (!content) {
            return;
        }
        content.innerHTML = '';
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

    closeAddingDishComponent () {
        this.addingDishItem.innerHTML = '';
    }

    addingSuccess (dish) {
        this.addingDishItem.innerHTML = '';
        const content = this.root.querySelector('.menu-container__content');
        this.appendDish(content, dish);
    }

    updateSuccess (dish) {
        this.addingDishItem.innerHTML = '';
    }

    editDish (dish) {
        this.addingDishItem = document.createElement('div');
        this.root.append(this.addingDishItem);

        const addingDish = new RestaurantAddingDish({
            root: this.addingDishItem,
            goTo: this.goTo,
            controller: this.controller,
            dish: dish
        });
        addingDish.render();
    }

    deleteDish (dish) {
        this.deleteDish = dish;
        const confirmation = new ConfirmationComponent({ root: this.root });
        confirmation.render();
    }

    confirmationSuccess () {
        if(!this.deleteDish) {
            return;
        }

        this.controller.deleteDish(this.deleteDish.id);
    }

    confirmationFailed () {
        this.deleteDish = null;
    }

    deleteDishSuccess () {
        console.log('deleteDishSuccess');
    }

    deleteDishFailed () {
        console.log('deleteDishFailed');
    }
}
