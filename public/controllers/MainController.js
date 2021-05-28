import mainModel from '../models/MainModel.js';
import eventBus from '../modules/eventBus.js';
import { MainEvents } from '../events/MainEvents.js';
import { noop } from '../modules/utils.js';
import { MainView } from '../views/MainView.js';
import user from '../modules/user.js';
import address from '../modules/address.js';

export class MainController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.mainView = new MainView({ goTo: goTo, controller: this });

        this.init();
        eventBus.on(MainEvents.mainGetRestaurantsSuccess, this.renderContent.bind(this))
        eventBus.on(MainEvents.mainGetRestaurantsFailed, this.loadError.bind(this))
    }

    init () {
        // структура будет помогать создавать запрос серверу
        this.request = {
            offset: 0,
            limit: 20,
            category: [],
            params: {
                time: 0,
                receipt: 0,
                rating: 0
            }
        }
    }

    render (url) {
        this.url = url;
        if (user.role === 'admin') {
            this.goTo('restaurantMain');
            return;
        } 
        this.mainView.render({ root: this.root });
        this.request.offset = 0;
        this.getRestaurants();
    }

    getRestaurants () {
        const url = this.#getUrl();
        this.request.offset += this.request.limit;
        mainModel.getRestaurants(url);
    }

    renderContent (data) {
        this.mainView.renderContent(data);
    }

    clickCategory ({ name }) {
        this.mainView.clearContent();

        this.#changeCategory({ name: name });
        this.getRestaurants();
    }

    clickParams (params) {
        this.mainView.clearContent();

        this.#changeParams(params);
        this.getRestaurants();
    }

    #changeParams ({ name: name, value }) {
        if (!name) {
            return;
        }
        // TODO выбор из предложенных параметров
        this.request.params[name] = value;
        this.request.offset = 0;
    }

    #changeCategory ({ name }) {
        const index = this.request.category.indexOf(name);

        if (index === -1) {
            this.request.category.push(name);
        } else {
            this.request.category.splice(index, 1);
        }

        this.request.offset = 0;
    }

    #getUrl () {
        let url = `/restaurants?limit=${this.request.limit}&offset=${this.request.offset}`;

        if (this.request.category.length > 0) url += '&category=';

        url += this.request.category.join(',');

        for (const key in this.request.params) {
            url += `&${key}=${this.request.params[key]}`;
        }

        const address_ = address.getAddress();
        url += '&longitude=' + address_.longitude;
        url += '&latitude=' + address_.latitude;

        return url;
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}
