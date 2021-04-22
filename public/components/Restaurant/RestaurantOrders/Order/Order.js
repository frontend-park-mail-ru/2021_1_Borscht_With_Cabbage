import renderOrder from "./RestaurantOrderTmpl.hbs";
import renderDishesList from "../../../Profile/Orders/Order/OrderDish/DishList.hbs";
import renderDish from "../../../Profile/Orders/Order/OrderDish/DishTmpl.hbs";
import { RestaurantMainController } from "../../../../controllers/RestaurantMainController.js";
import { StatusesComponent } from "./StatusOptions/StatusOptions.js";

export class RestaurantOrderElement {
    constructor ({
        root = document.body,
        order = null,
        i18n = null,
        restaurantController = new RestaurantMainController(),
    } = {}) {
        this.root = root;
        this.order = order;
        this.i18n = i18n;
        this.restaurantController = restaurantController;
    }

    render () {
        if (this.order) {
            let  orderWithDateTime = {}; // новый пустой объект, чтобы с изменением дат не менялась изначальная структура
            for (let key in this.order) {
                orderWithDateTime[key] = this.order[key];
            }
            orderWithDateTime.orderTime = this.i18n.formatDateTime(orderWithDateTime.orderTime)

            this.root.innerHTML += renderOrder({ order:  orderWithDateTime });
            const statuses = new StatusesComponent({
                root: this.root,
                i18n: this.i18n,
                controller: this.restaurantController
            })
            statuses.render(this.order)

            document.getElementById('profile-left-block-order-food-'+ this.order.orderID).innerHTML = renderDishesList({id: this.order.orderID});
            const dishPlace = document.getElementById('food-list-'+ this.order.orderID)
            for (const dish of this.order.foods) {
                dishPlace.innerHTML += renderDish({ dish: dish })
            }
        }
    }
}