import { renderPanelRestaurants } from './PanelRestaurantsTmpl.js';
import { renderInfoRestaurant } from '../InfoRestaurant/InfoRestaurant.js';
import { MainController } from '../../../controllers/MainController.js'

export class PanelRestaurantsComponent {
    constructor ({
        root = document.body,
        restaurants,
        controller = new MainController(),
        goTo
    } = {}) {
        this.restaurants = restaurants;
        this.root = root;
        this.controller = controller;
        this.goTo = goTo;
    }

    render () {
        const restaurantsElem = document.createElement('div');
        restaurantsElem.innerHTML = renderPanelRestaurants({});
        this.root.append(restaurantsElem);
        const restaurantList = document.getElementById('restaurants_list')
        for (const restaurant of this.restaurants) {
            restaurantList.innerHTML += renderInfoRestaurant({
                node: restaurant
            });
        }

        this.addRestaurantListeners();
    }

    addRestaurantListeners () {
        const restaurantPanel = this.root.querySelector('.restaurants');
        if (!restaurantPanel) {
            return;
        }

        restaurantPanel.addEventListener('click', e => {
            const { target } = e;

            e.preventDefault();
            // проверяе что нажали именно на кнопку
            const idRestaurant = target.closest('.card').dataset.restaurant;
            console.log('event', target);
            if (idRestaurant) {
                // TODO меняем элемент визуально как нибудь

                this.goTo('/restaurant/' + idRestaurant);
            }
        })
    }
}
