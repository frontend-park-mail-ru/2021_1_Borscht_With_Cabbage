import { RestaurantSignUpController } from "Controllers/RestaurantSignUpController.js";
import { RestaurantSignUp } from "Components/Restaurant/RestaurantSignUp/RestaurantSignUp.js";
import user from 'Modules/user.js';
import { noop } from 'Modules/utils.js';

export class RestaurantSignUpView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signUpController = new RestaurantSignUpController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('restaurantMain');
            return;
        }
        this.root.innerHTML = '';
        if (!this.signup) {
            this.signup = new RestaurantSignUp({
                root: this.root,
                goTo: this.goTo,
                controller: this.signUpController
            });
        }
        this.signup.render()
    }
}
