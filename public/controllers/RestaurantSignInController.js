import { Validator } from '../modules/validation.js';
import signInModel from '../models/RestaurantSignInModel.js';
import eventBus from '../modules/eventBus.js';
import { SignInEvents } from '../events/SignInEvents.js';
import { noop } from '../modules/utils.js';
import user from '../modules/user.js';
import { RestaurantSignInView } from '../views/RestaurantSignInView.js';

export class RestaurantSignInController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signInView = new RestaurantSignInView({root, goTo, controller: this});
        eventBus.on(SignInEvents.restaurantSignInSuccess, this.loginSuccess.bind(this));
        eventBus.on(SignInEvents.restaurantSignInFailed, this.loginFailed.bind(this));
    }

    signIn (login, password) {
        const loginError = Validator.validateEmail(login);
        const passwordError = Validator.validatePassword(password);

        if (loginError.result && passwordError.result) {
            signInModel.signIn(login, password);
            return {
                error: false
            };
        }
        return {
            error: true,
            loginError,
            passwordError
        };
    }

    render () {
        if (user.isAuth) {
            this.goTo('restaurantMain');
            return;
        }
        this.signInView.render();
    }

    loginSuccess () {
        this.goTo('restaurantMain');
    }

    loginFailed (error) {
        this.signInView.renderServerError(error);
    }
}
