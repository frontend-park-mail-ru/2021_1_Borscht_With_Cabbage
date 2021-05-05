import { noop } from '../../../modules/utils.js';
import renderOrders from '../../Profile/Orders/OrdersListTmpl.hbs';
import { RestaurantOrderElement } from './Order/Order';

export class RestaurantOrdersComponent {
    constructor ({
        root = document.body,
        goTo = noop,
        controller
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
    }

    render (orders) {
        document.getElementById('restaurant-left-block').innerHTML = renderOrders({});

        const orderList = document.getElementById('orders-list');

        if (orders && orderList) {
            for (const order of orders) {
                console.log(order);
                const element = new RestaurantOrderElement({
                    root: orderList,
                    order: order,
                    restaurantController: this.controller,
                    goTo: this.goTo
                });
                element.render();
            }
        }
    }
}
