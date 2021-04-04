import { noop } from '../../modules/utils.js';
import {
    renderDeliveryBasketBody,
    renderDeliveryBasketFooter,
    renderDeliveryBasketHeader
} from './DeliveryBasketTmpl.js';
import { renderStoreBasketFood } from '../StoreBasket/StoreBasketFood/StoreBasketFoodTmpl.js';

export class DeliveryBasket {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
    }

    render (info) {
        this.root.insertAdjacentHTML('beforeend', renderDeliveryBasketHeader({
            store: info
        }));
        this.root.insertAdjacentHTML('beforeend', renderDeliveryBasketBody({}));
        this.root.insertAdjacentHTML('beforeend', renderDeliveryBasketFooter({
            store: info
        }));

        const body = this.root.querySelector('.delivery-basket__body');
        this.foodList = info.foods;
        this.foodList.forEach(element => {
            body.insertAdjacentHTML('beforeend', renderStoreBasketFood({
                chosenDish: element,
                num: element.num
            }));
        });
    }
}