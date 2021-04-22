import { noop } from '../../../modules/utils.js';
import { ProfileController } from '../../../controllers/ProfileController.js';
import { OrderElement } from './Order/Order.js';
import renderOrderList from './OrdersListTmpl.hbs';

export class Orders {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (orders) {
        document.getElementById('profile-left-block').innerHTML = renderOrderList({});
        const orderList = document.getElementById('orders-list');

        if (orders) {
            for (const order of orders) {
                const element = new OrderElement({
                    root: orderList,
                    order: order
                });
                element.render();
            }
        }
    }

    renderServerError (error) {
        console.log('profileView -> GetOrders -> loadError', error);
    }
}
