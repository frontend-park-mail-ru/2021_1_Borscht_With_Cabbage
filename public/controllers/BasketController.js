import basketModel from '../models/BasketModel.js';
import { Validator } from '../modules/validation.js';
import { noop } from '../modules/utils.js';
import { BasketView } from '../views/BasketView.js';
import eventBus from '../modules/eventBus.js';
import { BasketEvents } from '../events/BasketEvents.js';
import user from '../modules/user.js';
import redirect from '../modules/redirect.js';

export class BasketController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.basketView = new BasketView({ root, goTo, controller: this });
        eventBus.on(BasketEvents.basketGetBasketSuccess, this.basketPageDraw.bind(this));
        eventBus.on(BasketEvents.basketGetBasketFailed, this.loadError.bind(this));
        eventBus.on(BasketEvents.basketOrderSuccess, this.orderSuccess.bind(this));
        eventBus.on(BasketEvents.basketOrderFailed, this.loadError.bind(this));
    }

    getBasket () {
        basketModel.getBasket();
    }

    order ({
        address = '',
        number = '',
        comments = ''
    } = {}) {
        const addressError = Validator.validateDescription(address);
        const numberError = Validator.validateNumber(number);

        if (addressError && numberError) {
            basketModel.order({ address, number, comments });
            return {
                error: false
            };
        }
        return {
            error: true,
            addressError,
            numberError
        };
    }

    render () {
        if (!user.isAuth) {
            this.goTo('login');
            redirect.push('basket');
            return;
        }

        this.getBasket();
    }

    basketPageDraw (info) {
        this.basketView.render(info);
    }

    loadError (error) {
        console.log('BasketView -> ', error);
    }

    orderSuccess () {
        this.goTo('/profile/orders');
    }
}
