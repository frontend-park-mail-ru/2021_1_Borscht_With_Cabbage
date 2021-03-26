import { RestaurantSignUpController } from "../controllers/RestaurantSignUpController.js";
import user from "../modules/user.js";
import { RestaurantSignUp } from "../components/RestaurantSignUp/RestaurantSignUp.js";

export class RestaurantSignUpView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.signUpController = new RestaurantSignUpController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main')
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
