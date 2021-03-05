import { renderSignUpView } from "../../templates/signUpTemplate.js";
import { navbar } from "../../components/NavBar/NavBar.js";
import { renderInput } from "../../modules/rendering.js";
import { Validator } from "../../modules/validation.js";

export class SignUpView {
    constructor (root) {
        this.root = root;
        this.validator = new Validator();
        this.render = this.render.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    render () {
        this.root.innerHTML = '';
        navbar({ auth: false }, this.root);

        const signup = document.createElement('div');

        signup.innerHTML = renderSignUpView({});
        this.root.append(signup);

        document.getElementsByClassName('error').forE
        this.addErrorListeners()
    }

    addErrorListeners () {
        const emailID = 'email';
        document.getElementById(emailID).addEventListener('focusout',
            function () {
                renderInput(emailID, this.validator.validateEmail())
            }.bind(this)
        );

        const passwordID = 'password';
        document.getElementById(passwordID).addEventListener('focusout',
            function () {
                renderInput(passwordID, this.validator.validatePassword())
            }.bind(this)
        );

        const repeatPasswordID = 'repeatPassword';
        document.getElementById(repeatPasswordID).addEventListener('focusout',
            function () {
                renderInput(repeatPasswordID, this.validator.validateEqualPassword())
            }.bind(this)
        );

        const formID = 'auth-form';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit);
    }


    formSubmit (event) {
        event.preventDefault();
        if (this.updateErrorsState()) {
            this.signupRequest();
        }
    }

    updateErrorsState () {
        return this.validator.validateEmail().result * this.validator.validatePassword().result * this.validator.validateEqualPassword().result;
    }

    signupRequest () {
        // TODO
        console.log('puk, you`re registered')
    }
}