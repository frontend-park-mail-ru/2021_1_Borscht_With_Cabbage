import { CategoryComponent } from '../components/Category/Category.js'
import { ParamsComponent } from '../components/Params/Params.js'
import { FilterComponent } from '../components/Filter/Filter.js'
import { PanelRestaurantsComponent } from '../components/PanelRestaurants/PanelRestaurants.js'
import { MainController } from '../controllers/MainController.js';
import { MoreRestaurantsComponent } from '../components/MoreRestaurants/MoreRestaurants.js';
import eventBus from '../modules/eventBus.js';
import { MainEvents } from '../events/MainEvents.js';
import renderMainPage from '../components/MainPage/MainPageTmpl.hbs'
import '../components/MainPage/MainPage.less'
import address from '../modules/address.js';
import { ConfirmationAddress } from '../components/ConfirmationAddress/ConfirmationAddress.js';

export class MainView {
    constructor ({ 
        goTo, 
        controller = new MainController() 
    } = {}) {
        this.goTo = goTo;
        this.mainController = controller;
        this.category = new CategoryComponent({
            controller: this.mainController
        });
        this.params = new ParamsComponent({
            controller: this.mainController
        });
        this.restaurants = new PanelRestaurantsComponent({
            controller: this.mainController,
            goTo: this.goTo
        });
    }

    render ({ root }) {
        this.root = root;
        this.root.innerHTML = renderMainPage();
        this.container = this.root.querySelector('.main-page__container');
        this.headerDraw();
        const address_ = address.getAddress();
        if (address_.name === '') {
            new ConfirmationAddress({ goTo: this.goTo }).render();
        }
    }

    headerDraw () {
        this.category.render({ root: this.container.querySelector('.main-page__category') });
        this.params.render({ root: this.container.querySelector('.main-page__params') });

        // const filter = new FilterComponent({ root: this.root });
        // filter.render();

        // поле для отображения рестаранов
        this.content = document.querySelector('.main-page__content');
        this.content.innerHTML = '';
        this.container.append(this.content);

        // const more = new MoreRestaurantsComponent({
        //     root: this.root,
        //     controller: this.mainController
        // });

        // more.render();

        this.restaurants.render({ root: this.content });
    }

    renderContent (info) {
        this.restaurants.add({ restaurants: info })
    }

    clearContent () {
        this.content.innerHTML = '';
        this.restaurants.render({ root: this.content });
    }
}
