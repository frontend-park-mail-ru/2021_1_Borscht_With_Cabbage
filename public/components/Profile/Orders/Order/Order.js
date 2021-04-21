import renderOrder from "./OrderTmpl.hbs";
import renderDishesList from "./OrderDish/DishList.hbs";
import renderDish from "./OrderDish/DishTmpl.hbs";
import { I18n } from "../../../../modules/intlApi.js";

export class OrderElement {
    constructor ({
        root = document.body,
        order = null,
        i18n = null
    } = {}) {
        this.root = root;
        this.order = order;
        this.i18n = i18n;
    }

    render () {
        if (this.order) {
            let  orderWithDateTime = {}; // новый пустой объект, чтобы с изменением дат не менялась изначальная структура
            for (let key in this.order) {
                orderWithDateTime[key] = this.order[key];
            }

            orderWithDateTime.orderTime = this.i18n.formatDateTime(orderWithDateTime.orderTime)
            orderWithDateTime.deliveryTime = this.i18n.formatDateTime(orderWithDateTime.deliveryTime)

            this.root.innerHTML += renderOrder({ order:  orderWithDateTime });

            document.getElementById('profile-left-block-order-food-'+ this.order.orderID).innerHTML = renderDishesList({id: this.order.orderID});
            const dishPlace = document.getElementById('food-list-'+ this.order.orderID)

            for (const dish of this.order.foods) {
                dishPlace.innerHTML += renderDish({ dish: dish })
            }
        }
    }
}