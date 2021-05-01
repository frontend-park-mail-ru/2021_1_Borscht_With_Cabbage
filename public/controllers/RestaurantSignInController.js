import { Validator } from 'Modules/validation.js';
import { RestaurantSignInModel } from "Models/RestaurantSignInModel.js";

export class RestaurantSignInController {
    constructor () {
        this.signInModel = new RestaurantSignInModel()
    }

    signIn (login, password) {
        const loginError = Validator.validateEmail(login);
        const passwordError = Validator.validatePassword(password);

        if (loginError.result * passwordError.result) {
            this.signInModel.signIn(login, password);
            return {
                error: false
            }
        } else {
            return {
                error: true,
                loginError,
                passwordError
            }
        }
    }
}
