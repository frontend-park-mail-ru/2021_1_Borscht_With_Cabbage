import eventBus from 'Modules/eventBus.js';
import { StoreEvents } from 'Events/StoreEvents.js';
import renderStoreRecommendationsList from './StoreRecommendations.hbs';
import renderInfoRestaurant from 'Components/InfoRestaurant/InfoRestaurantTmpl.hbs';
import { StoreController } from 'Controllers/StoreController';
import { noop } from 'Modules/utils';

export class StoreRecommendations {
    constructor ({ root, store, goTo = noop, controller }) {
        this.root = root;
        this.store = store;
        this.goTo = goTo;
        this.controller = controller;
        eventBus.on(
            StoreEvents.storeGetRecommendationsSuccess,
            this.renderRecommendations.bind(this)
        );
        eventBus.on(
            StoreEvents.storeGetRecommendationsFailed,
            this.loadError.bind(this)
        );
    }

    render () {
        console.log('get recommendations start');
        this.controller.getRecommendations(this.store.id);
    }

    renderRecommendations (recommendations) {
        this.root.innerHTML = renderStoreRecommendationsList({});

        const recommendationsList = document.getElementById('recommendations');
        if (recommendationsList) {
            for (const restaurant of recommendations) {
                recommendationsList.innerHTML += renderInfoRestaurant({
                    node: restaurant
                });
            }
            this.addRestaurantListeners();
        }
    }

    loadError (err) {
        console.log('error while getting restaurant recommendations:' + err);
    }

    addRestaurantListeners () {
        const recommendationsPanel = this.root.querySelector(
            '.store-recommendations'
        );
        if (!recommendationsPanel) {
            return;
        }

        recommendationsPanel.addEventListener('click', (e) => {
            const { target } = e;
            e.preventDefault();
            // проверяе что нажали именно на кнопку
            const idRestaurant = target.closest('.card').dataset.restaurant;
            console.log('event', target);
            if (idRestaurant) {
                // TODO меняем элемент визуально как нибудь
                this.goTo('/store/' + idRestaurant);
            }
        });
    }
}
