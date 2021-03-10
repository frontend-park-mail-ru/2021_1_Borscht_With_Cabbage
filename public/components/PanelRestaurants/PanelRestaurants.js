import { renderPanelRestaurants } from './PanelRestaurantsTmpl.js';

export class PanelRestaurantsComponent {
    constructor (root, restaurants, callback) {
        this.restaurants = restaurants;
        this.root = root;
        this.callback = callback;
    }

    render () {
        const restaurantsElem = document.createElement('div');
        restaurantsElem.innerHTML = renderPanelRestaurants({
            store: this.restaurants
        });
        this.root.append(restaurantsElem);

        this.addRestaurantListeners(this.callback);
    }

    addRestaurantListeners (callback) {
        const restaurantPanel = this.root.querySelector('.content');
        if (!restaurantPanel) {
            return;
        }
        console.log('add listener');

        restaurantPanel.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();
            // проверяе что нажали именно на кнопку
            const idRestaurant = target.closest('.content__slide').dataset.restaurant;
            console.log('event', target);
            if (idRestaurant) {
                // TODO меняем элемент визуально как нибудь

                callback(idRestaurant);
            }
        })
    }
}
