import { ajaxGet } from '../../modules/http.js';
import { navbar } from '../../components/NavBar/NavBar.js';
import { CategoryComponent } from '../../components/Category/Category.js'
import { ParamsComponent } from '../../components/Params/Params.js'
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
                // содержимое временное, потом будут храниться содержимое параметров поиска
                time: false,
                receipt: false,
                rating: false,
            },
        }
    }

    render () {
        this.mainPageDraw();
        this.getContent();
    }

    mainPageDraw () {
        this.root.innerHTML = '';
        navbar({ auth: true }, this.root);

        const category = new CategoryComponent(this.root, (category) => {
            // вызывается когда выбираем какуе-нибудь категорию

            this.request.category = category; // запоминаем
            this.request.offset = 0;
            this.getContent();
        });

        const params = new ParamsComponent(this.root, (key, value) => {
            this.request.params[key] = value;
            this.request.offset = 0;

            this.getContent()
        });

        const filter = new FilterComponent(this.root);

        category.render();
        params.render();
        filter.render();

        // поле для отображения рестаранов
        this.content = document.createElement('div');
        this.content.innerHTML = '';
        this.root.append(this.content);
    }

    restaurantsDraw (info) {
        this.content.innerHTML = '';
        const restaurants = new PanelRestaurantsComponent(this.content, info);
        restaurants.render();
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

        ajaxGet({ url: url })
            .then(r => this.restaurantsDraw(r.parsedJSON))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }
}
