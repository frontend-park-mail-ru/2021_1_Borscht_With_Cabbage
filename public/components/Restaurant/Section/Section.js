import { renderSection } from './SectionTmpl.js';
import eventBus from '../../../modules/eventBus.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { DishComponent } from '../Dish/Dish.js'
import { renderDishAdding } from '../DishAdding/DishAdding.js'
import { DishEvents } from '../../../events/DishEvents.js';

export class SectionComponent {
    constructor ({
        root = document.body,
        section = null,
        controller = new RestaurantMainController()
    } = {}) {
        console.log('section:', section);
        this.root = root;
        this.section = section;
        this.controller = controller;
        eventBus.on(DishEvents.addingDishSuccess + section.sectionId, this.addingDishSuccess.bind(this));
        eventBus.on(DishEvents.closeAddingDishComponent + section.sectionId, this.closeAddingDishComponent.bind(this));
        eventBus.on(DishEvents.editDish + section.sectionId, this.editDish.bind(this));
        eventBus.on(DishEvents.deleteDish + section.sectionId, this.deleteDish.bind(this));
        eventBus.on(DishEvents.deleteDishSuccess + section.sectionId, this.deleteDishSuccess.bind(this));
        eventBus.on(DishEvents.deleteDishFailed + section.sectionId, this.deleteDishFailed.bind(this));
    }

    render () {
        if (this.section) {
            const sectionItem = document.createElement('div');
            sectionItem.innerHTML += renderSection({ section: this.section });
            this.root.append(sectionItem);
        }

        this.container = this.root.querySelector(`[data-section-list-id="${this.section.sectionId}"]`);
        this.appendDishes(this.section.dishes);
    }

    appendDish (dish) {
        console.log('dish:', dish);
        if(!dish) {
            return;
        }

        let dishAddingBtn = this.container.querySelector('.card-add');
        if (dishAddingBtn) {
            dishAddingBtn.remove();
        }

        const dishItem = document.createElement('li');
        dishItem.classList.add('card');
        dishItem.dataset.dishId = dish.id;
        this.container.appendChild(dishItem);
        const dishComponent = new DishComponent({ root: dishItem, dish: dish });
        dishComponent.render();

        dishAddingBtn = document.createElement('li');
        dishAddingBtn.classList.add('card-add', 'card');
        dishAddingBtn.innerHTML = renderDishAdding();
        this.container.appendChild(dishAddingBtn);

        this.addAddDishEventListeners();
    }

    dishLoadingError (error) {
        // TODO: показать пользователю ошибку
    }

    appendDishes (dishes) {
        console.log('all dishes:', dishes);
        console.log(this.container);
        this.container.innerHTML = '';
        const dishAddingBtn = document.createElement('li');
        dishAddingBtn.classList.add('card-add', 'card');
        dishAddingBtn.innerHTML = renderDishAdding({});
        this.container.appendChild(dishAddingBtn);
        this.addAddDishEventListeners();

        dishes.forEach(dish => {
            this.appendDish(dish);
        });
    }

    addAddDishEventListeners () {
        console.log('container:', this.container);
        const addDish = this.container.querySelector('.card-add');
        if (!addDish) {
            return;
        }

        addDish.addEventListener('click', e => {
            e.preventDefault();

            this.addingDishItem = document.createElement('div');
            this.root.append(this.addingDishItem);
            console.log('addindDish:', this.addingDishItem);

            const addingDish = new RestaurantAddingDish({
                root: this.addingDishItem,
                goTo: this.goTo,
                controller: this.controller,
                section: this.section.sectionId
            });
            addingDish.render();
        });
    }

    closeAddingDishComponent () {
        console.log(this.addingDishItem);
        this.addingDishItem.remove();
    }

    addingDishSuccess (dish) {
        this.addingDishItem.remove();
        this.appendDish(dish);
    }

    editDish (dish) {
        this.addingDishItem = document.createElement('div');
        this.root.append(this.addingDishItem);

        const addingDish = new RestaurantAddingDish({
            root: this.addingDishItem,
            goTo: this.goTo,
            controller: this.controller,
            dish: dish,
            section: this.section.sectionId
        });
        addingDish.render();
    }

    deleteDish (dish) {
        this.deleteDish = dish;
        this.controller.deleteDish(dish.id, this.section.sectionId);
    }

    deleteDishSuccess () {
        console.log('deleteDishSuccess', this.deleteDish);
        if (!this.deleteDish) {
            return;
        }
        const deleteItem = this.root.querySelector(`[data-dish-id="${this.deleteDish.id}"]`);
        console.log('deleteItem', deleteItem);
        deleteItem.remove();
        this.deleteDish = null;
    }

    deleteDishFailed () {
        // TODO: показать ошибку сервера пользователю
        // this.deleteDish = null;
        console.log('deleteDishFailed');
    }
}
