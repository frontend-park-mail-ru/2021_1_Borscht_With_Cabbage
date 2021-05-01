import { noop } from 'Modules/utils.js';
import { BasketController } from 'Controllers/BasketController.js';
import eventBus from 'Modules/eventBus.js';
import { BasketEvents } from 'Events/BasketEvents.js';
import renderBasketPage from 'Components/Basket/BasketTmpl.hbs';
import renderEmptyBasket from 'Components/Basket/EmptyBasketTmpl.hbs';
import { DeliveryBasket } from 'Components/DeliveryBasket/DeliveryBasket.js';
import { DeliveryOptions } from 'Components/DeliveryOptions/DeliveryOptions.js';
import user from 'Modules/user.js';

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
        console.log(info)
        if (info.id === 0) {
            this.root.innerHTML = renderEmptyBasket({});
            return
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
        this.goTo('profile')
    }
}