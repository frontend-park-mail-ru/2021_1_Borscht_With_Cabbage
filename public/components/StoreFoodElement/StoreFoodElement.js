import { renderFoodElement } from './StoreFoodElementTmpl.js';

export class StoreFoodElement {
    constructor ({
        root = document.body,
        food = null
    } = {}) {
        this.root = root;
        this.food = food;
        this.num = 0;
        this.buttonID = 'dish__add-id' + this.food.id;
        this.addButtonsID = 'dish-count-buttons__id-' + this.food.id;
        this.plusButtonID = 'dish-count-buttons__plus_' + this.food.id;
        this.minusButtonID = 'dish-count-buttons__minus_' + this.food.id;
    }

    render () {
        if (this.food) {
            this.root.innerHTML += renderFoodElement({ food: this.food });

            this.unChoose()
        }
    }

    choose () {
        const button = document.getElementById(this.buttonID);
        button.style.display = 'none';
        const plusButton = document.getElementById(this.plusButtonID);
        plusButton.style.display = 'block';
        const minusButton = document.getElementById(this.minusButtonID);
        minusButton.style.display = 'block';
    }

    unChoose () {
        const button = document.getElementById(this.buttonID);
        button.style.display = 'block';
        const plusButton = document.getElementById(this.plusButtonID);
        plusButton.style.display = 'none';
        const minusButton = document.getElementById(this.minusButtonID);
        minusButton.style.display = 'none';
    }

    clickElement (num) {
        if (num === 0) {
            this.unChoose();
        } else {
            this.choose();
        }
    }

    addListener (callback) {
        this.addListener = () => {
            callback(this.food, true);
            this.num = 1;
            this.clickElement(this.num);
        };

        document.getElementById(this.buttonID)
            .addEventListener('click', this.addListener);

        this.plusListener = () => {
            callback(this.food, true);
            this.num += 1;
            this.clickElement(this.num);
        };
        document.getElementById(this.plusButtonID)
            .addEventListener('click', this.plusListener);

        this.minusListener = () => {
            callback(this.food, false);
            this.num -= 1;
            this.clickElement(this.num);
        };
        document.getElementById(this.minusButtonID)
            .addEventListener('click', this.minusListener);
    }
}
