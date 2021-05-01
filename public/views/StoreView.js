import renderStoreView from 'Components/Store/StoreTmpl.hbs';
import { StoreTitle } from 'Components/Store/StoreTitle/StoreTitle.js';
import { StoreFoodList } from 'Components/Store/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from 'Components/Store/StoreBasket/StoreBasket.js';
import { StoreController } from 'Controllers/StoreController.js';
import eventBus from 'Modules/eventBus.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import { noop } from 'Modules/utils.js';

export class StoreView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.storeController = new StoreController();
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.storePageDraw.bind(this));
        eventBus.on(StoreEvents.storeGetDishesFailed, this.loadError.bind(this));
    }

    render (url) {
        // TODO: понять почему рендорится при отображении главной страницы с ресторанами
        this.storeController.getDishes(url)
    }

    storePageDraw (info) {
        this.root.innerHTML = ''
        const main = document.createElement('div')
        main.innerHTML = renderStoreView({})
        this.root.append(main)

        this.storeTitle = new StoreTitle({
            root: document.getElementById('store-info__title'),
            store: info
        });
        this.storeTitle.render()

        this.foodList = new StoreFoodList({
            root: document.getElementById('store-info__food'),
            info
        });
        this.foodList.render()

        this.storeBasket = new StoreBasket({
            root: document.getElementById('store-basket'),
            store: info,
            goTo: this.goTo
        });
        this.storeBasket.render()
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        this.goTo('login');
        console.log('storeVIew -> loadError', error)
    }
}
