import { renderStoreView } from '../components/Store/StorePage/StoreTemplate.js';
import { StoreTitle } from '../components/Store/StoreTitle/StoreTitle.js';
import { StoreFoodList } from '../components/Store/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from '../components/Store/StoreBasket/StoreBasket.js';
import { StoreController } from '../controllers/StoreController.js';
import eventBus from '../modules/eventBus.js';
import { StoreEvents } from '../events/StoreEvents.js';
import { noop } from '../modules/utils.js';

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
        console.log('render StoreView'); // TODO: понять почему рендорится при отображении главной страницы с ресторанами
        this.storeController.getDishes(url)
    }

    storePageDraw (info) {
        this.root.innerHTML = ''
        const main = document.createElement('div')
        main.innerHTML = renderStoreView({})
        this.root.append(main)

        this.storeTitle = new StoreTitle({
            root: document.getElementById('restaurant-info__title'),
            store: info
        });
        this.storeTitle.render()

        this.storeBasket = new StoreBasket({
            root: document.getElementById('restaurant-basket'),
            store: info
        });
        this.storeBasket.render(this.goTo)

        this.foodList = new StoreFoodList({
            root: document.getElementById('restaurant-info__food')
        });
        this.foodList.render(info.foods)
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('storeVIew -> loadError', error)
    }
}
