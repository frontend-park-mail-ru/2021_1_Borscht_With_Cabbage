import { renderDish } from './DishTmpl.js';
import eventBus from '../../../modules/eventBus.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { DishEvents } from '../../../events/DishEvents.js'

export class DishComponent {
    constructor ({
        root = document.body,
        dish = null
    } = {}) {
        this.root = root;
        this.dish = dish;
        eventBus.on(DishEvents.updateDishDataSuccess + dish.id, this.updateDishDataSuccess.bind(this));
        eventBus.on(DishEvents.updateDishImageSuccess + dish.id, this.updateDishImageSuccess.bind(this));
    }

    render () {
        if (this.dish) {
            this.root.innerHTML += renderDish({ dish: this.dish });

            this.addEditDishEventListener();
            this.addDeleteDishEventListener();
        }
    }

    addEditDishEventListener () {
        const editDish = this.root.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }
        
        editDish.addEventListener('click', e => {
            eventBus.emit(DishEvents.editDish, this.dish);
        });
    }

    addDeleteDishEventListener () {
        const deleteDish = this.root.querySelector('.icon-delete');
        if (!deleteDish) {
            return;
        }
        
        deleteDish.addEventListener('click', e => {
            eventBus.emit(DishEvents.deleteDish, this.dish);
        });
    }


    updateDishDataSuccess (dish) {
        if (!dish) {
            return;
        }
        this.root.querySelector('.card__name').textContent = dish.name;
        this.root.querySelector('.card__sum').textContent = dish.price;
        this.root.querySelector('.card__description').textContent = dish.description;
    }

    updateDishImageSuccess ({filename}) {
        console.log(filename);
    }
}
