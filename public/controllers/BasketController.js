import basketModel from '../models/BasketModel.js';
import { Validator } from '../modules/validation.js';
import { noop } from '../modules/utils.js';
import { BasketView } from '../views/BasketView.js';
import eventBus from '../modules/eventBus.js';
import { BasketEvents } from '../events/BasketEvents.js';
import user from '../modules/user.js';
import redirect from '../modules/redirect.js';
import address from '../modules/address.js';
import { ConfirmationAddress } from '../components/ConfirmationAddress/ConfirmationAddress.js';
import { YandexMap } from '../modules/yandexMap.js';

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
        basketModel.getBasket(this.idRestaurant);
    }

    order ({
        address = '',
        number = '',
        comments = '',
        yaMap
    } = {}) {
        const numberError = Validator.validatePhone(number);
        if (numberError) {
            YandexMap.isAddressCorrect(address)
                .then(isCorrect => {
                    if (isCorrect) {
                        if (yaMap.checkUserInCircle()) {
                            basketModel.order({ address, number, comments, basketID: this.basketID });
                        } else {
                            this.basketView.renderServerError({ status: 420, parsedJSON: 'Вы должны находиться в зоне доставки ресторана' });
                        }
                    } else {
                        this.basketView.renderServerError({ status: 420, parsedJSON: 'Введите настоящий адрес' });
                    }
                })
                .catch(() => this.basketView.renderServerError({ status: 420, parsedJSON: 'Введите настоящий адрес' }));
        } else {
            this.basketView.renderErrors({
                error: true,
                numberError
            });
        }
    }

    render (url) {
        if (!user.isAuth) {
            this.goTo('login');
            redirect.push(url);
            return;
        }
        this.idRestaurant = url.substr(url.lastIndexOf('/') + 1);

        this.getBasket();
    }

    basketPageDraw (info) {
        this.basketID = info.id;
        if (address.getAddress().name === '') {
            new ConfirmationAddress({ goTo: this.goTo }).render(`/basket/${this.idRestaurant}`);
        } else {
            this.basketView.render(info);
        }
    }

    loadError (error) {
        console.log('BasketView -> ', error);
    }

    orderSuccess () {
        this.goTo('/profile/orders');
    }
}
