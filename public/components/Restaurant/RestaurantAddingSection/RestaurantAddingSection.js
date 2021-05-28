import './RestaurantAddingSection.less';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import renderRestaurantAddingSection from './RestaurantAddingSectionTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { SectionEvents } from '../../../events/SectionEvents.js';
import { Validator } from '../../../modules/validation.js';
import { renderInput } from '../../../modules/rendering.js';
import { getError } from '../../../modules/utils.js';
import { SectionModel } from '../../../modules/section.js';

export class RestaurantAddingSection {
    constructor ({
        controller = new RestaurantMainController(),
    } = {}) {
        this.controller = controller;
        this.nameID = 'name';
        
        eventBus.on(SectionEvents.updateSectionSuccess, this.closeItem.bind(this));
    }

    render ({ root = document.body, section = null } = {}) {
        this.root = root;
        this.section = section;
        let buttonName = 'Добавить';
        if (this.section) {
            buttonName = 'Обновить';
        }
        this.root.innerHTML += renderRestaurantAddingSection({
            buttonName: buttonName,
            section: this.section
        });

        this.addAddingSectionEventListeners();
        this.addCloseAddingEventListeners();
    }

    addCloseAddingEventListeners () {
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
        // console.log('close');
        this.controller.closeAddingSection();
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

        let name = document.getElementById(this.nameID).value;

        let errors;
        if (this.section) {
            // console.log('update');
            errors = this.section.updateSection({ name });
        } else {
            errors = this.controller.addSection({ name });
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
