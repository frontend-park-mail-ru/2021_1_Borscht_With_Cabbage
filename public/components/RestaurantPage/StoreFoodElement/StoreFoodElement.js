import { renderFoodElement } from './StoreFoodElementTmpl.js';
import eventBus from '../../../modules/eventBus.js';
import BasketEvents from '../../../events/BasketEvents.js';

export class StoreFoodElement {
    constructor ({
        root = document.body,
        food = null
    } = {}) {
        this.root = root;
        this.food = food;
        this.num = 0;
        this.buttonID = `[data-foodAddButtonID="${this.food.id}"]`
        this.plusButtonID = `[data-foodPlusButtonID="${this.food.id}"]`
        this.minusButtonID = `[data-foodMinusButtonID="${this.food.id}"]`
    }

    render () {
        if (this.food) {
            this.root.innerHTML += renderFoodElement({ food: this.food });

            this.unChoose()
        }
    }

    choose () {
        const button = this.root.querySelector(this.buttonID)
        button.style.display = 'none';
        const plusButton = this.root.querySelector(this.plusButtonID)
        plusButton.style.display = 'block';
        const minusButton = this.root.querySelector(this.minusButtonID)
        minusButton.style.display = 'block';
    }

    unChoose () {
        const button = this.root.querySelector(this.buttonID)
        button.style.display = 'block';
        const plusButton = this.root.querySelector(this.plusButtonID)
        plusButton.style.display = 'none';
        const minusButton = this.root.querySelector(this.minusButtonID)
        minusButton.style.display = 'none';
    }

    clickElement (num) {
        if (num === 0) {
            this.unChoose();
        } else {
            this.choose();
        }
    }

    addListener () {
        this.addListener = () => {
            eventBus.emit(BasketEvents.chooseFood, {
                food: this.food,
                isPlus: true
            })

            this.num = 1;
            this.clickElement(this.num);
        };

        this.root.querySelector(this.buttonID)
            .addEventListener('click', this.addListener);

        this.plusListener = () => {
            eventBus.emit(BasketEvents.chooseFood, {
                food: this.food,
                isPlus: true
            })

            this.num += 1;
            this.clickElement(this.num);
        };
        this.root.querySelector(this.plusButtonID)
            .addEventListener('click', this.plusListener);

        this.minusListener = () => {
            eventBus.emit(BasketEvents.chooseFood, {
                food: this.food,
                isPlus: false
            })

            this.num -= 1;
            this.clickElement(this.num);
        };
        this.root.querySelector(this.minusButtonID)
            .addEventListener('click', this.minusListener);
    }
}
