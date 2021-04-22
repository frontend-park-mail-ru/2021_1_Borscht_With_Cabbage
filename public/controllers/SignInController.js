import { SignInModel } from '../models/SignInModel.js';
import { Validator } from '../modules/validation.js';

export class SignInController {
    constructor () {
        this.signInModel = new SignInModel();
    }

    signIn (login, password) {
        const loginError = Validator.validateEmail(login);
        const passwordError = Validator.validatePassword(password);

        if (loginError.result && passwordError.result) {
            this.signInModel.signIn(login, password);
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
}
