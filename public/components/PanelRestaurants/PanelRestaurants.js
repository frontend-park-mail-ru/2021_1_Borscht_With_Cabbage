import { renderPanelRestaurants } from './PanelRestaurantsTmpl.js';

export class PanelRestaurantsComponent {
    constructor (root, restaurants) {
        this.restaurants = restaurants;
        this.root = root;
    }

    render () {
        const restaurantsElem = document.createElement('div');
        restaurantsElem.innerHTML = renderPanelRestaurants({
            store: this.restaurants
        });
        this.root.append(restaurantsElem);
    }
}
