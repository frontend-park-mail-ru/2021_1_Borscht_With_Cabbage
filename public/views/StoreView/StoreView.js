import { renderStoreView } from './storeTemplate.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { storeGet } from '../../modules/api.js';
import { StoreTitle } from '../../components/StoreTitle/StoreTitle.js';
import { StoreFoodList } from '../../components/StoreFoodList/StoreFoodList.js';
import { StoreBasket } from '../../components/StoreBasket/StoreBasket.js';

export class StoreView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render (url) {
        storeGet({
            url: url
        })
            .then(r => this.storePageDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /store from ${r}`));
    }

    storePageDraw (info, status) {
        if (status === 200) {
            this.root.innerHTML = '';
            this.navbar = new NavBar({ root: this.root });
            const main = document.createElement('div');
            main.innerHTML = renderStoreView({});
            this.root.append(main);

            this.storeTitle = new StoreTitle({
                root: document.getElementById('store-title'),
                title: info.title
            });
            this.storeTitle.render();

            this.storeBasket = new StoreBasket({
                root: document.getElementById('store-basket')
            });
            this.storeBasket.render(this.goTo);

            const callback = function (food) {
                this.storeBasket.append(food);
            };
            const foodList = new StoreFoodList({
                root: document.getElementById('food-list')
            });
            foodList.render(info.foods, callback.bind(this));
        } else {
            this.goTo('login');
        }
    }
}
