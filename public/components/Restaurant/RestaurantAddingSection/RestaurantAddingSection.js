import { RestaurantMainController } from "../../../controllers/RestaurantMainController.js";
import { renderRestaurantAddingSection } from "./RestaurantAddingSectionTmpl.js";
import eventBus from "../../../modules/eventBus.js";
import { SectionEvents } from "../../../events/SectionEvents.js";
import { Validator } from "../../../modules/validation.js";
import { renderInput } from "../../../modules/rendering.js";

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
        let buttonName = 'Добавить раздел';
        if (this.section && this.section.id) {
            buttonName = 'Обновить раздел';
        }
        this.root.innerHTML += renderRestaurantAddingSection({
            buttonName: buttonName,
            section: this.section
        });

        this.addAddingSectionEventListeners();
        this.addCloseAddingEventListeners();
    }

    addCloseAddingEventListeners() {
        const close = this.root.querySelector('.adding-section');
        if (!close) {
            return;
        }

        close.addEventListener('click', e => {
            if (e.target === close) {
                this.closeItem();
            }
        })
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
        serverError.textContent = error;
    }
}
