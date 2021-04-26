import { Validator } from '../modules/validation.js';
import restaurantSignUpModel from '../models/RestaurantSignUpModel.js';
import { noop } from '../modules/utils.js';
import user from '../modules/user.js';
import { RestaurantSignUpView } from '../views/RestaurantSignUpView.js';
import eventBus from '../modules/eventBus.js';
import { SignUpEvents } from '../events/SignUpEvents.js';

export class RestaurantSignUpController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signUpView = new RestaurantSignUpView({ root, goTo, controller: this })
        eventBus.on(SignUpEvents.restaurantSignUpSuccess, this.signupSuccess.bind(this));
        eventBus.on(SignUpEvents.restaurantSignUpFailed, this.signupFailed.bind(this));
    }

    signUp ({ email, password, title, number, repeatPassword, address }) {
        const emailError = Validator.validateEmail(email);
        const passwordError = Validator.validatePassword(password);
        const titleError = Validator.validateName(title);
        const phoneError = Validator.validatePhone(number);
        const repeatPasswordError = Validator.validateEqualPassword(password, repeatPassword);

        if (emailError.result && passwordError.result && titleError.result && phoneError.result && repeatPasswordError.result) {
            restaurantSignUpModel.signUp({ email, password, title, number, address });
            return {
                error: false
            }
        }
        return {
            error: true,
            emailError,
            passwordError,
            titleError,
            phoneError,
            repeatPasswordError
        };
    }

    render () {
        if (user.isAuth) {
            this.goTo('restaurantMain');
            return;
        }
        this.signUpView.render();
    }

    signupSuccess () {
        this.goTo('restaurantMain');
    }

    signupFailed (error) {
        this.signUpView.renderServerError(error);
    }
}
