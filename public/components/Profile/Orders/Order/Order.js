import renderOrder from "./OrderTmpl.hbs";
import renderDishesList from "./OrderDish/DishList.hbs";
import renderDish from "./OrderDish/DishTmpl.hbs";

export class OrderElement {
    constructor ({
        root = document.body,
        order = null
    } = {}) {
        this.root = root;
        this.order = order;
    }

    render () {
        if (this.order) {
            this.root.innerHTML += renderOrder({ order: this.order });

            document.getElementById('profile-left-block-order-food-'+ this.order.orderID).innerHTML = renderDishesList({id: this.order.orderID});
            const dishPlace = document.getElementById('food-list-'+ this.order.orderID)

            for (const dish of this.order.foods) {
                dishPlace.innerHTML += renderDish({ dish: dish })
                console.log("hey3")
            }
        }
    }
}