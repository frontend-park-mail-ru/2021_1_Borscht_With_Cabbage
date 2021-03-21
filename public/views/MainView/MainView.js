import { NavBar } from '../../components/NavBar/NavBar.js';
import { CategoryComponent } from '../../components/Category/Category.js'
import { ParamsComponent } from '../../components/Params/Params.js'
import { FilterComponent } from '../../components/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../../components/PanelRestaurants/PanelRestaurants.js'
import { mainGet, restaurantsGet } from '../../modules/api.js';
import { CreatorUrl } from './MainUtils.js';

export class MainView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        mainGet()
            .then(r => this.mainPageDraw(r.status))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }

    mainPageDraw (status) {
        if (status !== 200) {
            this.goTo('login');
            return;
        }

        this.headerDraw();
        this.getContent();
    }

    headerDraw () {
        this.root.innerHTML = '';
        this.navbar = new NavBar({ root: this.root, goTo: this.goTo });

        this.creatorUrl = new CreatorUrl();

        const category = new CategoryComponent({
            root: this.root,
            callback: (category) => {
                // вызывается когда выбираем какуе-нибудь категорию
                this.creatorUrl.clickCategory({ name: category })
                this.getContent();
            }
        });

        const params = new ParamsComponent({
            root: this.root,
            callback: (params) => {
                this.creatorUrl.clickParams(params)
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

    contentDraw (info, status) {
        if (status !== 200) {
            this.goTo('login');
            return;
        }

        this.content.innerHTML = '';
        const restaurants = new PanelRestaurantsComponent({
            root: this.content,
            restaurants: info,
            callback: (idRestaurant) => {
                this.goTo('/restaurant/' + idRestaurant);
            }
        });
        restaurants.render();
    }

    getContent () {
        const url = this.creatorUrl.get();

        restaurantsGet({ url: url })
            .then(r => this.contentDraw(r.parsedJSON, r.status))
            .catch(r => console.log(`THis crash when post /main from ${r}`));
    }
}
