import { renderStoreBasketFood } from './StoreBasketFoodTmpl.js';

export class StoreBasketFood {
    constructor ({
        root = document.body,
        food
    } = {}) {
        this.root = root;
        this.food = food;
        this.numID = 'chosen_food--num-id-' + this.food.id;
    }

    render () {
        console.log('StoreBasketFood -> render', this.food);
        this.root.innerHTML += renderStoreBasketFood({
            chosenDish: this.food,
            num: 1
        });
    }

    add () {
        console.log('storeBasketFood -> add');
        const num = document.getElementById(this.numID);

        if (num) {
            if (Number(num.textContent) > 0) {
                num.textContent = String(Number(num.textContent) + 1);
            }
        } else {
            this.render()
        }
    }

    takeAway () {
        console.log('storeBasketFood -> takeAway');
        const num = document.getElementById(this.numID);
        if (num) {
            if (Number(num.textContent) === 1) {
                document.getElementById('chosen_food-id-' + this.food.id).remove();
                return true;
            } else {
                num.textContent = String(Number(num.textContent) - 1);
                return false;
            }
        }
        return false;
    }
}
