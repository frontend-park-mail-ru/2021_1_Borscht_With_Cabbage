import { Validator } from '../../modules/validation.js';
import { navbar } from '../../components/NavBar/NavBar.js';
import { renderLoginView } from './loginTemplate.js';
import { renderInput } from '../../modules/rendering.js';
import { ajaxPost } from '../../modules/http.js';
import { auth } from '../../modules/auth.js';

export class LoginView {
    constructor (root, router) {
        this.router = router;
        this.root = root;
        this.validator = new Validator();
        this.render = this.render.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }

    render () {
        this.root.innerHTML = '';
        navbar(this.root);

        const login = document.createElement('div');

        login.innerHTML = renderLoginView({});
        this.root.append(login);

        this.addErrorListeners();
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

        const formID = 'auth-form';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit);
    }

    formSubmit (event) {
        event.preventDefault();
        if (this.updateErrorsState()) {
            this.loginRequest();
        }
    }

    updateErrorsState () {
        return this.validator.validateEmail().result *
            this.validator.validatePassword().result;
    }

    loginRequest () {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        const reject = function (promise) {
            const error = document.getElementById('error');
            error.hidden = false;
            error.textContent = promise.parsedJSON.result;
        };

        const resolve = function (promise) {
            if (promise.status === 200) {
                this.router.open('/');
            } else if (promise.status === 400) {
                reject(promise);
            }
        };

        ajaxPost({
            url: '/login',
            body: { email, password }
        })
            .then(resolve.bind(this))
            .then(_ => auth())
            .catch(reject);
    }
}
