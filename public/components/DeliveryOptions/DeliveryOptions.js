import { noop } from '../../modules/utils.js';
import { BasketController } from '../../controllers/BasketController.js';
import renderDeliveryOptions from './DeliveryOptionsTmpl.hbs';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import address from '../../modules/address.js';
import { YandexMap } from '../../modules/yandexMap.js';

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
            user: info,
            address: address.name
        }));
        this.yaMap = new YandexMap();
        this.yaMap.render({
            id: 'js__basket-map',
            pos: address.getAddress(),
            isStatic: true
        });
        this.yaMap.setRestaurant({
            latitude: 55.751574,
            longitude: 37.57385
        }, 1000)
        this.yaMap.setUser(address.getAddress());

        this.addEventListeners()
    }

    addEventListeners () {
        const address = this.root.querySelector('#input-address');
        if (address) {
            address.addEventListener('focusout',
                () => renderInput('input-address', Validator.validateDescription(address.value))
            );
        }

        const number = this.root.querySelector('#input-number');
        if (number) {
            number.addEventListener('focusout',
                () => renderInput('input-number', Validator.validateNumber(number.value))
            );
        }

        const orderButton = this.root.querySelector('#button-order');
        orderButton.addEventListener('click', () => {
            this.controller.order({
                address: this.root.querySelector('#input-address').value,
                number: this.root.querySelector('#input-number').value,
                comments: this.root.querySelector('#input-comments').value
            });
        });
    }
}