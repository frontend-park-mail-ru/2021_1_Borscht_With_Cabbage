import { RestaurantSignInController } from "../controllers/RestaurantSignInController.js";
import { RestaurantSignIn } from "../components/Restaurant/RestaurantSignIn/RestaurantSignIn.js";
import user from '../modules/user.js';
import { noop } from '../modules/utils.js';

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
        if (user.isAuth) {
            this.goTo('restaurantMain');
            return;
        }
        this.root.innerHTML = '';

        if (!this.signIn) {
            this.signIn = new RestaurantSignIn({
                root: this.root,
                goTo: this.goTo,
                controller: this.signInController
            });
        }
        this.signIn.render()
    }
}
