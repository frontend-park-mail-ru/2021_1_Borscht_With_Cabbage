import { SignInModel } from 'Models/SignInModel.js';
import { Validator } from 'Modules/validation.js';

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
        } else {
            return {
                error: true,
                loginError,
                passwordError
            };
        }
    }
}
