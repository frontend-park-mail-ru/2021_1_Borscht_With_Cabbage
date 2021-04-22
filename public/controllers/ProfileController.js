import { ProfileModel } from '../models/ProfileModel.js';
import { Validator } from '../modules/validation.js';
import user from '../modules/user.js';
import { noop } from '../modules/utils.js';
import { ProfileView } from '../views/ProfileView.js';
import eventBus from '../modules/eventBus.js';
import { ProfileEvents } from '../events/ProfileEvents.js';
import { AuthEvents } from '../events/AuthEvents.js';

export class ProfileController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.profileView = new ProfileView({ root, goTo, controller: this })
        this.profileModel = new ProfileModel();
        eventBus.on(ProfileEvents.profileGetUserDataSuccess, this.draw.bind(this));
        eventBus.on(ProfileEvents.profileGetUserDataFailed, this.loadError.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataSuccess, this.updateInputs.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataFailed, this.changeFailed.bind(this));
        eventBus.on(ProfileEvents.profileGetOrdersSuccess, this.draw.bind(this))
        eventBus.on(ProfileEvents.profileGetOrdersFailed, this.loadError.bind(this))
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

    render (url) {
        this.url = url;
        if (user.role === 'admin') {
            this.goTo('restaurantMain');
            return;
        } else if (user.role !== 'user') {
            this.goTo('main');
            return;
        }

        if (/orders/.test(url)) {
            this.getOrders();
        } else if (/chats/.test(url)) {
            // TODO
        } else {
            this.getUserData();
        }


    }

    draw (data) {
        this.profileView.render({ data, url: this.url });
    }

    loadError (error) {
        console.log('profileView -> loadError', error)
    }

    updateInputs ({ info, status }) {
        if (status === 200) {
            if (!info.avatar) {
                info.avatar = user.avatar;
            }
            eventBus.emit(AuthEvents.userSignIn, info);
            this.draw(info);
        }
    }

    changeFailed (error) {
        this.profileView.renderServerError(error);
    }
}
