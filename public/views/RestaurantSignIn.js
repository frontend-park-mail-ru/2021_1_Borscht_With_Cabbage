import restaurant from '../modules/restaurant.js';
import { RestaurantSignInController } from "../controllers/RestaurantSignInController.js";
import { RestaurantSignIn } from "../components/RestaurantSignIn/RestaurantSignIn.js";

export class RestaurantSignInView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signInController = new RestaurantSignInController()
    }

    render () {
        if (restaurant.isAuth) {
            this.goTo('restaurantMain');
        }
        this.root.innerHTML = '';

        const signIn = new RestaurantSignIn({
            root: this.root,
            goTo: this.goTo,
            controller: this.signInController
        });
        signIn.render()
    }
}
