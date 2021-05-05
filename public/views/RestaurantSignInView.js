import { RestaurantSignInController } from '../controllers/RestaurantSignInController.js';
import { RestaurantSignIn } from '../components/Restaurant/RestaurantSignIn/RestaurantSignIn.js';
import { noop } from '../modules/utils.js';

export class RestaurantSignInView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantSignInController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signInController = controller;
        this.signIn = new RestaurantSignIn({ root, goTo, controller });
    }

    render () {
        this.root.innerHTML = '';
        this.signIn.render();
    }

    renderServerError (error) {
        this.signIn.renderServerError(error);
    }
}
