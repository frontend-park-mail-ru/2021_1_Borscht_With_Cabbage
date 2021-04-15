import { noop } from '../modules/utils.js';
import { BasketController } from '../controllers/BasketController.js';
import eventBus from '../modules/eventBus.js';
import { BasketEvents } from '../events/BasketEvents.js';
import renderBasketPage from '../components/Basket/BasketTmpl.hbs';
import renderEmptyBasket from '../components/Basket/EmptyBasketTmpl.hbs';
import { DeliveryBasket } from '../components/DeliveryBasket/DeliveryBasket.js';
import { DeliveryOptions } from '../components/DeliveryOptions/DeliveryOptions.js';
import user from '../modules/user.js';

export class BasketView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.basketController = new BasketController();
        eventBus.on(BasketEvents.basketGetBasketSuccess, this.basketPageDraw.bind(this));
        eventBus.on(BasketEvents.basketGetBasketFailed, this.loadError.bind(this));
        eventBus.on(BasketEvents.basketOrderSuccess, this.orderSuccess.bind(this));
        eventBus.on(BasketEvents.basketOrderFailed, this.loadError.bind(this));
    }

    render () {
        this.basketController.getBasket();
    }

    basketPageDraw (info) {
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

    loadError (error) {
        console.log('BasketView -> ', error);
    }

    orderSuccess () {
        this.goTo('/profile/orders');
    }
}