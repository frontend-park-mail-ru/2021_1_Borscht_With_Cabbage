import { getError, noop } from '../../modules/utils.js';
import { BasketController } from '../../controllers/BasketController.js';
import renderDeliveryOptions from './DeliveryOptionsTmpl.hbs';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import address from '../../modules/address.js';
import { YandexMap } from '../../modules/yandexMap.js';
import { maskPhone } from '../../modules/phoneMask.js';
import './DeliveryOptions.less';

export class DeliveryOptions {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new BasketController(),
        info = {}
    } = {}) {
        this.info = info;
        this.root = root;
        this.goTo = goTo;
        this.numberID = 'input-number';
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
            latitude: Number(this.info.address.latitude),
            longitude: Number(this.info.address.longitude)
        }, this.info.address.radius)
        this.yaMap.setUser(address.getAddress());

        this.addEventListeners()
    }

    addEventListeners () {
        const address = this.root.querySelector('#input-address');
        if (address) {
            address.addEventListener('focusout',
                // TODO validate address
                () => renderInput('input-address', Validator.validateDescription(address.value))
            );
        }

        const number = this.root.querySelector('#input-number');
        if (number) {
            number.addEventListener('focusout',
                () => renderInput('input-number', Validator.validatePhone(number.value.replace(/\D/g, '')))
            );
            maskPhone(number);
            number.focus();
        }

        const orderButton = this.root.querySelector('#button-order');
        orderButton.addEventListener('click', () => {
            this.controller.order({
                address: this.root.querySelector('#input-address').value,
                number: this.root.querySelector('#input-number').value.replace(/\D/g, ''),
                comments: this.root.querySelector('#input-comments').value,
                yaMap: this.yaMap
            });
        });
    }

    renderErrors (errors) {
        if (errors.error === true) {
            renderInput(this.numberID, errors.numberError);
        } else {
            // TODO обратная связь что грузится и все хорошо
        }
    }

    renderServerError (error) {
        const serverError = document.getElementById('serverError');
        serverError.hidden = false;
        serverError.textContent = getError(error);
    }
}
