import { renderStoreBasket } from './StoreBasketTmpl.js';
import eventBus from '../../modules/eventBus.js';
import BasketEvents from '../../events/BasketEvents.js';
import { StoreBasketFood } from './StoreBasketFood/StoreBasketFood.js';

export class StoreBasket {
    constructor ({
        root = document.body
    } = {}) {
        this.root = root;
        this.elements = [];
        this.orderButtonSelector = '#restaurant-basket__order'
        this.totalSumSelector = '#restaurant-basket__sum'
        this.itemsSelector = '#restaurant-basket__items'
        eventBus.on(BasketEvents.chooseFood, this.append.bind(this))
    }

    render (goTo) {
        this.root.innerHTML = renderStoreBasket({});
        this.root.querySelector(this.orderButtonSelector)
            .addEventListener('click', () => goTo('basket'));
    }

    append ({ food, isPlus }) {
        const element = this.elements.find(el => el.food.id === food.id)
        const totalSum = this.root.querySelector(this.totalSumSelector)
        if (isPlus) {
            if (element) {
                this.elements.forEach(element => {
                    if (element.food.id === food.id) {
                        element.add();
                    }
                });
            } else { // if new element
                const foodElement = new StoreBasketFood({
                    root: this.root.querySelector(this.itemsSelector),
                    food: food
                });
                foodElement.render();
                this.elements.push(foodElement);
            }
            totalSum.textContent = String(Number(totalSum.textContent) + Number(food.price));
        } else {
            if (element) {
                let index = null;
                this.elements.forEach((element, i) => {
                    if (element.food.id === food.id) {
                        if (element.takeAway()) {
                            index = i;
                        }
                    }
                });
                if (index !== null) {
                    this.elements.splice(index, 1);
                }
                totalSum.textContent = String(Number(totalSum.textContent) - Number(food.price));
            } else { // if new element
                console.log('I try to takeAway element, that not exist (StoreBasket->append)\nKinda error?');
            }
        }
    }
}
