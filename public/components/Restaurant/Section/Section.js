import renderSection from './SectionTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { DishComponent } from '../Dish/Dish.js'
import renderDishAdding from '../DishAdding/DishAddingTmpl.hbs'
import { SectionModel } from '../../../modules/section.js';
import { DishEvents } from '../../../events/DishEvents.js';
import { SectionEvents } from '../../../events/SectionEvents.js';
import { noop } from '../../../modules/utils.js';

export class SectionComponent {
    constructor ({
        section = new SectionModel(),
        controller = new RestaurantMainController(),
        goTo = noop
    } = {}) {
        this.section = section;
        this.controller = controller;
        this.goTo = goTo;

        this.dishes = [];
        this.section.dishes.forEach(dish => {
            const dishComponent = new DishComponent({
                dish: dish,
                controller: this.controller
            });
            this.dishes.push(dishComponent);
        });

        eventBus.on(SectionEvents.updateSection + section.id, this.updateSection.bind(this));
        eventBus.on(SectionEvents.addDish + section.id, this.appendDish.bind(this));
        eventBus.on(SectionEvents.deleteDish, this.deleteDish.bind(this));
    }

    render ({ root = document.body }) {
        this.root = root;
        if (this.section) {
            this.sectionItem = document.createElement('div');
            this.sectionItem.innerHTML = renderSection({ section: this.section });
            this.root.append(this.sectionItem);
        }

        this.container = this.root.querySelector(`[data-section-list-id="${this.section.id}"]`);
        
        this.container.innerHTML = '';
        this.addAddDishEventListeners();
        this.dishes.forEach(dish => {
            console.log('render dish ->', dish);
            this.renderDish(dish);
        });
        const dishAddingBtn = document.createElement('li');
        dishAddingBtn.classList.add('card-add', 'card');
        dishAddingBtn.innerHTML = renderDishAdding({});
        this.container.appendChild(dishAddingBtn);

        this.addAddDishEventListeners();
        this.addUpdateSectionEventListener();
        this.addDeleteSectionEventListener();
    }

    renderDish (dish) {
        if (!dish) {
            return;
        }

        const dishItem = document.createElement('li');
        dishItem.classList.add('card');
        // dishItem.dataset.dishId = dish.id;
        this.container.appendChild(dishItem);
        dish.render({ root: dishItem });
    }

    addUpdateSectionEventListener () {
        const editDish = this.sectionItem.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }

        editDish.addEventListener('click', () => {
            this.controller.editSection(this.section);
        });
    }

    updateSection () {
        this.sectionItem.querySelector('.section-container__name').textContent = this.section.name;
    }

    addDeleteSectionEventListener () {
        const deleteDish = this.sectionItem.querySelector('.icon-delete');
        if (!deleteDish) {
            return;
        }

        deleteDish.addEventListener('click', () => {
            console.log('delete');
            this.controller.deleteSection({ section: this.section });
        });
    }

    addAddDishEventListeners () {
        const addDish = this.container.querySelector('.card-add');
        if (!addDish) {
            return;
        }

        addDish.addEventListener('click', e => {
            e.preventDefault();

            this.controller.editDish({ section: this.section.id })
        });
    }

    appendDish ({ dish }) {
        const dishComponent = new DishComponent({
            dish: dish,
            controller: this.controller
        });
        this.dishes.push(dishComponent);
    }

    deleteDish ({ id }) {
        for (let i = 0; i < this.dishes.length; i++) {
            if (this.dishes[i].dish.id === id) {
                console.log('removeDish -> ', this.dishes[i], i);
                this.dishes.splice(i, 1);
            }
        }
    }

}
