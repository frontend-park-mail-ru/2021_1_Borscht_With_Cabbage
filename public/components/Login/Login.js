import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import { loginPost } from '../../modules/api.js';
import { renderLogin } from './LoginTmpl.js';

export class Login {
    constructor ({
        root = document.body,
        goTo = null
    }) {
        this.root = root;
        this.goTo = goTo;
    }

    render () {
        this.root.innerHTML += renderLogin({});

        this.addLoginEventListeners();
    }

    addLoginEventListeners () {
        const loginID = 'login';
        const login = document.getElementById(loginID);
        if (login) {
            login.addEventListener('focusout',
                () => renderInput(loginID, Validator.validateEmail(login.value))
            );
        }

        const passwordID = 'password';
        const password = document.getElementById(passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(passwordID, Validator.validatePassword(password.value))
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
            this.loginRequest();
        }
    }

    updateErrorsState () {
        const loginID = 'login';
        let loginError = false;
        const login = document.getElementById(loginID);
        if (login) {
            loginError = Validator.validateEmail(login.value).result;
        }

        const passwordID = 'password';
        let passwordError = false;
        const password = document.getElementById(passwordID);
        if (password) {
            passwordError = Validator.validatePassword(password.value).result;
        }

        return loginError * passwordError;
    }

    loginRequest () {
        const loginInput = document.getElementById('login');
        const passwordInput = document.getElementById('password');

        if (loginInput && passwordInput) {
            const login = loginInput.value.trim();
            const password = passwordInput.value.trim();

            const reject = function (promise) {
                const error = document.getElementById('serverError');
                error.hidden = false;
                error.textContent = promise.parsedJSON.result;
            };

            const resolve = function (promise) {
                console.log(promise)
                if (promise.status === 200) {
                    this.goTo('main');
                } else if (promise.status === 400) {
                    reject(promise);
                }
            };

            loginPost({
                login: login,
                password: password
            })
                .then(resolve.bind(this))
                .catch(reject);
        }
    }
}