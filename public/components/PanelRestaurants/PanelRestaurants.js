import renderPanelRestaurants from './PanelRestaurantsTmpl.hbs';
import { noop } from '../../modules/utils.js';
import renderInfoRestaurant from '../InfoRestaurant/InfoRestaurantTmpl.hbs';
import { MainController } from '../../controllers/MainController.js'

export class PanelRestaurantsComponent {
    constructor ({
        root = document.body,
        controller = new MainController(),
        goTo = noop
    } = {}) {
        this.root = root;
        this.controller = controller;
        this.goTo = goTo;
    }

    render () {
        const restaurantsElem = document.createElement('div');
        restaurantsElem.innerHTML = renderPanelRestaurants({});
        this.root.append(restaurantsElem);
        this.restaurantList = document.getElementById('restaurants_list')

        this.addRestaurantListeners();
    }

    add ({ restaurants }) {
        for (const restaurant of restaurants) {
            this.restaurantList.innerHTML += renderInfoRestaurant({
                node: restaurant
            });
        }
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
