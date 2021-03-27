import user from '../modules/user.js';
import { RestaurantSignInController } from "../controllers/RestaurantSignInController.js";
import { RestaurantSignIn } from "../components/RestaurantSignIn/RestaurantSignIn.js";

export class RestaurantSignInView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.signInController = new RestaurantSignInController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main') // TODO: goto restaurant profile
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
