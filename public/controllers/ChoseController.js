import { noop } from 'Modules/utils.js';
import { ChoseView } from 'Views/ChoseView.js';
import user from 'Modules/user.js';
import redirect from 'Modules/redirect.js';
import choseModel from 'Models/ChoseModel.js';
import eventBus from '../modules/eventBus.js';
import { BasketEvents } from '../events/BasketEvents.js';

export class ChoseController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.view = new ChoseView({ root, goTo, controller: this });
        eventBus.on(BasketEvents.basketChoseComparisonSuccess, this.draw.bind(this));
        eventBus.on(BasketEvents.basketChoseAllSuccess, this.draw.bind(this));
    }

    render (url) {
        if (user.isAuth) {
            if (user.role === 'admin') {
                redirect.push(url); // TODO overthink and check
                this.goTo('login');
            }
        } else {
            // TODO брать данные из basket и/или localStorage
        }

        if (/comparison/.test(url)) {
            this.activePage = 'comparison';
            this.getBaskets(BasketEvents.basketChoseComparisonSuccess, BasketEvents.basketChoseComparisonFailed);
        } else if (/all/.test(url)) {
            this.activePage = 'all';
            this.getBaskets(BasketEvents.basketChoseAllSuccess, BasketEvents.basketChoseAllFailed);
        } else {
            this.goTo('/chose/all');
        }
    }

    getBaskets (successEvent, failEvent) {
        choseModel.getBaskets(successEvent, failEvent);
    }

    draw (baskets) {
        this.view.render(baskets, this.activePage);
    }

    deleteBasket (id) {
        choseModel.deleteBasket(id);
    }

    orderBasket (id) {
        this.goTo(`/basket/${id}`);
    }

    goStore (id) {
        this.goTo(`/store/${id}`);
    }
}
