import { RestaurantSignUpController } from "../controllers/RestaurantSignUpController.js";
import { RestaurantSignUp } from "../components/Restaurant/RestaurantSignUp/RestaurantSignUp.js";
import user from '../modules/user.js';
import { noop } from '../modules/utils.js';

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
        const signup = new RestaurantSignUp({
            root: this.root,
            goTo: this.goTo,
            controller: this.signUpController
        });
        signup.render()
    }
}
