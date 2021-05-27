import { noop } from '../modules/utils.js';
import { ChoseView } from 'Views/ChoseView.js';
import user from 'Modules/user.js';
import redirect from 'Modules/redirect.js';
import choseModel from 'Models/ChoseModel.js';
import eventBus from '../modules/eventBus.js';
import { BasketEvents } from '../events/BasketEvents.js';
import address from '../modules/address.js';

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
        if (user.role === 'admin') {
            this.goTo('restaurantMain');
            return;
        } else if (!user.isAuth) {
            redirect.push(url);
            this.goTo('login');
            return;
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
        const addr = address.getAddress();
        const params = `?longitude=${addr.longitude}&latitude=${addr.latitude}`;
        choseModel.getBaskets(params, successEvent, failEvent);
    }

    draw (info) {
        info.baskets.forEach(basket => {
            basket.foods.forEach(food => {
                food.totalPrice = food.num * food.price;
            });
            basket.totalFoods = basket.foods.reduce((prev, cur) => prev + cur.num, 0);
            console.log(basket)
            basket.totalWeight = basket.totalFoods * 100;
            basket.totalCalo = basket.totalWeight * 1.5;
        });
        this.view.render(info.baskets, this.activePage);
    }

    deleteBasket (id) {
        choseModel.deleteBasket(id, BasketEvents.basketDeleteSuccess, BasketEvents.basketDeleteFailed);
    }

    orderBasket (id) {
        this.goTo(`/basket/${id}`);
    }

    goStore (id) {
        this.goTo(`/store/${id}`);
    }
}
