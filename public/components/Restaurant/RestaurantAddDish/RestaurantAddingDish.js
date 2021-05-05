import './RestaurantAddingDish.less';
import { getError, noop } from '../../../modules/utils.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import renderRestaurantAddingDish from './RestaurantAddingDishTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { DishEvents } from '../../../events/DishEvents.js';
import { Validator } from '../../../modules/validation.js';
import { renderInput } from '../../../modules/rendering.js';
import { Preview } from '../../Preview/Preview.js';
import { DishModel } from '../../../modules/dish.js';

export class RestaurantAddingDish {
    constructor ({
        goTo = noop,
        controller = new RestaurantMainController(),
    } = {}) {
        this.goTo = goTo;
        this.controller = controller;
        this.nameID = 'name';
        this.descriptionID = 'description';
        this.priceID = 'price';
        this.weightID = 'weight';
        eventBus.on(DishEvents.updateDishDataSuccess, this.closeItem.bind(this));
        eventBus.on(DishEvents.updateDishImageSuccess, this.closeItem.bind(this));
    }

    render ({
        root = document.body,
        dish
    } = {}) {
        this.root = root;
        this.dish = dish;
        let buttonName = 'Добавить блюдо';
        if (this.dish?.id) {
            buttonName = 'Обновить блюдо';
        }
        this.root.innerHTML += renderRestaurantAddingDish({
            buttonName,
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

    addCloseAddingEventListeners () {
        const close = this.root.querySelector('.adding-dish');
        if (!close) {
            return;
        }

        close.addEventListener('click', e => {
            if (e.target === close) {
                this.closeItem();
            }
        });
    }

    closeItem () {
        this.controller.closeAddingDish();
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

        let dish = {};
        dish.name = document.getElementById(this.nameID).value;
        dish.description = document.getElementById(this.descriptionID).value;
        dish.price = document.getElementById(this.priceID).value;
        dish.weight = document.getElementById(this.weightID).value;
        dish.image = this.preview.getFile();

        let errors;
        if (this.dish?.id) {
            console.log('update', this.dish);
            dish.id = this.dish.id;
            errors = this.dish.updateDish({ dish: dish });
        } else {
            dish.section = this.dish.section;
            errors = this.controller.addDish(dish);
        }
        // errors = this.dish.updateDish(dish);

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
        serverError.textContent = getError(error);
    }
}
