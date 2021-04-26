import { getError, noop } from '../../../modules/utils.js';
import { RestaurantSignUpController } from "../../../controllers/RestaurantSignUpController.js";
import renderRestaurantSignUp from "./RestaurantSignUpTmpl.hbs"; // todo
import { renderInput } from "../../../modules/rendering.js"; // todo
import { Validator } from "../../../modules/validation.js";
import { maskPhone } from "../../../modules/phoneMask.js";
import { YandexMap } from '../../../modules/yandexMap.js';

export class RestaurantSignUp {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantSignUpController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.emailID = 'email';
        this.titleID = 'title';
        this.phoneID = 'number';
        this.passwordID = 'password';
        this.radiusID = 'radius';
        this.repeatPasswordID = 'repeatPassword';
        this.setCoords = this.setCoords.bind(this);
    }

    setCoords (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    render () {
        this.root.innerHTML += renderRestaurantSignUp({});

        this.yaMap = new YandexMap();
        this.yaMap.render({ id: 'js__map-signup', isStatic: false }, (address, isRenew) => {
            if (isRenew) {
                document.getElementById('js__map-signup-address').value = address.name;
            }
            this.setCoords(address.latitude, address.longitude);
        });
        this.yaMap.addSearch('js__map-signup-address');

        this.addSignUpEventListeners();
    }

    addSignUpEventListeners () {
        const email = document.getElementById(this.emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(this.emailID, Validator.validateEmail(email.value))
            );
        }

        // const name = document.getElementById(this.titleID); // todo
        // if (name) {
        //     name.addEventListener('focusout',
        //         () => renderInput(this.titleID, Validator.validateName(name.value))
        //     );
        // }

        const number = document.getElementById(this.phoneID);
        if (number) {
            number.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validatePhone(number.value))
            );
            maskPhone(number);
        }

        const radius = document.getElementById(this.radiusID);
        if (radius) {
            radius.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validateNumber(radius.value))
            );
            radius.addEventListener('input', () => {
                this.yaMap.changeRadius(radius.value);
            });
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
    }

    formSubmit (event) {
        event.preventDefault()
        const errors = this.controller.signUp({
            email: document.getElementById(this.emailID).value,
            password: document.getElementById(this.passwordID).value,
            title: document.getElementById(this.titleID).value,
            number: document.getElementById(this.phoneID).value.replace(/\D/g, ''),
            repeatPassword: document.getElementById(this.repeatPasswordID).value,
            address: {
                name: document.getElementById('js__map-signup-address').value,
                latitude: String(this.latitude),
                longitude: String(this.longitude),
                radius: Math.round(Number(document.getElementById(this.radiusID).value))
            }
        })
        if (errors.error === true) {
            renderInput(this.emailID, errors.emailError)
            renderInput(this.passwordID, errors.passwordError)
            renderInput(this.titleID, errors.titleError)
            renderInput(this.phoneID, errors.phoneError)
            renderInput(this.repeatPasswordID, errors.repeatPasswordError)
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
