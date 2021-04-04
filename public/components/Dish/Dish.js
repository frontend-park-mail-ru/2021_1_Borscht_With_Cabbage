import { renderDish } from './DishTmpl.js';
import eventBus from '../../modules/eventBus.js';
import { RestaurantAddingDish } from '../RestaurantAddDish/RestaurantAddingDish.js';
// import BasketEvents from '../../events/BasketEvents.js';

export class DishComponent {
    constructor ({
        root = document.body,
        dish = null
    } = {}) {
        this.root = root;
        this.dish = dish;
        this.num = 0;
        this.buttonID = `[data-dishAddButtonID="${this.dish.id}"]`
    }

    render () {
        if (this.dish) {
            this.root.innerHTML += renderDish({ dish: this.dish });
        }
    }

    addEditDishEventListener () {
        const editDish = card.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }

        editDish.addEventListener('click', e => {

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
