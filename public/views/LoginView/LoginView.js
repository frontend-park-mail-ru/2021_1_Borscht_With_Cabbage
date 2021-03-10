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
        const loginID = 'login';
        const login = document.getElementById(loginID);
        if (login) {
            login.addEventListener('focusout',
                () => renderInput(loginID, window.validator.validateLogin(login.value))
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
        const loginID = 'login';
        let loginError = false;
        const login = document.getElementById(loginID);
        if (login) {
            loginError = window.validator.validateLogin(login.value).result;
        }

        const passwordID = 'password';
        let passwordError = false;
        const password = document.getElementById(passwordID);
        if (password) {
            passwordError = window.validator.validatePassword(password.value).result;
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
                if (promise.status === 200) {
                    this.route('main');
                } else if (promise.status === 400) {
                    reject(promise);
                }
            };

            loginPost(login, password)
                .then(resolve.bind(this))
                .catch(reject);
        }
    }
}
