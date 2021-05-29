import eventBus from 'Modules/eventBus.js';
import { noop } from 'Modules/utils.js';
import { ProfileEvents } from 'Events/ProfileEvents.js';
import { ProfileController } from 'Controllers/ProfileController.js';
import { OrderElement } from "./Order/Order.js";
import renderOrderList from "./OrdersListTmpl.hbs";
import renderOrdersEmpty from "./EmptyOrders.hbs"
import { I18n } from 'Modules/intlApi.js';

export class Orders {
    constructor ({
        root = document.body,
        goTo = noop,
        user = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.user = user;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (orders) {
        document.getElementById('profile-left-block').innerHTML = renderOrderList({});
        const orderList = document.getElementById('orders-list');

        if (orders.length === 0) {
            orderList.innerHTML = renderOrdersEmpty({})
            return
        }
        if (orders && orderList) {
            for (const order of orders) {
                // console.log(order);
                const element = new OrderElement({
                    root: orderList,
                    order: order,
                    controller: this.controller,
                    goTo: this.goTo
                });
                element.render();
            }
        }
    }

    renderServerError (error) {
        console.log('profileView -> GetOrders -> loadError', error);
    }
}
