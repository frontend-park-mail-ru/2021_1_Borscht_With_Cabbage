import renderOrder from './RestaurantOrderTmpl.hbs';
import renderDishesList from '../../../Profile/Orders/Order/OrderDish/DishList.hbs';
import renderDish from '../../../Profile/Orders/Order/OrderDish/DishTmpl.hbs';
import { RestaurantMainController } from '../../../../controllers/RestaurantMainController.js';
import { StatusesComponent } from './StatusOptions/StatusOptions.js';
import {I18n} from "../../../../modules/intlApi.js";

export class RestaurantOrderElement {
    constructor ({
        root = document.body,
        order = null,
        i18n = null,
        restaurantController
    } = {}) {
        this.root = root;
        this.order = order;
        this.restaurantController = restaurantController;
    }

    render () {
        if (this.order) {
            const orderWithDateTime = {}; // новый пустой объект, чтобы с изменением дат не менялась изначальная структура
            Object.keys(this.order).forEach((key) => {
                orderWithDateTime[key] = this.order[key];
            });

            const i18n = new I18n()
            orderWithDateTime.orderTime = i18n.formatDateTime(
                orderWithDateTime.orderTime
            );

            this.root.insertAdjacentHTML(
                'beforeend',
                renderOrder({ order: orderWithDateTime })
            );
            const statuses = new StatusesComponent({
                root: this.root,
                controller: this.restaurantController
            });
            statuses.render(this.order);

            document.getElementById(
                'block-order-food-' + this.order.orderID
            ).innerHTML = renderDishesList({ id: this.order.orderID });
            const dishPlace = document.getElementById(
                'food-list-' + this.order.orderID
            );
            if (dishPlace) {
                for (const dish of this.order.foods) {
                    dishPlace.innerHTML += renderDish({ dish: dish });
                }
            }
        }
    }
}
