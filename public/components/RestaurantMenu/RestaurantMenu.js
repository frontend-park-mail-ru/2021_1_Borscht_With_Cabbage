import eventBus from '../../modules/eventBus.js';
import { noop } from '../../modules/utils.js';
import { RestaurantMainController } from "../../controllers/RestaurantMainController.js";
import { renderRestaurantMenu } from "./RestaurantMenuTmpl.js";

export class RestaurantMenu {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller
    }

    render () {
        console.log('restaurant menu');
        this.root.innerHTML = renderRestaurantMenu({});

        // this.addLoginEventListeners();
    }

    // addLoginEventListeners () {
    //     const login = document.getElementById(this.loginID);
    //     if (login) {
    //         login.addEventListener('focusout',
    //             () => renderInput(this.loginID, Validator.validateEmail(login.value))
    //         );
    //     }

    //     const password = document.getElementById(this.passwordID);
    //     if (password) {
    //         password.addEventListener('focusout',
    //             () => renderInput(this.passwordID, Validator.validatePassword(password.value))
    //         );
    //     }

    //     const formID = 'authorization-form';
    //     const form = document.getElementById(formID);
    //     if (form) {
    //         form.addEventListener('submit', this.formSubmit.bind(this));
    //     }

    //     const regID = 'js_toLogin';
    //     const reg = document.getElementById(regID);
    //     if (reg) {
    //         reg.onclick = () => {
    //             this.goTo('login')
    //         }
    //     }
    // }

    // formSubmit (event) {
    //     event.preventDefault()
    //     const errors = this.controller.signIn(document.getElementById(this.loginID).value,
    //         document.getElementById(this.passwordID).value)
    //     if (errors.error === true) {
    //         renderInput(this.loginID, errors.loginError)
    //         renderInput(this.passwordID, errors.passwordError)
    //     } else {
    //         // TODO обратная связь что грузится и все хорошо
    //     }
    // }

    // loginFailed (error) {
    //     const serverError = document.getElementById('serverError')
    //     serverError.hidden = false
    //     serverError.textContent = error
    // }

    // loginSuccess () {
    //     this.goTo('restaurantMain')
    // }
}
