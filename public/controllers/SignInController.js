import signInModel from '../models/SignInModel.js';
import { Validator } from '../modules/validation.js';
import { noop } from '../modules/utils.js';
import { SignInView } from '../views/SignInView.js';
import user from '../modules/user.js';
import eventBus from '../modules/eventBus.js';
import { SignInEvents } from '../events/SignInEvents.js';
import redirect from '../modules/redirect.js';

export class SignInController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signInView = new SignInView({ root, controller: this });
        eventBus.on(SignInEvents.userSignInSuccess, this.loginSuccess.bind(this));
        eventBus.on(SignInEvents.userSignInFailed, this.loginFailed.bind(this));
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
            return;
        }
        this.signInView.render();
    }

    loginFailed (error) {
        this.signInView.renderServerError(error);
    }

    loginSuccess () {
        const url = redirect.pop();
        if (url && !/signin/.test(url) && !/login/.test(url)) {
            this.goTo(url);
            return;
        }
        this.goTo('main');
    }
}
