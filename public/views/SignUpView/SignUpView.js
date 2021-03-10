import { renderSignUpView } from './signUpTemplate.js';
import { NavBar } from '../../components/NavBar/NavBar.js';
import { renderInput } from '../../modules/rendering.js';
import { signupPost } from '../../modules/api.js';

export class SignUpView {
    constructor (root, route) {
        this.route = route;
        this.root = root;
    }

    render () {
        this.root.innerHTML = '';
        this.navbar = new NavBar(this.root);

        const signup = document.createElement('div');

        signup.innerHTML = renderSignUpView({});
        this.root.append(signup);

        this.addErrorListeners();
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

        const phoneID = 'phone';
        const phone = document.getElementById(phoneID);
        if (phone) {
            phone.addEventListener('focusout',
                () => renderInput(phoneID, window.validator.validatePhone(phone.value))
            );
        }

        const passwordID = 'password';
        const password = document.getElementById(passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(passwordID, window.validator.validatePassword(password.value))
            );
        }

        const repeatPasswordID = 'repeatPassword';
        const repeatPassword = document.getElementById(repeatPasswordID);
        if (repeatPassword) {
            repeatPassword.addEventListener('focusout',
                () => renderInput(
                    repeatPasswordID,
                    window.validator.validateEqualPassword(
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
            emailError = window.validator.validateEmail(email.value).result;
        }

        const nameID = 'name';
        let nameError = false;
        const name = document.getElementById(nameID);
        if (name) {
            nameError = window.validator.validateName(name).result;
        }

        const phoneID = 'phone';
        let phoneError = false;
        const phone = document.getElementById(phoneID);
        if (phone) {
            phoneError = window.validator.validatePhone(phone.value).result;
        }

        const passwordID = 'password';
        let passwordError = false;
        const password = document.getElementById(passwordID);
        if (password) {
            passwordError = window.validator.validatePassword(password.value).result;
        }

        const repeatPasswordID = 'repeatPassword';
        let repeatPasswordError = false;
        const repeatPassword = document.getElementById(repeatPasswordID);
        if (repeatPassword) {
            repeatPasswordError = window.validator.validateEqualPassword(password.value, repeatPassword.value).result;
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
                    this.route('main');
                } else if (promise.status === 400) {
                    reject(promise);
                }
            };

            signupPost(email, password, name, phone)
                .then(resolve.bind(this))
                .catch(reject);
        }
    }
}
