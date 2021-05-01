import eventBus from 'Modules/eventBus.js';
import { noop } from 'Modules/utils.js';
import { ProfileEvents } from 'Events/ProfileEvents.js';
import { ProfileController } from 'Controllers/ProfileController.js';
import { OrderElement } from "./Order/Order.js";
import renderOrderList from "./OrdersListTmpl.hbs";

export class Orders {
    constructor ({
        root = document.body,
        goTo = noop,
        user = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root
        this.user = user
        this.goTo = goTo
        this.controller = controller
        eventBus.on(ProfileEvents.profileGetOrdersSuccess, this.ordersDraw.bind(this))
        eventBus.on(ProfileEvents.profileGetOrdersFailed, this.loadError.bind(this))
    }

    render () {
        this.controller.getOrders()
    }

    ordersDraw(orders) {
        document.getElementById('profile-left-block').innerHTML =  renderOrderList({})
        const orderList = document.getElementById('orders-list')

        if (orders) {
            for (const order of orders) {
                console.log(order)
                const element = new OrderElement({
                    root: orderList,
                    order: order
                });
                element.render();
            }
        }
    }

    loadError (error) {
        console.log('profileView -> GetOrders -> loadError', error)
    }
}
