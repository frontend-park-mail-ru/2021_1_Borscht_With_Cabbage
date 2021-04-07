import { renderStoreBasketFood } from './StoreBasketFoodTmpl.js';

export class StoreBasketFood {
    constructor ({
        root = document.body,
        food
    } = {}) {
        this.root = root;
        this.food = food;
        this.elementSelector = `[data-chosenFoodID="${this.food.id}"]`
        this.numSelector = `[data-chosenFoodNumID="${this.food.id}"]`
    }

    render () {
        this.root.innerHTML += renderStoreBasketFood({
            chosenDish: this.food,
            num: 1
        });
    }

    add () {
        const num = this.root.querySelector(this.numSelector)

        if (num) {
            if (Number(num.textContent) > 0) {
                num.textContent = String(Number(num.textContent) + 1);
            }
        } else {
            this.render()
        }
    }

    takeAway () {
        const num = this.root.querySelector(this.numSelector)
        if (num) {
            if (Number(num.textContent) === 1) {
                this.root.querySelector(this.elementSelector).remove();
                return true;
            } else {
                num.textContent = String(Number(num.textContent) - 1);
                return false;
            }
        }
        return false;
    }
}
