import './Authorization.less';
import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import renderLogin from './SignInTmpl.hbs';
import { getError, noop } from '../../modules/utils.js';
import { SignInController } from '../../controllers/SignInController.js';

export class SignIn {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new SignInController({ root, goTo })
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.loginID = 'login';
        this.passwordID = 'password';
    }

    render () {
        this.root.innerHTML += renderLogin({});

        this.addLoginEventListeners();
    }

    addLoginEventListeners () {
        const login = document.getElementById(this.loginID);
        if (login) {
            login.addEventListener('focusout',
                () => renderInput(this.loginID, Validator.validateEmail(login.value))
            );
        }

        const password = document.getElementById(this.passwordID);
        if (password) {
            password.addEventListener('focusout',
                () => renderInput(this.passwordID, Validator.validatePassword(password.value))
            );
        }

        const formID = 'authorization-form';
        const form = document.getElementById(formID);
        if (form) {
            form.addEventListener('submit', this.formSubmit.bind(this));
        }
    }

    formSubmit (event) {
        event.preventDefault();
        const errors = this.controller.signIn(
            document.getElementById(this.loginID).value,
            document.getElementById(this.passwordID).value);
        if (errors.error) {
            renderInput(this.loginID, errors.loginError);
            renderInput(this.passwordID, errors.passwordError);
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
