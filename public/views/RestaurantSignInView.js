import { RestaurantSignInController } from "Controllers/RestaurantSignInController.js";
import { RestaurantSignIn } from "Components/Restaurant/RestaurantSignIn/RestaurantSignIn.js";
import user from 'Modules/user.js';
import { noop } from 'Modules/utils.js';

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
