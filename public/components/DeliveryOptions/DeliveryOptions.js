import { noop } from '../../modules/utils.js';
import { BasketController } from '../../controllers/BasketController.js';
import { renderDeliveryOptions } from './DeliveryOptionsTmpl.js';

export class DeliveryOptions {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new BasketController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (info) {
        this.root.insertAdjacentHTML('afterbegin', renderDeliveryOptions({
            user: info
        }));
        const orderButton = this.root.querySelector('#button-order');
        orderButton.addEventListener('click', () => {
            this.controller.order({
                address: this.root.querySelector('#input-address').value,
                number:  this.root.querySelector('#input-number').value,
                comments: this.root.querySelector('#input-comments').value
            });
        });
    }
}