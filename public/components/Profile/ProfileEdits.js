import { renderProfileEdits } from './ProfileEditsTmpl.js';
import { renderInput } from '../../modules/rendering.js';
import { userPut } from '../../modules/api.js';

export class ProfileEdits {
    constructor (router, user) {
        this.user = user
        this.router = router;
    }

    render () {
        const profilePlace = document.getElementById('profile-main_block')
        profilePlace.innerHTML = renderProfileEdits({
            user: this.user,
            serverUrl: serverAddress
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
            emailError = window.validator.validateEmail(email.value).result;
        }

        const nameID = 'name';
        let nameError = false;
        const name = document.getElementById(nameID);
        if (name) {
            nameError = window.validator.validateName(name.value).result;
        }

        const numberID = 'number';
        let numberError = false;
        const number = document.getElementById(numberID);
        if (number) {
            numberError = window.validator.validateName(number.value).result;
        }

        return emailError * nameError * numberError;
    }

    updateInputs (info) {
        document.getElementById('email').value = info.email;
        document.getElementById('name').value = info.name;
        document.getElementById('number').value = info.number;
        document.getElementById('current_ava').src = info.avatar;
        document.getElementById('avatar').src = info.avatar;
        window.user.avatar = info.avatar;
    }

    saveRequest () {
        const form = document.getElementById('profile-form-userdata');
        const formData = new FormData(form);

        const data = {};
        formData.forEach(function (value, key) {
            data[key] = value;
        });

        userPut(formData)
            .then(r => this.updateInputs(r.parsedJSON))
            .catch(r => console.log('Error in data saving ', r));
    }

    addErrorListeners () {
        const emailID = 'email';
        const email = document.getElementById(emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(emailID, window.validator.validateEmail(email.value))
            );
        }

        const nameID = 'name';
        const name = document.getElementById(nameID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(nameID, window.validator.validateName(name.value))
            );
        }

        const numberID = 'number';
        const number = document.getElementById(numberID);
        if (number) {
            number.addEventListener('focusout',
                () => renderInput(numberID, window.validator.validatePhone(number.value))
            );
        }
    }
}
