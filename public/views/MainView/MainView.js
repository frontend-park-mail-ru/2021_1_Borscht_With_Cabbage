import { ajaxGet } from '../../modules/http.js';
import { navbar } from '../../components/NavBar/NavBar.js';
import { FilterComponent } from '../../components/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../../components/PanelRestaurants/PanelRestaurants.js'

export class MainView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
        this.render = this.render.bind(this);

        // структура будет помогать создавать запрос серверу
        this.request = {
            offset: 0,
            limit: 20,
            category: [],
            params: {
                time: false,
                receipt: false,
                rating: false,
            },
        }
    }

    render () {
        this.getContent();
    }

    mainPageDraw (info) {
        this.root.innerHTML = '';
        navbar({ auth: true }, this.root);

        const filter = new FilterComponent(this.root, (category) => {
            // вызывается когда выбираем какуе-нибудь категорию

            this.request.category = category; // запоминаем
            this.request.offset = 0;
            this.getContent();
            
        }, (key, value) => {
            this.request.params[key] = value;
            this.request.offset = 0;

            this.getContent()
        });
        filter.render();

        const restaurants = new PanelRestaurantsComponent(this.root, info);
        restaurants.render();
        // main.innerHTML = renderMainView(info);
    }

    getContent() {
        let url = `/restaurants?limit=${this.request.limit}&offset=${this.request.offset}`;

        if (this.request.category.length > 0)
            url += '&category=';

        url += this.request.category.join(',');

        for (let key in this.request.params) {
            url += `&${key}=${this.request.params[key]}`;
        }

        console.log(url);

        this.request.offset += this.request.limit;

        // TODO правильный запрос на сервер

        ajaxGet({ url: '/main' })
            .then(r => this.mainPageDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }
}
