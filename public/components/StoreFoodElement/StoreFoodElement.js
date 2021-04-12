import renderFoodElement from './StoreFoodElementTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import { ChangeBasketEvents } from '../../events/ChangeBasketEvents.js';
import { NumButtons } from '../NumButtons/NumButtons.js';

export class StoreFoodElement {
    constructor ({
        root = document.body,
        food = null
    } = {}) {
        this.root = root;
        this.food = food;
        this.num = 0;
        this.buttonID = `[data-foodAddButtonID="${this.food.id}"]`;
        this.numButtonsSelector = `[data-foodID="${this.food.id}"]`;
        eventBus.on(ChangeBasketEvents.chooseFood, ({ food, isPlus }) => {
            if (food.id === this.food.id) {
                if (isPlus) {
                    this.num += 1
                    if (this.num === 1) {
                        this.choose();
                    }
                } else {
                    this.num -= 1;
                    if (!this.num) {
                        this.unChoose();
                    }
                }
            }
        })
    }

    render () {
        if (this.food) {
            this.root.innerHTML += renderFoodElement({ food: this.food });

            this.numButtons = new NumButtons({
                food: this.food,
                root: this.root.querySelector(this.numButtonsSelector).querySelector('.card__header'),
                event: ChangeBasketEvents.chooseFood
            });
            this.numButtons.render();
        }
    }

    choose () {
        const button = this.root.querySelector(this.buttonID);
        button.style.display = 'none';
    }

    unChoose () {
        const button = this.root.querySelector(this.buttonID);
        button.style.display = 'block';
    }

    clickElement (num) {
        if (num === 0) {
            this.unChoose();
        } else {
            this.choose();
        }
    }

    addListener () {
        this.addButtonListener = () => {
            eventBus.emit(ChangeBasketEvents.chooseFood, {
                food: this.food,
                isPlus: true
            });

            this.num = 1;
            this.clickElement(this.num);
        };

        this.root.querySelector(this.buttonID)
            .addEventListener('click', this.addButtonListener);

        this.numButtons.addEventListeners();
    }
}
