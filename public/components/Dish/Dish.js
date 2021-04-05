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
            this.dishItem = document.createElement('li');
            this.dishItem.classList.add('card');
            this.dishItem.innerHTML += renderDish({ dish: this.dish });
            this.root.appendChild(this.dishItem);

            this.addEditDishEventListener();
            this.addDeleteDishEventListener();
        }
    }

    addEditDishEventListener () {
        const editDish = this.dishItem.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }
        
        editDish.addEventListener('click', e => {
            eventBus.emit(DishEvents.editDish, this.dish);
        });
    }

    addDeleteDishEventListener () {
        const deleteDish = this.dishItem.querySelector('.icon-delete');
        if (!deleteDish) {
            return;
        }
        
        deleteDish.addEventListener('click', e => {
            eventBus.emit(DishEvents.deleteDish, this.dish);
        });
    }

    // choose () {
    //     const button = this.root.querySelector(this.buttonID)
    //     button.style.display = 'none';
    // }

    // unChoose () {
    //     const button = this.root.querySelector(this.buttonID)
    //     button.style.display = 'block';
    // }

    // clickElement (num) {
    //     if (num === 0) {
    //         this.unChoose();
    //     } else {
    //         this.choose();
    //     }
    // }

    // addListener () {
    //     this.addButtonListener = () => {
    //         eventBus.emit(BasketEvents.chooseFood, {
    //             food: this.food,
    //             isPlus: true
    //         })

    //         this.num = 1;
    //         this.clickElement(this.num);
    //     };

    //     this.root.querySelector(this.buttonID)
    //         .addEventListener('click', this.addButtonListener);

    //     this.numButtons.addEventListeners()
    // }
}
