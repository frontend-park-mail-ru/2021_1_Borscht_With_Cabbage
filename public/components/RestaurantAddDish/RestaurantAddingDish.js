import { noop } from "../../modules/utils.js";
import { RestaurantMainController } from "../../controllers/RestaurantMainController.js";
import { renderRestaurantAddingDish } from "./RestaurantAddingDishTmpl.js";
import eventBus from "../../modules/eventBus.js";
import AddingDishEvents from "../../events/AddingDish.js";
import { Validator } from "../../modules/validation.js";
import { renderInput } from "../../modules/rendering.js";

export class RestaurantAddingDish {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.nameID = 'name';
        this.descriptionID = 'description';
        this.priceID = 'price';
        this.weightID = 'weight';
        eventBus.on(AddingDishEvents.addingDishFailed, this.addingFailed.bind(this));
    }

    render () {
        this.root.innerHTML += renderRestaurantAddingDish({});

        this.addAddingDishEventListeners();
    }

    addAddingDishEventListeners () {
        const name = document.getElementById(this.nameID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(this.nameID, Validator.validateName(name.value))
            );
        }

        const description = document.getElementById(this.descriptionID);
        if (description) {
            description.addEventListener('focusout',
                () => renderInput(this.descriptionID, Validator.validateDescription(description.value))
            );
        }

        const price = document.getElementById(this.priceID);
        if (price) {
            price.addEventListener('focusout',
                () => renderInput(this.priceID, Validator.validateNumber(price.value))
            );
        }

        const weight = document.getElementById(this.weightID);
        if (weight) {
            weight.addEventListener('focusout',
                () => renderInput(this.weightID, Validator.validateNumber(weight.value))
            );
        }

        const formID = 'adding-dish-form';
        const form = document.getElementById(formID);
        if (form) {
            form.addEventListener('submit', this.formSubmit.bind(this));
        }
    }

    formSubmit (event) {
        event.preventDefault()
        const errors = this.controller.addDish({
            name: document.getElementById(this.nameID).value,
            description: document.getElementById(this.descriptionID).value,
            price: document.getElementById(this.priceID).value,
            weight: document.getElementById(this.weightID).value
        })
        if (errors.error === true) {
            renderInput(this.nameID, errors.nameError)
            renderInput(this.descriptionID, errors.descriptionError)
            renderInput(this.priceID, errors.priceError)
            renderInput(this.weightID, errors.weightError)
        } else {
            // TODO: обратная связь что грузится и все хорошо
        }
    }

    addingFailed (error) {
        const serverError = document.getElementById('serverError');
        serverError.hidden = false;
        serverError.textContent = error;
    }
}
