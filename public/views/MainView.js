import { CategoryComponent } from '../components/MainPage/Category/Category.js'
import { ParamsComponent } from '../components/MainPage/Params/Params.js'
import { FilterComponent } from '../components/MainPage/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../components/MainPage/PanelRestaurants/PanelRestaurants.js'
import { MainController } from '../controllers/MainController.js';
import { MoreRestaurantsComponent } from '../components/MainPage/MoreRestaurants/MoreRestaurants.js';
import eventBus from '../modules/eventBus.js';
import MainEvents from '../events/MainEvents.js';

export class MainView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.mainController = new MainController()
        eventBus.on(MainEvents.mainGetRestaurantsSuccess, this.contentDraw.bind(this))
        eventBus.on(MainEvents.mainGetRestaurantsFailed, this.loadError.bind(this))
        eventBus.on(MainEvents.mainClearContent, this.clearContent.bind(this))
    }

    render () {
        this.headerDraw();
        this.mainController.init();
        this.mainController.getRestaurants();
    }

    headerDraw () {
        this.root.innerHTML = '';

        const category = new CategoryComponent({
            root: this.root,
            controller: this.mainController
        });

        const params = new ParamsComponent({
            root: this.root,
            controller: this.mainController
        });

        // const filter = new FilterComponent({ root: this.root });

        category.render();
        params.render();
        // filter.render();

        // поле для отображения рестаранов
        this.content = document.createElement('div');
        this.content.innerHTML = '';
        this.root.append(this.content);

        const more = new MoreRestaurantsComponent({
            root: this.root,
            controller: this.mainController
        });

        more.render();
    }

    contentDraw (info) {
        const restaurants = new PanelRestaurantsComponent({
            root: this.content,
            restaurants: info,
            controller: this.mainController,
            goTo: this.goTo
        });
        restaurants.render();
    }

    clearContent () {
        this.content.innerHTML = '';
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}
