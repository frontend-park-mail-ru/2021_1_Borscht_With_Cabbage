import storeModel from '../models/StoreModel.js';
import { noop } from '../modules/utils.js';
import eventBus from '../modules/eventBus.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { StoreView } from '../views/StoreView.js';
import address from '../modules/address.js';
import { ConfirmationAddress } from '../components/ConfirmationAddress/ConfirmationAddress.js';

export class StoreController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.storeView = new StoreView({ root, goTo, controller: this })
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.storePageDraw.bind(this));
        eventBus.on(StoreEvents.storeGetDishesFailed, this.loadError.bind(this));
    }

    getDishes (url) {
        const address_ = address.getAddress();
        const latitude = address_.latitude | '';
        const longitude = address_.longitude | '';
        storeModel.getDishes(url.substring('/store'.length) + '?latitude=' + latitude + '&longitude=' + longitude);
    }

    addDish ({
        isNewBasket = true,
        isPlus = true,
        food = {},
        restaurant = {}
    } = {}) {
        storeModel.addDish({
            isNewBasket,
            isPlus,
            food,
            restaurant
        });
    }

    getReviews(storeID) {
        storeModel.getReviews(storeID)
    }

    render (url) {
        this.getDishes(url);
    }

    storePageDraw (info) {
        this.storeView.render(info);
        if (address.getAddress().name === '') {
            new ConfirmationAddress({ goTo: this.goTo }).render();
        }
    }

    loadError (error) {
        this.storeView.renderServerError(error);
    }

    order () {
        if (address.getAddress().name === '') {
            new ConfirmationAddress({ goTo: this.goTo }).render('basket');
        } else {
            this.goTo('basket');
        }
    }
}
