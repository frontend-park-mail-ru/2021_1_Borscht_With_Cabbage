import { noop } from "../../../modules/utils.js";
import { RestaurantMainController } from "../../../controllers/RestaurantMainController.js";
import renderOrders from "../../Profile/Orders/OrdersListTmpl.hbs";
import eventBus from "../../../modules/eventBus.js";
import { RestaurantOrdersEvents } from "../../../events/RestaurantOrdersEvents.js";
import { I18n } from "../../../modules/intlApi.js";
import { RestaurantOrderElement } from "./Order/Order";

export class RestaurantOrdersComponent {
    constructor ({
        root = document.body,
        goTo = noop,
        controller
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        eventBus.on(RestaurantOrdersEvents.restaurantGetOrdersSuccess, this.ordersDraw.bind(this))
        eventBus.on(RestaurantOrdersEvents.restaurantGetOrdersFailed, this.loadError.bind(this))
    }

    render () {
        this.controller.getOrders()
    }

    ordersDraw(orders) {
        this.root.innerHTML = renderOrders({});

        const orderList = document.getElementById('orders-list')
        const i18n = new I18n()

        if (orders) {
            for (const order of orders) {
                console.log(order)
                const element = new RestaurantOrderElement({
                    root: orderList,
                    order: order,
                    i18n: i18n
                });
                element.render();
            }
        }
    }

    loadError (error) {
        console.log('mainVIew -> loadError', error)
    }
}