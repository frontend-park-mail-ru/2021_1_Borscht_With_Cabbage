import { renderOrder } from "./OrderTmpl.js";
import { DishElement } from "./OrderDish/OrderDish.js";
import { renderDishesList } from "./OrderDish/DishList.js";
import { renderDish } from "./OrderDish/DishTmpl.js";

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
            console.log("dishPlace: ", dishPlace)

            for (const dish of this.order.foods) {
                console.log(dish)

               // const dishhh = dishPlace.createElement('div')
               //  const dishElement = new DishElement({
               //      root: dishPlace,
               //      dish: dish
               //  });
               //  dishElement.render();
            }
        }
    }
}