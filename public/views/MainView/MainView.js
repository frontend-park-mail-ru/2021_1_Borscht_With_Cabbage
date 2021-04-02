import { MainController } from '../../controllers/MainController/MainController.js';
import eventBus from '../../modules/eventBus.js';
import MainEvents from '../../events/MainEvents.js';
import { Navbar } from '../../components/NavBar/Navbar.js';
import { ParamsComponent } from '../../components/Params/Params.js'
import { FilterComponent } from '../../components/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../../components/PanelRestaurants/PanelRestaurants.js'
import { mainGet, restaurantsGet } from '../../modules/api.js';
import { CategoryComponent } from "../../components/Category/Category.js";
import { CreatorUrl } from "../../controllers/MainController/MainUtils.js";

export class MainView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.mainController = new MainController()
        eventBus.on(MainEvents.mainGetRestaurantsSuccess, this.contentDraw.bind(this))
        eventBus.on(MainEvents.mainGetRestaurantsFailed, this.loadError.bind(this))
    }

    render () {
        this.mainPageDraw()
    }

    mainPageDraw () {
        this.headerDraw();
        this.getContent();
    }

    headerDraw () {
        this.root.innerHTML = '';
        
        // TODO Переместить creatorUrl в controller (и все что не нужно для view тоже)
        // TODO Заменить все callback`и на обращение к медиатору
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

    contentDraw (info) {
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
        this.mainController.getRestaurants(url)
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}
