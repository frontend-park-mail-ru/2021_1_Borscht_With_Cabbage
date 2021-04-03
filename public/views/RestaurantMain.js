import { RestaurantMainController } from '../controllers/RestaurantMainController.js';
import eventBus from '../modules/eventBus.js';
import { RestaurantMenuComponent } from '../components/RestaurantMenu/RestaurantMenu.js'
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
        this.root.innerHTML = '';

        const menu = new RestaurantMenuComponent({
            root: this.root,
            goTo: this.goTo,
            controller: this.mainController
        });
        menu.render()
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }
}