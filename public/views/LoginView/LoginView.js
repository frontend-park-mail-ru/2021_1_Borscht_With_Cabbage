import { NavBar } from '../../components/NavBar/NavBar.js';
import { renderLoginView } from './loginTemplate.js';
import { renderInput } from '../../modules/rendering.js';
import { loginPost } from '../../modules/api.js';

export class LoginView {
    constructor (root, route) {
        this.route = route;
        this.root = root;
    }

    render () {
        this.root.innerHTML = '';
        this.navbar = new NavBar(this.root);

        const login = document.createElement('div');

        login.innerHTML = renderLoginView({});
        this.root.append(login);

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

        const passwordID = 'password';
        const password = document.getElementById(passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(passwordID, window.validator.validatePassword(password.value))
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
        const emailID = 'email';
        let emailError = false;
        const email = document.getElementById(emailID);
        if (email) {
            emailError = window.validator.validateEmail(email.value).result;
        }

        const passwordID = 'password';
        let passwordError = false;
        const password = document.getElementById(passwordID);
        if (password) {
            passwordError = window.validator.validatePassword(password.value).result;
        }

        return emailError * passwordError;
    }

    loginRequest () {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        if (emailInput && passwordInput) {
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

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

            loginPost(email, password)
                .then(resolve.bind(this))
                .catch(reject);
        }
    }
}
