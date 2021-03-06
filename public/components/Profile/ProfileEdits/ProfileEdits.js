import renderProfileEdits from './ProfileEditsTmpl.hbs';
import { renderInput } from 'Modules/rendering.js';
import { Validator } from 'Modules/validation.js';
import { maskPhone } from 'Modules/phoneMask.js';
import eventBus from 'Modules/eventBus.js';
import { Preview } from '../../Preview/Preview.js';
import { getError, noop } from 'Modules/utils.js';
import user from 'Modules/user.js';
import { ProfileEvents } from 'Events/ProfileEvents.js';
import { ProfileController } from 'Controllers/ProfileController.js';
import { AuthEvents } from 'Events/AuthEvents.js';

export class ProfileEdits {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;

        this.emailID = 'email';
        this.nameID = 'name';
        this.phoneID = 'number';
        this.currentPasswordID = 'password_current';
        this.newPasswordID = 'password';
        this.repeatPasswordID = 'password_repeat';

        this.controller = controller;
    }

    render (user) {
        const profilePlace = document.getElementById('profile-left-block');
        profilePlace.innerHTML = renderProfileEdits({
            user
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
        const formID = 'profile-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit.bind(this));
    }

    formSubmit (event) {
        event.preventDefault()

        const errors = this.controller.setUserData({
            email: document.getElementById(this.emailID).value,
            name: document.getElementById(this.nameID).value,
            phone: document.getElementById(this.phoneID).value.replace(/\D/g, ''),
            currentPassword: document.getElementById(this.currentPasswordID).value,
            newPassword: document.getElementById(this.newPasswordID).value,
            repeatPassword: document.getElementById(this.repeatPasswordID).value,
            avatar: this.preview.getFile()
        });
        if (errors.error) {
            renderInput(this.emailID, errors.emailError);
            renderInput(this.nameID, errors.nameError);
            renderInput(this.phoneID, errors.phoneError);
            renderInput(this.currentPasswordID, errors.currentPasswordError);
            renderInput(this.newPasswordID, errors.newPasswordError);
            renderInput(this.repeatPasswordID, errors.repeatPasswordError);
        } else {
            // TODO обратная связь что грузится и все хорошо
        }
    }

    renderServerError (error) {
        const serverError = document.getElementById('serverError');
        serverError.hidden = false;
        serverError.textContent = getError(error);
    }

    // updateInputs (info) {
    //
    //         const emailInput = document.getElementById(this.emailID);
    //         if (emailInput) {
    //             emailInput.value = info.email;
    //         }
    //         const nameInput = document.getElementById(this.nameID)
    //         if (nameInput) {
    //             nameInput.value = info.name;
    //         }
    //         const phoneInput = document.getElementById(this.phoneID)
    //         if (phoneInput) {
    //             phoneInput.value = info.number;
    //             phoneInput.focus();
    //         }
    //         if (info.avatar) {
    //             this.preview.deletePreview();
    //         } else {
    //             info.avatar = user.avatar;
    //         }
    //
    //
    // }

    addErrorListeners () {
        const email = document.getElementById(this.emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(this.emailID, Validator.validateEmail(email.value))
            );
        }

        const name = document.getElementById(this.nameID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(this.nameID, Validator.validateName(name.value))
            );
        }

        const phone = document.getElementById(this.phoneID);
        if (phone) {
            phone.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validatePhone(phone.value.replace(/\D/g, '')))
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
