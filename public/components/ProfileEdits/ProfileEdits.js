import renderProfileEdits from './ProfileEditsTmpl.hbs';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import { maskPhone } from '../../modules/phoneMask.js';
import eventBus from '../../modules/eventBus.js';
import { Preview } from '../Preview/Preview.js';
import { noop } from '../../modules/utils.js';
import user from '../../modules/user.js';
import { ProfileEvents } from '../../events/ProfileEvents.js';
import { ProfileController } from '../../controllers/ProfileController.js';
import { AuthEvents } from '../../events/AuthEvents.js';

export class ProfileEdits {
    constructor ({
        root = document.body,
        goTo = noop,
        user = null,
        controller = new ProfileController()
    } = {}) {
        this.root = root;
        this.user = user;
        this.goTo = goTo;

        this.emailID = 'email';
        this.nameID = 'name';
        this.phoneID = 'number';
        this.currentPasswordID = 'password_current';
        this.newPasswordID = 'password';
        this.repeatPasswordID = 'password_repeat';

        this.controller = controller;
        eventBus.on(ProfileEvents.profileSetUserDataSuccess, this.updateInputs.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataFailed, this.changeFailed.bind(this));
    }

    render () {
        const profilePlace = document.getElementById('profile-left-block');
        profilePlace.innerHTML = renderProfileEdits({
            user: this.user,
            serverUrl: window.serverAddress
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
            renderInput(this.emailID, errors.emailError)
            renderInput(this.nameID, errors.nameError)
            renderInput(this.phoneID, errors.phoneError)
            renderInput(this.currentPasswordID, errors.currentPasswordError)
            renderInput(this.newPasswordID, errors.newPasswordError)
            renderInput(this.repeatPasswordID, errors.repeatPasswordError)
        } else {
            // TODO обратная связь что грузится и все хорошо
        }
    }

    changeFailed (error) {
        const serverError = document.getElementById('serverError')
        serverError.hidden = false
        serverError.textContent = error
    }

    updateInputs ({ info, status }) {
        if (status === 200) {
            document.getElementById(this.emailID).value = info.email;
            document.getElementById(this.nameID).value = info.name;
            document.getElementById(this.phoneID).value = info.number;
            document.getElementById(this.phoneID).focus();
            if (info.avatar) {
                this.preview.deletePreview()
            } else {
                info.avatar = user.avatar
            }
            eventBus.emit(AuthEvents.userSignIn, {
                name: info.name,
                avatar: info.avatar
            })
        }
    }

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
