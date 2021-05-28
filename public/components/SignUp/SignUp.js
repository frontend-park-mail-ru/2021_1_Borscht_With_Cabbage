import SignUpTemplate from './SignUpTmpl.hbs';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import { maskPhone } from '../../modules/phoneMask.js';
import { getError, noop } from '../../modules/utils.js';
import { SignUpController } from '../../controllers/SignUpController.js';

export class SignUp {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new SignUpController({ root, goTo })
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.emailID = 'email';
        this.nameID = 'name';
        this.phoneID = 'number';
        this.passwordID = 'password';
        this.repeatPasswordID = 'repeatPassword';
    }

    render () {
        this.root.innerHTML += SignUpTemplate({});

        this.addSignUpEventListeners();
    }

    addSignUpEventListeners () {
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

        const number = document.getElementById(this.phoneID);
        if (number) {
            number.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validatePhone(number.value))
            );
            maskPhone(number);
        }

        const password = document.getElementById(this.passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(this.passwordID, Validator.validatePassword(password.value))
            );
        }

        const repeatPassword = document.getElementById(this.repeatPasswordID);
        if (repeatPassword) {
            repeatPassword.addEventListener('focusout',
                () => renderInput(
                    this.repeatPasswordID,
                    Validator.validateEqualPassword(
                        password.value,
                        repeatPassword.value
                    )
                )
            );
        }

        const formID = 'authorization-form';
        const form = document.getElementById(formID);
        if (form) {
            form.addEventListener('submit', this.formSubmit.bind(this));
        }

        const loginID = 'js_toLogin';
        const login = document.getElementById(loginID);
        if (login) {
            // console.log('signup -> ', login)
            login.addEventListener('click', () => {
                this.goTo('login');
            });
        }
    }

    formSubmit (event) {
        event.preventDefault();
        const errors = this.controller.signUp({
            email: document.getElementById(this.emailID).value,
            password: document.getElementById(this.passwordID).value,
            name: document.getElementById(this.nameID).value,
            number: document.getElementById(this.phoneID).value.replace(/\D/g, ''),
            repeatPassword: document.getElementById(this.repeatPasswordID).value
        });
        if (errors.error === true) {
            renderInput(this.emailID, errors.emailError);
            renderInput(this.passwordID, errors.passwordError);
            renderInput(this.nameID, errors.nameError);
            renderInput(this.phoneID, errors.phoneError);
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
}
