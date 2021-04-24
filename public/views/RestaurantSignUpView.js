import { RestaurantSignUpController } from '../controllers/RestaurantSignUpController.js';
import { RestaurantSignUp } from '../components/Restaurant/RestaurantSignUp/RestaurantSignUp.js';
import { noop } from '../modules/utils.js';

export class RestaurantSignUpView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantSignUpController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signUpController = controller;
        this.signup = new RestaurantSignUp({ root, goTo, controller });
    }

    render () {
        this.root.innerHTML = '';
        if (!this.signup) {

        }
        this.signup.render()
    }

    renderServerError (error) {
        this.signup.renderServerError(error);
    }
}
