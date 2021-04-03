import { renderInput } from '../../modules/rendering.js';
import { Validator } from '../../modules/validation.js';
import eventBus from '../../modules/eventBus.js';
import { noop } from '../../modules/utils.js';
import { RestaurantSignInController } from "../../controllers/RestaurantSignInController.js";
import SignInEvents from '../../events/SignInEvents.js';
import { renderRestaurantLogin } from "./RestaurantSignInTmpl.js";

export class RestaurantSignIn {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantSignInController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller
        this.loginID = 'login'
        this.passwordID = 'password'
        eventBus.on(SignInEvents.userSignInSuccess, this.loginSuccess.bind(this))
        eventBus.on(SignInEvents.userSignInFailed, this.loginFailed.bind(this))
    }

    render () {
        this.root.innerHTML += renderRestaurantLogin({});

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

        const regID = 'js_toLogin';
        const reg = document.getElementById(regID);
        if (reg) {
            reg.onclick = () => {
                this.goTo('login')
            }
        }
    }

    formSubmit (event) {
        event.preventDefault()
        const errors = this.controller.signIn(document.getElementById(this.loginID).value,
            document.getElementById(this.passwordID).value)
        if (errors.error === true) {
            renderInput(this.loginID, errors.loginError)
            renderInput(this.passwordID, errors.passwordError)
        } else {
            // TODO обратная связь что грузится и все хорошо
        }
    }

    loginFailed (error) {
        const serverError = document.getElementById('serverError')
        serverError.hidden = false
        serverError.textContent = error
    }

    loginSuccess () {
        this.goTo('restaurantMain')
    }
}