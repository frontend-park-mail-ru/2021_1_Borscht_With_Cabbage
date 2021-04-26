import './RestaurantAddingSection.less';
import { RestaurantMainController } from "../../../controllers/RestaurantMainController.js";
import renderRestaurantAddingSection from "./RestaurantAddingSectionTmpl.hbs";
import eventBus from "../../../modules/eventBus.js";
import { SectionEvents } from "../../../events/SectionEvents.js";
import { Validator } from "../../../modules/validation.js";
import { renderInput } from "../../../modules/rendering.js";
import { getError } from '../../../modules/utils.js';

export class RestaurantAddingSection {
    constructor ({
        root = document.body,
        controller = new RestaurantMainController(),
        section
    } = {}) {
        this.root = root;
        this.controller = controller;
        this.section = section;
        this.nameID = 'name';
        
        eventBus.on(SectionEvents.updateSectionSuccess, this.closeItem.bind(this));
    }

    render () {
        let buttonName = 'Добавить';
        if (this.section && this.section.id) {
            buttonName = 'Обновить';
        }
        this.root.innerHTML += renderRestaurantAddingSection({
            buttonName: buttonName,
            section: this.section
        });

        this.addAddingSectionEventListeners();
        this.addCloseAddingEventListeners();
    }

    addCloseAddingEventListeners() {
        const closeBackground = this.root.querySelector('.adding-section');
        if (closeBackground) {
            closeBackground.addEventListener('click', e => {
                if (e.target === closeBackground) {
                    this.closeItem();
                }
            })
        }

        const closeButton1 = this.root.querySelector('.btn-close');
        if (closeButton1) {
            closeButton1.addEventListener('click', e => {
                this.closeItem();
            })
        }

        const closeButton2 = this.root.querySelector('.adding-section__icone-close');
        if (closeButton2) {
            closeButton2.addEventListener('click', e => {
                this.closeItem();
            })
        }
    }

    closeItem () {
        console.log('close');
        eventBus.emit(SectionEvents.closeAddingSectionComponent, {});
    }

    addAddingSectionEventListeners () {
        const name = document.getElementById(this.nameID);
        if (name) {
            name.addEventListener('focusout',
                () => renderInput(this.nameID, Validator.validateName(name.value))
            );
        }

        const formID = 'adding-section-form';
        const form = document.getElementById(formID);
        if (form) {
            form.addEventListener('submit', this.formSubmit.bind(this));
        }
    }

    formSubmit (event) {
        event.preventDefault();

        if (!this.section) {
            this.section = {};
        }
        this.section.name = document.getElementById(this.nameID).value;

        let errors;
        if (this.section.id) {
            console.log('update');
            errors = this.controller.updateSection(this.section);
        } else {
            errors = this.controller.addSection(this.section);
        }

        if (errors.error === true) {
            renderInput(this.nameID, errors.nameError)
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
