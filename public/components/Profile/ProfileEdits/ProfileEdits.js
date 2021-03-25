import { renderProfileEdits } from './ProfileEditsTmpl.js';
import { renderInput } from '../../../modules/rendering.js';
import { userPut } from '../../../modules/api.js';
import { Validator } from '../../../modules/validation.js';
import { maskPhone } from '../../../modules/phoneMask.js';
import eventBus from '../../../modules/eventBus.js';
import { Preview } from '../Preview/Preview.js';
import { noOp } from '../../../modules/utils.js';
import user from '../../../modules/user.js';

export class ProfileEdits {
    constructor ({
        root = document.body,
        goTo = noOp,
        user = null
    }) {
        this.root = root
        this.user = user
        this.goTo = goTo
        this.file = null
    }

    makePreview () {
        this.preview = new Preview(this.root, this.avatarInput, this.avatarButton)
    }

    render () {
        const profilePlace = document.getElementById('profile-left-block')
        profilePlace.innerHTML = renderProfileEdits({
            user: this.user,
            serverUrl: window.serverAddress
        });
        this.avatarInput = this.root.querySelector('#input-avatar')
        this.avatarButton = this.root.querySelector('#input-avatar-button')
        this.makePreview()

        this.addErrorListeners();
        this.addSubmitListener();
    }

    addSubmitListener () {
        const formID = 'profile-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit.bind(this));
    }

    formSubmit (event) {
        event.preventDefault();
        if (this.updateErrorsState()) {
            this.saveRequest();
        }
    }

    updateErrorsState () {
        const emailID = 'email';
        let emailError = false;
        const email = document.getElementById(emailID);
        if (email) {
            emailError = Validator.validateEmail(email.value).result;
        }

        const nameID = 'name';
        let nameError = false;
        const name = document.getElementById(nameID);
        if (name) {
            nameError = Validator.validateName(name.value).result;
        }

        const numberID = 'number';
        let numberError = false;
        const number = document.getElementById(numberID);
        if (number) {
            numberError = Validator.validateName(number.value).result;
        }

        return emailError * nameError * numberError;
    }

    updateInputs (info, status) {
        if (status === 200) {
            document.getElementById('email').value = info.email;
            document.getElementById('name').value = info.name;
            document.getElementById('number').value = info.number;
            document.getElementById('number').focus();
            if (info.avatar) {
                this.preview.deletePreview()
            } else {
                info.avatar = user.avatar
            }
            eventBus.emit('userSignIn', {
                name: info.name,
                avatar: info.avatar
            })
        }
    }

    saveRequest () {
        const phoneInput = document.getElementById('number');
        const value = phoneInput.value;
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
        const form = document.getElementById('profile-userdata');
        const formData = new FormData(form);

        this.file = this.preview.getFile()
        if (!this.file) {
            formData.delete('avatar')
        }

        userPut({
            data: formData
        })
            .then(r => this.updateInputs(r.parsedJSON, r.status))
            .catch(r => console.log('Error in data saving ', r));

        phoneInput.value = value;
    }

    addErrorListeners () {
        const emailID = 'email';
        const email = document.getElementById(emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(emailID, Validator.validateEmail(email.value))
            );
        }

        const nameID = 'name';
        const name = document.getElementById(nameID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(nameID, Validator.validateName(name.value))
            );
        }

        const numberID = 'number';
        const number = document.getElementById(numberID);
        if (number) {
            number.addEventListener('focusout',
                () => renderInput(numberID, Validator.validatePhone(number.value))
            );
        }

        const passwordID = 'password';
        const password = document.getElementById(passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(passwordID, Validator.validatePassword(password.value))
            );
        }

        const repeatPasswordID = 'password_repeat';
        const repeatPassword = document.getElementById(repeatPasswordID);
        if (repeatPassword) {
            repeatPassword.addEventListener('focusout',
                () => renderInput(
                    repeatPasswordID,
                    Validator.validateEqualPassword(
                        password.value,
                        repeatPassword.value
                    )
                )
            );
        }

        maskPhone(number);
        number.focus();

        this.preview.setPreview()
    }
}
