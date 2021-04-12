import { MainModel } from '../models/MainModel.js';
import eventBus from '../modules/eventBus.js';
import { MainEvents } from '../events/MainEvents.js';

export class MainController {
    constructor () {
        this.mainModel = new MainModel()
        this.init();
    }

    init () {
        // структура будет помогать создавать запрос серверу
        this.request = {
            offset: 0,
            limit: 5,
            category: [],
            params: {
                time: 'not',
                receipt: 'not',
                rating: 'not'
            }
        }
    }

    getRestaurants () {
        console.log('getRestaurants');
        const url = this.#getUrl();
        this.request.offset += this.request.limit;
        this.mainModel.getRestaurants(url);
    }

    clickCategory ({ name }) {
        eventBus.emit(MainEvents.mainClearContent);

        this.#changeCategory({ name: name });
        this.getRestaurants();
    }

    clickParams (params) {
        eventBus.emit(MainEvents.mainClearContent);

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

        console.log(url);

        return url;
    }
}
