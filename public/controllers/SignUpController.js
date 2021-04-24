import { Validator } from '../modules/validation.js';
import signUpModel from '../models/SignUpModel.js';
import eventBus from '../modules/eventBus.js';
import { SignUpEvents } from '../events/SignUpEvents.js';
import redirect from '../modules/redirect.js';
import { noop } from '../modules/utils.js';
import { SignUpView } from '../views/SignUpView.js';
import user from '../modules/user.js';

export class SignUpController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signUpView = new SignUpView({ root, controller: this })
        eventBus.on(SignUpEvents.userSignUpSuccess, this.signupSuccess.bind(this));
        eventBus.on(SignUpEvents.userSignUpFailed, this.signupFailed.bind(this));
    }

    signUp ({ email, password, name, number, repeatPassword }) {
        const emailError = Validator.validateEmail(email);
        const passwordError = Validator.validatePassword(password);
        const nameError = Validator.validateName(name);
        const phoneError = Validator.validatePhone(number);
        const repeatPasswordError = Validator.validateEqualPassword(password, repeatPassword);

        if (emailError.result && passwordError.result && nameError.result && phoneError.result && repeatPasswordError.result) {
            signUpModel.signUp({
                email,
                password,
                name,
                number
            });
            return {
                error: false
            };
        }
        return {
            error: true,
            emailError,
            passwordError,
            nameError,
            phoneError,
            repeatPasswordError
        };
    }

    render () {
        if (user.isAuth) {
            return;
        }
        this.signUpView.render();
    }

    signupSuccess () {
        const url = redirect.pop();
        if (url) {
            this.goTo(url);
            return;
        }
        this.goTo('main');
    }

    signupFailed (error) {
        this.signUpView.renderServerError(error);
    }
}
