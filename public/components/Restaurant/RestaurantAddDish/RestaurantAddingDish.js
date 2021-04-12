import { noop } from "../../../modules/utils.js";
import { RestaurantMainController } from "../../../controllers/RestaurantMainController.js";
import renderRestaurantAddingDish from "./RestaurantAddingDishTmpl.hbs";
import eventBus from "../../../modules/eventBus.js";
import { DishEvents } from "../../../events/DishEvents.js";
import { Validator } from "../../../modules/validation.js";
import { renderInput } from "../../../modules/rendering.js";
import { Preview } from '../../Preview/Preview.js'

export class RestaurantAddingDish {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController(),
        dish
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        this.dish = dish;
        this.nameID = 'name';
        this.descriptionID = 'description';
        this.priceID = 'price';
        this.weightID = 'weight';
        eventBus.on(DishEvents.addingDishFailed, this.addingFailed.bind(this));
        eventBus.on(DishEvents.updateDishFailed, this.addingFailed.bind(this));
    }

    render () {
        let buttonName = 'Добавить блюдо';
        if (this.dish) {
            buttonName = 'Обновить блюдо';
        }
        this.root.innerHTML += renderRestaurantAddingDish({
            buttonName: buttonName,
            dish: this.dish
        });

        this.imageInput = this.root.querySelector('#input-avatar');
        this.imageButton = this.root.querySelector('#input-avatar-button');

        this.preview = new Preview({
            root: this.root,
            input: this.imageInput,
            button: this.imageButton
        });
        this.preview.setPreview();

        this.addAddingDishEventListeners();
        this.addCloseAddingEventListeners();
    }

    addCloseAddingEventListeners() {
        const close = this.root.querySelector('.adding-dish');
        if (!close) {
            return;
        }

        close.addEventListener('click', e => {
            if (e.target === close) {
                eventBus.emit(DishEvents.closeAddingDishComponent, {});
            }
        })
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
        event.preventDefault();

        if (!this.dish) {
            this.dish = {};
        }
        this.dish.name = document.getElementById(this.nameID).value;
        this.dish.description = document.getElementById(this.descriptionID).value;
        this.dish.price = document.getElementById(this.priceID).value;
        this.dish.weight = document.getElementById(this.weightID).value;
        this.dish.image = this.preview.getFile();

        let errors;
        if (this.dish.id) {
            errors = this.controller.updateDish(this.dish);
        } else {
            errors = this.controller.addDish(this.dish);
        }

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
