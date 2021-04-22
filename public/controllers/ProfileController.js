import { ProfileModel } from '../models/ProfileModel.js';
import { Validator } from '../modules/validation.js';

export class ProfileController {
    constructor () {
        this.profileModel = new ProfileModel();
    }

    setUserData ({
        email,
        name,
        phone,
        currentPassword,
        newPassword,
        repeatPassword,
        avatar
    } = {}) {
        const emailError = Validator.validateEmail(email);
        const nameError = Validator.validateName(name);
        const phoneError = Validator.validatePhone(phone);
        const currentPasswordError = Validator.validateChangeOldPassword(currentPassword, newPassword);
        const newPasswordError = Validator.validateChangeNewPassword(newPassword);
        const repeatPasswordError = Validator.validateChangePasswordRepeat(newPassword, repeatPassword);

        if (emailError.result && nameError.result && phoneError.result &&
            currentPasswordError.result && newPasswordError.result && repeatPasswordError.result
        ) {
            const formData = new FormData();
            if (avatar) {
                formData.append('avatar', avatar);
            }

            this.profileModel.setUserData({
                email,
                name,
                number: phone,
                password_current: currentPassword,
                password: newPassword,
                password_repeat: repeatPassword
            }, formData);
            return {
                error: false
            };
        }
        return {
            error: true,
            emailError,
            nameError,
            phoneError,
            currentPasswordError,
            newPasswordError,
            repeatPasswordError
        };
    }

    getUserData () {
        this.profileModel.getUserData();
    }

    getOrders () {
        this.profileModel.getOrders()
    }
}
