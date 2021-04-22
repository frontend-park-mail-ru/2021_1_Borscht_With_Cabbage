import { noop } from '../modules/utils.js';
import { BasketController } from '../controllers/BasketController.js';
import renderBasketPage from '../components/Basket/BasketTmpl.hbs';
import renderEmptyBasket from '../components/Basket/EmptyBasketTmpl.hbs';
import { DeliveryBasket } from '../components/DeliveryBasket/DeliveryBasket.js';
import { DeliveryOptions } from '../components/DeliveryOptions/DeliveryOptions.js';
import user from '../modules/user.js';

export class BasketView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new BasketController({ root, goTo })
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.basketController = controller;
    }

    render (info) {
        if (info.id === 0) {
            this.root.innerHTML = renderEmptyBasket({});
            return;
        }
            this.root.innerHTML = renderBasketPage({});
            const container = this.root.querySelector('.basket-container');
            if (container) {
                this.deliveryBasket = new DeliveryBasket({
                    root: container.querySelector('#basket-delivery'),
                    goTo: this.goTo
                });
                this.deliveryOptions = new DeliveryOptions({
                    root: container.querySelector('#basket-options'),
                    goTo: this.goTo,
                    controller: this.basketController
                });
                this.deliveryOptions.render(user);
                this.deliveryBasket.render(info);
            }
    }
}