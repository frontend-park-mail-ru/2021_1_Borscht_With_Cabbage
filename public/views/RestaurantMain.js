import { RestaurantMainController } from '../controllers/RestaurantMainController.js';
import eventBus from '../modules/eventBus.js';
import { RestaurantMenuComponent } from '../components/Restaurant/RestaurantMenu/RestaurantMenu.js'
import user from '../modules/user.js';
import { RestaurantEdits } from '../components/Restaurant/RestaurantEdits/RestaurantEdits.js';
import { renderRestaurantView } from '../components/Restaurant/RestaurantMainTmpl.js';
import { RestaurantRightMenu } from '../components/Restaurant/RestaurantRightMenu/RightMenu.js';

// import MainEvents from '../events/MainEvents.js';

export class RestaurantMainView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.mainController = new RestaurantMainController()
        // eventBus.on(MainEvents.mainGetRestaurantsSuccess, this.contentDraw.bind(this))
        // eventBus.on(MainEvents.mainGetRestaurantsFailed, this.loadError.bind(this))
    }

    render () {
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

        const rightMenu = new RestaurantRightMenu({
            root: this.root.querySelector('#restaurant-right-block'),
            profileController: this.mainController,
            editsView: edits,
            menuView: menu
        });
        rightMenu.render();
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}