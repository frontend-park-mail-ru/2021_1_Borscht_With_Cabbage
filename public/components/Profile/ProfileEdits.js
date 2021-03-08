import {renderProfileEdits} from "./ProfileEditsTmpl.js";
import {renderInput} from "../../modules/rendering.js";
import {ajaxPut} from "../../modules/http.js";

export class ProfileEdits {
    constructor (validator, router, user) {
        this.user = user
        this.validator = validator;
        this.router = router;
        this.render = this.render.bind(this);
    }

    render () {
        const profilePlace = document.getElementById("profile-main_block")
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
        return this.validator.validateEmail().result *
            this.validator.validatePassword().result;
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
        document.getElementById(emailID).addEventListener('focusout',
            function () {
                renderInput(emailID, this.validator.validateEmail())
            }.bind(this)
        );

        const nameID = 'name';
        document.getElementById(nameID).addEventListener('focusout',
            function () {
                renderInput(nameID, this.validator.validateName())
            }.bind(this)
        );

        const numberID = 'number';
        document.getElementById(numberID).addEventListener('focusout',
            function () {
                renderInput(numberID, this.validator.validateNumber())
            }.bind(this)
        );
    }
}