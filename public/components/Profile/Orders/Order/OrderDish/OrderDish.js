import { renderDish } from "./DishTmpl.js";

export class DishElement {
    constructor ({
        root = document.body,
        dish = null
    } = {}) {
        this.root = root;
        this.dish = dish;
    }

    render () {
        if (this.dish) {
           // const dishPlace = document.getElementById('profile-left-block-order-food-list-'+this.dish.id);
            console.log("dishPlace: ", this.root)

            console.log(this.root.innerHTML)
            this.root.innerHTML += renderDish({ dish: this.dish });
            console.log("dish", this.root.innerHTML)
        }
    }
}