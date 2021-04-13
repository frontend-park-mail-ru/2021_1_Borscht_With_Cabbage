import renderNumButtons from './NumButtonsTmpl.hbs';
import eventBus from '../../modules/eventBus.js';
import basket from '../../modules/basket.js';
import { StoreController } from '../../controllers/StoreController.js';

export class NumButtons {
    constructor ({
        food = null,
        root = document.body,
        event = '',
        num = 0,
        restaurantID = null,
        controller = new StoreController()
    } = {}) {
        this.food = food;
        this.restaurantID = restaurantID;
        this.controller = controller;
        this.plusButtonID = `[data-foodPlusButtonID="${this.food.id}"]`;
        this.minusButtonID = `[data-foodMinusButtonID="${this.food.id}"]`;
        this.numButtonID = `[data-foodNumButtonID="${this.food.id}"]`;
        this.num = num;
        this.root = root;
        eventBus.on(event, ({ food, isPlus }) => {
            if (food.id === this.food.id) {
                if (isPlus) {
                    this.num += 1;
                    if (this.num >= 1) {
                        this.display();
                    }
                } else {
                    this.num -= 1;
                    if (!this.num) {
                        this.hide();
                    }
                }
                document.querySelector(this.numButtonID).textContent = String(this.num);
            }
        });
        this.event = event;
    }

    render (isDisplay = false) {
        this.root.insertAdjacentHTML('beforeend', renderNumButtons({
            num: this.num,
            id: this.food.id
        }));

        if (!isDisplay) {
            this.hide();
        }
    }

    addEventListeners () {
        let isNewBasket = true;
        console.log('->', this.restaurantID, basket.restaurantID, this)
        if (this.restaurantID === basket.restaurantID) {
            isNewBasket = false;
        }

        this.plusListener = () => {
            eventBus.emit(this.event, {
                food: this.food,
                isPlus: true
            });

            this.controller.addDish({
                dishID: this.food.id,
                isNewBasket: isNewBasket,
                isPlus: true,
                restaurantID: this.restaurantID
            });
        };
        document.querySelector(this.plusButtonID)
            .addEventListener('click', this.plusListener);

        this.minusListener = () => {
            eventBus.emit(this.event, {
                food: this.food,
                isPlus: false
            });

            this.controller.addDish({
                dishID: this.food.id,
                isNewBasket: isNewBasket,
                isPlus: false,
                restaurantID: this.restaurantID
            });
        };
        document.querySelector(this.minusButtonID)
            .addEventListener('click', this.minusListener);
    }

    display () {
        document.querySelector(this.plusButtonID).style.display = 'block';
        document.querySelector(this.minusButtonID).style.display = 'block';
        document.querySelector(this.numButtonID).style.display = 'block';
    }

    hide () {
        document.querySelector(this.plusButtonID).style.display = 'none';
        document.querySelector(this.minusButtonID).style.display = 'none';
        document.querySelector(this.numButtonID).style.display = 'none';
    }
}
