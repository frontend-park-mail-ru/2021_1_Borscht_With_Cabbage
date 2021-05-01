import { RestaurantMainController } from 'Controllers/RestaurantMainController.js';
import { RestaurantMenuComponent } from 'Components/Restaurant/RestaurantMenu/RestaurantMenu.js'
import { RestaurantEdits } from 'Components/Restaurant/RestaurantEdits/RestaurantEdits.js';
import renderRestaurantView from 'Components/Restaurant/RestaurantMainTmpl.hbs';
import { RestaurantRightMenu } from 'Components/Restaurant/RestaurantRightMenu/RightMenu.js';
import user from 'Modules/user.js';
import { RestaurantOrdersComponent } from "Components/Restaurant/RestaurantOrders/RestaurantOrders";

export class RestaurantMainView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.mainController = new RestaurantMainController()
        // eventBus.on(MainEvents.mainGetRestaurantsSuccess, this.contentDraw.bind(this))
        // eventBus.on(MainEvents.mainGetRestaurantsFailed, this.loadError.bind(this))
    }

    render () {
        if (user.role === 'user') {
            this.goTo('profile');
            return;
        } else if (user.role === '') {
            this.goTo('main');
            return;
        }
        this.root.innerHTML = renderRestaurantView({});

        const menu = new RestaurantMenuComponent({
            root: this.root.querySelector('#restaurant-left-block'),
            goTo: this.goTo,
            controller: this.mainController
        });
        menu.render();

        // добавляем поля профиля и его изменения
        const edits = new RestaurantEdits({
            root: this.root.querySelector('#restaurant-left-block'),
            goTo: this.goTo,
            controller: this.mainController
        });

        const orders = new RestaurantOrdersComponent({
            root: this.root.querySelector('#restaurant-left-block'),
            goTo: this.goTo,
            controller: this.mainController
        });

        const rightMenu = new RestaurantRightMenu({
            root: this.root.querySelector('#restaurant-right-block'),
            profileController: this.mainController,
            editsView: edits,
            menuView: menu,
            ordersView: orders
    });
        rightMenu.render();
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}