import './FoodElement.less';
import renderFoodElement from './StoreFoodElementTmpl.hbs';
import eventBus from 'Modules/eventBus.js';
import { ChangeBasketEvents } from 'Events/ChangeBasketEvents.js';
import { NumButtons } from '../../NumButtons/NumButtons.js';
import { StoreController } from 'Controllers/StoreController.js';
import basket from 'Modules/basket.js';

export class StoreFoodElement {
    constructor ({
        root = document.body,
        food = null,
        controller = new StoreController({ root }),
        restaurant = {}
    } = {}) {
        this.root = root;
        this.food = food;
        this.num = 0;
        this.buttonID = `[data-foodAddButtonID="${this.food.id}"]`;
        this.numButtonsSelector = `[data-foodID="${this.food.id}"]`;
        eventBus.on(ChangeBasketEvents.chooseFood, ({ food, isPlus }) => {
            if (food.id === this.food.id) {
                if (isPlus) {
                    this.num += 1;
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
        });
        this.controller = controller;
        this.restaurant = restaurant;
    }

    render () {
        if (this.food) {
            this.root.innerHTML += renderFoodElement({ food: this.food });

            this.numButtons = new NumButtons({
                food: this.food,
                root: this.root.querySelector(this.numButtonsSelector).querySelector('.card__header'),
                event: ChangeBasketEvents.chooseFood,
                restaurant: this.restaurant,
                controller: this.controller
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

            let isNewBasket = false;
            if (basket.restaurantID) {
                if (this.restaurant.id !== basket.restaurantID) {
                    isNewBasket = true;
                }
            }

            this.controller.addDish({
                isNewBasket,
                isPlus: true,
                food: this.food,
                restaurant: this.restaurant
            });
        };

        this.root.querySelector(this.buttonID)
            .addEventListener('click', this.addButtonListener);

        this.numButtons.addEventListeners();
    }
}
