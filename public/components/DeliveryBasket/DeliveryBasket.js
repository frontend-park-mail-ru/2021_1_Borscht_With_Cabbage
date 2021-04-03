import { noop } from '../../modules/utils.js';

export class DeliveryBasket {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.root = root;
        this.goTo = goTo;
    }

    render (info) {

    }
}