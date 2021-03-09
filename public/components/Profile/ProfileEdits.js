import { renderProfileEdits } from './ProfileEditsTmpl.js';
import { renderInput } from '../../modules/rendering.js';
import { ajaxPut } from '../../modules/http.js';

export class ProfileEdits {
    constructor (router, user) {
        this.user = user
        this.router = router;
    }

    render () {
        const profilePlace = document.getElementById('profile-main_block')
        profilePlace.innerHTML = renderProfileEdits(this.user);

        this.addErrorListeners();
        this.addSubmitListener();
    }

    addSubmitListener() {
        const formID = 'profile-form-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit);
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
        let  numberError = false;
        const number = document.getElementById(numberID);
        if (number) {
            numberError = window.validator.validateName(number.value).result;
        }

        return emailError * nameError * numberError;
    }

    saveRequest () {
        const emailInput = document.getElementById('email');
        const nameInput = document.getElementById('name');
        const numberInput = document.getElementById('number');

        const email = emailInput.value.trim()
        const name = nameInput.value.trim()
        const number = numberInput.value.trim()

        ajaxPut({
            url: '/user',
            body: { email, number, name }
        })
            .then(r => this.router.open('/user'))
            .catch(r => console.log('Error in data saving'));
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
                () => renderInput(numberID, window.validator.validateName(number.value))
            );
        }
    }
}