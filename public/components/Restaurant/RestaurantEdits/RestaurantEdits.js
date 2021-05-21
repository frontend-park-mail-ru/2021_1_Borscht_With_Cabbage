import { RestaurantMainController } from 'Controllers/RestaurantMainController.js';
import eventBus from '../../../modules/eventBus.js';
import renderRestaurantEdits from './RestaurantEditsTmpl.hbs';
import { Preview } from '../../Preview/Preview.js';
import { renderInput } from 'Modules/rendering.js';
import { AuthEvents } from 'Events/AuthEvents.js';
import { Validator } from 'Modules/validation.js';
import { maskPhone } from 'Modules/phoneMask.js';
import { getError, noop } from 'Modules/utils.js';
import user from '../../../modules/user.js';
import { YandexMap } from 'Modules/yandexMap.js';
import { RestaurantEvents } from 'Events/RestaurantEvents.js';
import { Categories } from 'Components/Restaurant/RestaurantEdits/Categories/Categories.js';

export class RestaurantEdits {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;

        this.emailID = 'email';
        this.titleID = 'title';
        this.phoneID = 'number';
        this.deliveryCostID = 'deliveryCost';
        this.currentPasswordID = 'password_current';
        this.newPasswordID = 'password';
        this.repeatPasswordID = 'password_repeat';
        this.radiusID = 'radius';
        this.controller = controller;
        eventBus.on(RestaurantEvents.restaurantSetUserDataSuccess, this.updateInputs.bind(this));
        eventBus.on(RestaurantEvents.restaurantSetUserDataFailed, this.changeFailed.bind(this));
        this.setCoords = this.setCoords.bind(this);
    }

    setCoords (latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    render () {
        this.root = document.getElementById('restaurant-left-block');
        this.root.innerHTML = renderRestaurantEdits({ user });
        this.avatarInput = this.root.querySelector('#input-avatar');
        this.avatarButton = this.root.querySelector('#input-avatar-button');

        this.preview = new Preview({
            root: this.root,
            input: this.avatarInput,
            button: this.avatarButton
        });

        this.yaMap = new YandexMap();
        this.yaMap.render({ id: 'js__map-edit', isStatic: false }, (address, isRenew) => {
            if (isRenew) {
                document.getElementById('js__map-edit-address').value = address.name;
            }
            this.setCoords(address.latitude, address.longitude);
        });
        this.yaMap.addSearch('js__map-edit-address');

        this.addErrorListeners();
        this.addSubmitListener();

        this.categories = new Categories();
        this.categories.render(this.root.querySelector('#categoriesPlace'));
    }

    addSubmitListener () {
        const formID = 'restaurant-userdata';
        const form = document.getElementById(formID);
        form.addEventListener('submit', this.formSubmit.bind(this));
    }

    formSubmit (event) {
        event.preventDefault()

        this.controller.setRestaurantData({
            email: document.getElementById(this.emailID).value,
            title: document.getElementById(this.titleID).value,
            phone: document.getElementById(this.phoneID).value.replace(/\D/g, ''),
            deliveryCost: document.getElementById(this.deliveryCostID).value,
            currentPassword: document.getElementById(this.currentPasswordID).value,
            newPassword: document.getElementById(this.newPasswordID).value,
            repeatPassword: document.getElementById(this.repeatPasswordID).value,
            avatar: this.preview.getFile(),
            address: {
                name: document.getElementById('js__map-edit-address').value,
                latitude: String(this.latitude),
                longitude: String(this.longitude),
                radius: Math.round(Number(document.getElementById(this.radiusID).value))
            }
        });
    }

    changeFailed (error) {
        const serverError = document.getElementById('serverError');
        serverError.hidden = false;
        serverError.textContent = getError(error);
    }

    updateInputs ({ info, status }) {
        if (status === 200) {
            document.getElementById(this.emailID).value = info.email;
            document.getElementById(this.titleID).value = info.title;
            document.getElementById(this.phoneID).value = info.number;
            document.getElementById(this.phoneID).focus();
            if (info.avatar) {
                this.preview.deletePreview();
            } else {
                info.avatar = user.avatar;
            }
            eventBus.emit(AuthEvents.userSignIn, info)
        }
    }

    addErrorListeners () {
        const email = document.getElementById(this.emailID);
        if (email) {
            email.addEventListener('focusout',
                () => renderInput(this.emailID, Validator.validateEmail(email.value))
            );
        }

        const name = document.getElementById(this.titleID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(this.titleID, Validator.validateName(name.value))
            );
        }

        const phone = document.getElementById(this.phoneID);
        if (phone) {
            phone.addEventListener('focusout',
                () => renderInput(this.phoneID, Validator.validatePhone(phone.value.replace(/\D/g, '')))
            );
        }

        const deliveryCost = document.getElementById(this.deliveryCostID);
        if (deliveryCost) {
            deliveryCost.addEventListener('focusout',
                () => renderInput(this.deliveryCostID, Validator.validateRealNumber(deliveryCost.value))
            );
        }

        const newPassword = document.getElementById(this.newPasswordID);
        if (newPassword) {
            newPassword.addEventListener('focusout',
                () => renderInput(
                    this.newPasswordID,
                    Validator.validateChangeNewPassword(newPassword.value)
                )
            );
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

        const currentPassword = document.getElementById(this.currentPasswordID);
        if (currentPassword) {
            currentPassword.addEventListener('focusout',
                () => renderInput(
                    this.currentPasswordID,
                    Validator.validateChangeOldPassword(currentPassword.value, newPassword.value)
                )
            );
        }

        const repeatPassword = document.getElementById(this.repeatPasswordID);
        if (repeatPassword) {
            repeatPassword.addEventListener('focusout',
                () => renderInput(
                    this.repeatPasswordID,
                    Validator.validateChangePasswordRepeat(newPassword.value, repeatPassword.value)
                )
            );
        }

        maskPhone(phone);
        phone.focus();

        this.preview.setPreview();
    }

    renderErrors (errors) {
        if (errors.error) {
            renderInput(this.emailID, errors.emailError);
            renderInput(this.titleID, errors.titleError);
            renderInput(this.phoneID, errors.phoneError);
            renderInput(this.currentPasswordID, errors.currentPasswordError);
            renderInput(this.newPasswordID, errors.newPasswordError);
            renderInput(this.repeatPasswordID, errors.repeatPasswordError);
            renderInput(this.radiusID, errors.radiusError);
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
