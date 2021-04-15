import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import eventBus from '../../../modules/eventBus.js';
import { ProfileEvents } from '../../../events/ProfileEvents.js';
import renderRestaurantEdits from './RestaurantEditsTmpl.hbs';
import { Preview } from '../../Preview/Preview.js';
import { renderInput } from '../../../modules/rendering.js';
import { AuthEvents } from '../../../events/AuthEvents.js';
import { Validator } from '../../../modules/validation.js';
import { maskPhone } from '../../../modules/phoneMask.js';
import { getError, noop } from '../../../modules/utils.js';
import user from '../../../modules/user.js';

export class RestaurantEdits {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;

        this.emailID = 'email';
        this.titleID = 'title';
        this.phoneID = 'number';
        this.deliveryCostID = 'deliveryCost';
        this.currentPasswordID = 'password_current';
        this.newPasswordID = 'password';
        this.repeatPasswordID = 'password_repeat';

        this.controller = controller;
        eventBus.on(ProfileEvents.profileSetUserDataSuccess, this.updateInputs.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataFailed, this.changeFailed.bind(this));
    }

    render () {
        this.root.innerHTML = renderRestaurantEdits({
            user: user
        });
        this.avatarInput = this.root.querySelector('#input-avatar');
        this.avatarButton = this.root.querySelector('#input-avatar-button');

        this.preview = new Preview({
            root: this.root,
            input: this.avatarInput,
            button: this.avatarButton
        });

        this.addErrorListeners();
        this.addSubmitListener();
    }

    addSubmitListener () {
        const formID = 'restaurant-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit.bind(this));
    }

    formSubmit (event) {
        event.preventDefault()

        const errors = this.controller.setRestaurantData({
            email: document.getElementById(this.emailID).value,
            title: document.getElementById(this.titleID).value,
            phone: document.getElementById(this.phoneID).value.replace(/\D/g, ''),
            deliveryCost: document.getElementById(this.deliveryCostID).value,
            currentPassword: document.getElementById(this.currentPasswordID).value,
            newPassword: document.getElementById(this.newPasswordID).value,
            repeatPassword: document.getElementById(this.repeatPasswordID).value,
            avatar: this.preview.getFile()
        });
        if (errors.error) {
            renderInput(this.emailID, errors.emailError);
            renderInput(this.titleID, errors.nameError);
            renderInput(this.phoneID, errors.phoneError);
            renderInput(this.currentPasswordID, errors.currentPasswordError);
            renderInput(this.newPasswordID, errors.newPasswordError);
            renderInput(this.repeatPasswordID, errors.repeatPasswordError);
        } else {
            // TODO обратная связь что грузится и все хорошо
        }
    }

    changeFailed (error) {
        const serverError = document.getElementById('serverError');
        serverError.hidden = false;
        serverError.textContent = getError(error);
    }

    updateInputs ({ info, status }) {
        if (status === 200) {
            document.getElementById(this.emailID).value = info.email;
            document.getElementById(this.titleID).value = info.title;
            document.getElementById(this.phoneID).value = info.number;
            document.getElementById(this.phoneID).focus();
            if (info.avatar) {
                this.preview.deletePreview();
            } else {
                info.avatar = user.avatar;
            }
            eventBus.emit(AuthEvents.userSignIn, info)
        }
    }

    addErrorListeners () {
        const email = document.getElementById(this.emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(this.emailID, Validator.validateEmail(email.value))
            );
        }

        const name = document.getElementById(this.titleID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(this.titleID, Validator.validateName(name.value))
            );
        }

        const phone = document.getElementById(this.phoneID);
        if (phone) {
            phone.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validatePhone(phone.value.replace(/\D/g, '')))
            );
        }

        const deliveryCost = document.getElementById(this.deliveryCostID);
        if (deliveryCost) {
            deliveryCost.addEventListener('focusout',
                () => renderInput(this.deliveryCostID, Validator.validateRealNumber(deliveryCost.value))
            );
        }

        const newPassword = document.getElementById(this.newPasswordID);
        if (newPassword) {
            newPassword.addEventListener('focusout',
                () => renderInput(
                    this.newPasswordID,
                    Validator.validateChangeNewPassword(newPassword.value)
                )
            );
        }

        const currentPassword = document.getElementById(this.currentPasswordID);
        if (currentPassword) {
            currentPassword.addEventListener('focusout',
                () => renderInput(
                    this.currentPasswordID,
                    Validator.validateChangeOldPassword(currentPassword.value, newPassword.value)
                )
            );
        }

        const repeatPassword = document.getElementById(this.repeatPasswordID);
        if (repeatPassword) {
            repeatPassword.addEventListener('focusout',
                () => renderInput(
                    this.repeatPasswordID,
                    Validator.validateChangePasswordRepeat(newPassword.value, repeatPassword.value)
                )
            );
        }

        maskPhone(phone);
        phone.focus();

        this.preview.setPreview();
    }
}
