import { renderSignUp } from './SignUpTmpl.js';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import { signupPost } from '../../modules/api.js';
import { maskPhone } from '../../modules/phoneMask.js';

export class SignUp {
    constructor ({
        root = document.body,
        goTo = null
    }) {
        this.root = root;
        this.goTo = goTo;
    }

    render () {
        this.root.innerHTML += renderSignUp({});

        this.addSignUpEventListeners();
    }

    addSignUpEventListeners () {
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

        const phoneID = 'phone';
        const phone = document.getElementById(phoneID);
        if (phone) {
            phone.addEventListener('focusout',
                () => renderInput(phoneID, Validator.validatePhone(phone.value))
            );
        }
        maskPhone(phone);

        const passwordID = 'password';
        const password = document.getElementById(passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(passwordID, Validator.validatePassword(password.value))
            );
        }

        const repeatPasswordID = 'repeatPassword';
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

        const formID = 'auth-form';
        const form = document.getElementById(formID);
        if (form) {
            form.addEventListener('submit', this.formSubmit.bind(this));
        }

        const loginID = 'js_toLogin';
        const login = document.getElementById(loginID);
        if (login) {
            login.onclick = () => {this.goTo('login')}
        }
    }

    formSubmit (event) {
        event.preventDefault();
        if (this.updateErrorsState()) {
            this.signupRequest();
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
            nameError = Validator.validateName(name).result;
        }

        const phoneID = 'phone';
        let phoneError = false;
        const phone = document.getElementById(phoneID);
        if (phone) {
            phoneError = Validator.validatePhone(phone.value).result;
        }

        const passwordID = 'password';
        let passwordError = false;
        const password = document.getElementById(passwordID);
        if (password) {
            passwordError = Validator.validatePassword(password.value).result;
        }

        const repeatPasswordID = 'repeatPassword';
        let repeatPasswordError = false;
        const repeatPassword = document.getElementById(repeatPasswordID);
        if (repeatPassword) {
            repeatPasswordError = Validator.validateEqualPassword(password.value, repeatPassword.value).result;
        }

        return emailError * passwordError * repeatPasswordError * nameError * phoneError;
    }

    signupRequest () {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const nameInput = document.getElementById('name');
        const phoneInput = document.getElementById('phone');

        if (emailInput && passwordInput) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();

            const reject = function (promise) {
                const error = document.getElementById('serverError');
                error.hidden = false;
                error.textContent = promise.parsedJSON.result;
            };

            const resolve = function (promise) {
                if (promise.status === 200) {
                    this.goTo('main');
                } else if (promise.status === 400) {
                    reject(promise);
                }
            };

            signupPost({
                email: email,
                password: password,
                name: name,
                phone: phone.replace(/\D/g, '')
            })
                .then(resolve.bind(this))
                .catch(reject);
        }
    }
}
