import { Validator } from 'Modules/validation.js';
import { RestaurantSignUpModel } from 'Models/RestaurantSignUpModel.js';

export class RestaurantSignUpController {
    constructor () {
        this.restaurantSignUpModel = new RestaurantSignUpModel()
    }

    signUp ({ email, password, title, number, repeatPassword }) {
        const emailError = Validator.validateEmail(email);
        const passwordError = Validator.validatePassword(password);
        const titleError = Validator.validateName(title);
        const phoneError = Validator.validatePhone(number);
        const repeatPasswordError = Validator.validateEqualPassword(password, repeatPassword);

        if (emailError.result && passwordError.result && titleError.result && phoneError.result && repeatPasswordError.result) {
            this.restaurantSignUpModel.signUp({ email, password, title, number });
            return {
                error: false
            }
        } else {
            return {
                error: true,
                emailError,
                passwordError,
                titleError,
                phoneError,
                repeatPasswordError
            }
        }
    }
}
