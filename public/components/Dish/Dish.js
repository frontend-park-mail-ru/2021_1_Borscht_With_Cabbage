import { renderDish } from './DishTmpl.js';
import eventBus from '../../modules/eventBus.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
import { DishEvents } from '../../events/DishEvents.js'

export class DishComponent {
    constructor ({
        root = document.body,
        dish = null
    } = {}) {
        this.root = root;
        this.dish = dish;
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
}
