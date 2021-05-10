import '../components/Store/Store.less';

import renderStoreView from 'Components/Store/StoreTmpl.hbs';
import { StoreTitle } from 'Components/Store/StoreTitle/StoreTitle.js';
import { StoreFoodList } from 'Components/Store/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from 'Components/Store/StoreBasket/StoreBasket.js';
import { StoreController } from 'Controllers/StoreController.js';
import eventBus from 'Modules/eventBus.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { noop } from 'Modules/utils.js';
import { StoreSectionList } from '../components/Store/StoreSectionList/StoreSectionList.js';
import {StoreRecommendations} from "Components/Store/StoreRecommendations/StoreRecommendations";

export class StoreView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new StoreController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.storeController = controller;
    }

    render (info) {
        this.root.innerHTML = '';

        const main = document.createElement('div');
        main.innerHTML = renderStoreView({});
        this.root.append(main);
        this.storeTitle = new StoreTitle({
            root: document.getElementById('store-info__title'),
            store: info,
            goTo: this.goTo,
            controller: this.storeController
        });
        this.storeTitle.render();

        this.foodList = new StoreSectionList({
            root: document.getElementById('store-info__food'),
            info,
            controller: this.storeController
        });
        this.foodList.render();

        this.recommendations = new StoreRecommendations({
            root: document.getElementById('store-recommendations'),
            store: info,
            controller: this.storeController
            }
        )
        this.recommendations.render();

        this.storeBasket = new StoreBasket({
            root: document.getElementById('store-basket'),
            store: info,
            goTo: this.goTo,
            controller: this.storeController
        });
        this.storeBasket.render();

        // TODO: закрепление корзины
        // this.basketPanel = document.getElementById('store-basket');
        // this.startPosition = this.basketPanel.offsetTop;
        // const func = this.stickyBasket.bind(this);
        // window.onscroll = function() {func()};
    }

    renderServerError (error) {
        console.log('storeVIew -> loadError', error);
    }

    stickyBasket () {
        if (window.pageYOffset >= this.startPosition) {
            this.basketPanel.classList.add('sticky-basket');
        } else {
            this.basketPanel.classList.remove('sticky-basket');
        }
    }
}
