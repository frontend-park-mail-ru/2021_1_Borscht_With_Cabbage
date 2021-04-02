import { renderStoreView } from '../components/RestaurantPage/StoreTemplate.js';
import { StoreController } from '../controllers/StoreController.js';
import eventBus from '../modules/eventBus.js';
import StoreEvents from '../events/StoreEvents.js';
import { Navbar } from '../components/NavBar/Navbar.js';
import { storeGet } from '../modules/api.js';
import { StoreTitle } from '../components/StoreTitle/StoreTitle.js';
import { StoreFoodList } from '../components/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from '../components/StoreBasket/StoreBasket.js';

export class StoreView {
    constructor (root, goTo) {
        this.goTo = goTo
        this.root = root
        this.storeController = new StoreController()
        eventBus.on(StoreEvents.storeGetDishesSuccess, this.storePageDraw.bind(this))
        eventBus.on(StoreEvents.storeGetDishesFailed, this.loadError.bind(this))
    }

    render (url) {
        this.storeController.getDishes(url)
    }

    storePageDraw (info, status) {
        if (status === 200) {
            this.root.innerHTML = '';

            const main = document.createElement('div');
            main.innerHTML = renderStoreView({});
            this.root.append(main);

            this.storeTitle = new StoreTitle({
                root: document.getElementById('restaurant-info__title'),
                title: info.title
            });
            this.storeTitle.render()

            this.storeBasket = new StoreBasket({
                root: document.getElementById('restaurant-basket')
            });
            this.storeBasket.render(this.goTo)

            this.foodList = new StoreFoodList({
                root: document.getElementById('restaurant-info__food')
            });
            this.foodList.render(info.foods)
        }
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('storeVIew -> loadError', error)
    }
}
