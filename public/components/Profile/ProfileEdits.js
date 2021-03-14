import { renderProfileEdits } from './ProfileEditsTmpl.js';
import { renderInput } from '../../modules/rendering.js';
import { userPut } from '../../modules/api.js';
import { Validator } from '../../modules/validation.js';

export class ProfileEdits {
    constructor (goTo, user) {
        this.user = user
        this.goTo = goTo;
    }

    render () {
        const profilePlace = document.getElementById('profile-main_block')
        profilePlace.innerHTML = renderProfileEdits({
            user: this.user,
            serverUrl: window.serverAddress
        });

        this.addErrorListeners();
        this.addSubmitListener();
    }

    addSubmitListener () {
        const formID = 'profile-form-userdata';
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
            if (info.avatar) {
                document.getElementById('avatar').src = info.avatar;
                document.getElementById('current_ava').src = info.avatar;
                window.user.avatar = info.avatar;
            }
            document.getElementById('navbar-username').textContent = info.name;
            window.user.name = info.name;
        }
    }

    saveRequest () {
        const form = document.getElementById('profile-form-userdata');
        const formData = new FormData(form);

        const data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        userPut({
            data: formData
        })
            .then(r => this.updateInputs(r.parsedJSON, r.status))
            .catch(r => console.log('Error in data saving ', r));
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
    }
}
