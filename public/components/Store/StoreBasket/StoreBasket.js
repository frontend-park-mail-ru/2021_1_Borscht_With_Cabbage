import './StoreBasket.less';
import renderStoreBasket from './StoreBasketTmpl.hbs';
import { StoreBasketFood } from './StoreBasketFood/StoreBasketFood.js';
import eventBus from '../../../modules/eventBus.js';
import { ChangeBasketEvents } from '../../../events/ChangeBasketEvents.js';
import { noop } from '../../../modules/utils.js';
import basket from '../../../modules/basket.js';
import { StoreController } from '../../../controllers/StoreController.js';

export class StoreBasket {
    constructor ({
        root = document.body,
        store = null,
        goTo = noop,
        controller = new StoreController({ root, goTo })
    } = {}) {
        this.root = root;
        this.store = store;
        this.basket = store.basket;
        this.elements = [];
        this.controller = controller;
        this.orderButtonSelector = '#store-basket__order';
        this.totalSumSelector = '#store-basket__sum';
        this.itemsSelector = '#store-basket__items';
        this.goTo = goTo;
        eventBus.on(ChangeBasketEvents.chooseFood, this.append.bind(this));
    }

    render () {
        this.root.insertAdjacentHTML('beforeend', renderStoreBasket({
            deliveryCost: this.store.deliveryCost.toString()
        }));
        this.root.querySelector(this.orderButtonSelector)
            .addEventListener('click', () => this.controller.order());
        if (basket.restaurantID && basket.foods) {
            if (this.store.id === basket.restaurantID) {
                for (const food of basket.foods) {
                    for (let i = 0; i < food.num; i++) {
                        eventBus.emit(ChangeBasketEvents.chooseFood, { food, isPlus: true });
                    }
                }
            }
        }
    }

    append ({ food, isPlus }) {
        const element = this.elements.find(el => el.food.id === food.id);
        const totalSum = this.root.querySelector(this.totalSumSelector);
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
