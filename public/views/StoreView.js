import { renderStoreView } from '../components/RestaurantPage/StoreTemplate.js';
import { storeGet } from '../modules/api.js';
import { StoreTitle } from '../components/RestaurantPage/StoreTitle/StoreTitle.js';
import { StoreFoodList } from '../components/RestaurantPage/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from '../components/RestaurantPage/StoreBasket/StoreBasket.js';

export class StoreView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render (url) {
        const id = url.substring('/restaurant'.length);
        storeGet({
            url: id
        })
            .then(r => this.storePageDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
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
            this.storeTitle.render();

            this.storeBasket = new StoreBasket({
                root: document.getElementById('restaurant-basket')
            });
            this.storeBasket.render(this.goTo);

            this.foodList = new StoreFoodList({
                root: document.getElementById('restaurant-info__food')
            });
            this.foodList.render(info.foods);
        } else {
            this.goTo('login');
        }
    }
}
