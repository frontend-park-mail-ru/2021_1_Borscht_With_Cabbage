import { Validator } from '../modules/validation.js';
import { SignUpModel } from '../models/SignUpModel.js';

export class SignUpController {
    constructor () {
        this.signUpModel = new SignUpModel();
    }

    signUp ({ email, password, name, number, repeatPassword }) {
        const emailError = Validator.validateEmail(email);
        const passwordError = Validator.validatePassword(password);
        const nameError = Validator.validateName(name);
        const phoneError = Validator.validatePhone(number);
        const repeatPasswordError = Validator.validateEqualPassword(password, repeatPassword);

        if (emailError.result && passwordError.result && nameError.result && phoneError.result && repeatPasswordError.result) {
            this.signUpModel.signUp({
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
}
