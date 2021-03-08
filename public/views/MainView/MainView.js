import { ajaxGet } from '../../modules/http.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { CategoryComponent } from '../../components/Category/Category.js'
import { ParamsComponent } from '../../components/Params/Params.js'
import { FilterComponent } from '../../components/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../../components/PanelRestaurants/PanelRestaurants.js'
import { mainGet } from '../../modules/api.js';

export class MainView {
    constructor (root, route) {
        this.route = route;
        this.root = root;

        // структура будет помогать создавать запрос серверу
        this.request = {
            offset: 0,
            limit: 20,
            category: [],
            params: {
                // содержимое временное, потом будут храниться содержимое параметров поиска
                time: false,
                receipt: false,
                rating: false
            }
        }
    }

    render () {
        this.getContent();
    }

    mainPageDraw () {
        this.root.innerHTML = '';
        this.navbar = new NavBar(this.root);

        const category = new CategoryComponent({
            root: this.root,
            callback: (category) => {
                // вызывается когда выбираем какуе-нибудь категорию
                this.request.category = category; // запоминаем
                this.request.offset = 0;
                this.getContent();
            }
        });

        const params = new ParamsComponent({
            root: this.root,
            callback: (key, value) => {
                this.request.params[key] = value;
                this.request.offset = 0;

                this.getContent()
            }
        });

        const filter = new FilterComponent({ root: this.root });

        category.render();
        params.render();
        filter.render();

        // поле для отображения рестаранов
        this.content = document.createElement('div');
        this.content.innerHTML = '';
        this.root.append(this.content);
    }

    restaurantsDraw (info, status) {
        if (status === 200) {
            this.mainPageDraw();
            this.content.innerHTML = '';
            const restaurants = new PanelRestaurantsComponent(this.content, info);
            restaurants.render();
        } else {
            this.route('login');
        }
    }

    getContent () {
        let url = `/restaurants?limit=${this.request.limit}&offset=${this.request.offset}`;

        if (this.request.category.length > 0) url += '&category=';

        url += this.request.category.join(',');

        for (const key in this.request.params) {
            url += `&${key}=${this.request.params[key]}`;
        }

        console.log(url);

        this.request.offset += this.request.limit;

        mainGet()
            .then(r => this.restaurantsDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /main from ${r}`));

        // mainGet()
        //     .then(r => this.mainPageDraw(r.parsedJSON, r.status))
        //     .catch(r => console.log(`THis crash when post /main from ${r}`));
    }
}
