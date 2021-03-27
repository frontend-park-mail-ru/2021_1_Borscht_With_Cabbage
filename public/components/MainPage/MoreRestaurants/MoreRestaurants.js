import { renderBtn } from './MoreRestaurantsTmpl.js';
import { MainController } from '../../../controllers/MainController.js'

export class MoreRestaurantsComponent {
    constructor ({
        root = document.body,
        controller = new MainController()
    } = {}) {
        this.root = root;
        this.controller = controller;
    }

    render () {
        const btnTmpl = document.createElement('div');

        btnTmpl.innerHTML = renderBtn();
        this.root.append(btnTmpl);

        this.addListeners();
    }

    addListeners () {
        const btnMore = this.root.querySelector('.more-button');
        if(!btnMore) {
            return;
        }

        btnMore.addEventListener('click', () => {
            this.controller.getRestaurants();
        })
    }
}
