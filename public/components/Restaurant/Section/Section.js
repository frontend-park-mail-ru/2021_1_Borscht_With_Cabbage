import renderSection from './SectionTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { DishComponent } from '../Dish/Dish.js'
import renderDishAdding from '../DishAdding/DishAddingTmpl.hbs'
import { DishEvents } from '../../../events/DishEvents.js';
import { SectionEvents } from '../../../events/SectionEvents.js';
import { ConfirmationEvents } from '../../../events/ConfirmationEvents.js';
import { ConfirmationComponent } from '../../Confirmation/Confirmation.js';
import { noop } from '../../../modules/utils.js';

export class SectionComponent {
    constructor ({
        root = document.body,
        section = null,
        controller = new RestaurantMainController(),
        goTo = noop
    } = {}) {
        this.root = root;
        this.section = section;
        this.controller = controller;
        this.goTo = goTo;

        if (!this.section.dishes) {
            this.section.dishes = [];
        }
        eventBus.on(DishEvents.addingDishSuccess + section.id, this.addingDishSuccess.bind(this));
        eventBus.on(DishEvents.closeAddingDishComponent + section.id, this.closeAddingDishComponent.bind(this));
        eventBus.on(DishEvents.editDish + section.id, this.editDish.bind(this));
        eventBus.on(DishEvents.deleteDishSuccess + section.id, this.deleteDishSuccess.bind(this));
        eventBus.on(DishEvents.deleteDishFailed + section.id, this.deleteDishFailed.bind(this));
        eventBus.on(SectionEvents.updateSectionSuccess + section.id, this.updateSectionSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationSuccess + 's' + section.id, this.confirmationSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationFailed + 's' + section.id, this.confirmationFailed.bind(this));
    }

    render () {
        if (this.section) {
            this.sectionItem = document.createElement('div');
            this.sectionItem.innerHTML += renderSection({ section: this.section });
            this.root.append(this.sectionItem);
        }

        this.container = this.root.querySelector(`[data-section-list-id="${this.section.id}"]`);
        this.addUpdateSectionEventListener();
        this.addDeleteSectionEventListener();

        this.appendDishes(this.section.dishes);
    }

    appendDish (dish) {
        console.log('dish:', dish);
        if (!dish) {
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
                section: this.section.id
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
            section: this.section.id
        });
        addingDish.render();
    }

    deleteDishSuccess ({ id }) {
        console.log('deleteDishSuccess', id);
        const deleteItem = this.root.querySelector(`[data-dish-id="${id}"]`);
        console.log('deleteItem', deleteItem);
        deleteItem.remove();
    }

    deleteDishFailed () {
        // TODO: показать ошибку сервера пользователю
        console.log('deleteDishFailed');
    }

    addUpdateSectionEventListener () {
        const editDish = this.sectionItem.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }

        editDish.addEventListener('click', () => {
            const section = {
                id: this.section.id,
                name: this.section.name
            }
            eventBus.emit(SectionEvents.updateSection, section);
        });
    }

    addDeleteSectionEventListener () {
        const deleteDish = this.sectionItem.querySelector('.icon-delete');
        if (!deleteDish) {
            return;
        }

        deleteDish.addEventListener('click', () => {
            const confirmation = new ConfirmationComponent({ root: this.root, id: 's' + this.section.id });
            confirmation.render();
        });
    }

    confirmationSuccess () {
        this.controller.deleteSection(this.section.id);
    }

    confirmationFailed () {
        console.log('confirmationFailed');
    }

    updateSectionSuccess (section) {
        if (!section) {
            return;
        }
        this.sectionItem.querySelector('.section-container__name').textContent = section.name;
    }
}
