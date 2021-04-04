import { RestaurantSignUpController } from "../controllers/RestaurantSignUpController.js";
import restaurant from "../modules/restaurant.js";
import { RestaurantSignUp } from "../components/RestaurantSignUp/RestaurantSignUp.js";

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
        if (restaurant.isAuth) {
            this.goTo('restaurantMain')
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
