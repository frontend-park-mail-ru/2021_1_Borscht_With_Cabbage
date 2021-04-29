import eventBus from '../../../modules/eventBus.js';
import { noop } from '../../../modules/utils.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import renderRestaurantMenu from './RestaurantMenuTmpl.hbs';
import { DishEvents } from '../../../events/DishEvents.js';
import { SectionEvents } from '../../../events/SectionEvents.js'
import { SectionComponent } from '../Section/Section.js';
import { RestaurantAddingSection } from '../RestaurantAddingSection/RestaurantAddingSection.js'

export class RestaurantMenuComponent {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.goTo = goTo;
        this.controller = controller;
        eventBus.on(DishEvents.getAllDishSuccess, this.appendSections.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.dishLoadingError.bind(this));
        eventBus.on(SectionEvents.addingSectionSuccess, this.addingSuccess.bind(this));
        eventBus.on(SectionEvents.closeAddingSectionComponent, this.closeAddingSectionComponent.bind(this));
        eventBus.on(SectionEvents.updateSection, this.updateSection.bind(this));
        eventBus.on(SectionEvents.deleteSectionSuccess, this.deleteSection.bind(this));
    }

    render () {
        this.root.innerHTML = renderRestaurantMenu({});

        this.addAddSectionEventListeners();
        this.controller.getDishes();
    }

    addingSuccess (section) {
        this.closeAddingSectionComponent();
        this.appendSection(section);
    }

    closeAddingSectionComponent () {
        console.log(this.addingSectionItem);
        this.addingSectionItem.remove();
    }

    dishLoadingError (error) {
        // TODO: показать пользователю ошибку
    }

    appendSections (sections) {
        const content = this.root.querySelector('.menu-container__content');
        if (!content) {
            return;
        }

        content.innerHTML = ''

        console.log(sections.length);
        sections.forEach(section => {
            console.log('section', section);
            this.appendSection(section);
        });
    }

    appendSection (section) {
        const content = this.root.querySelector('.menu-container__content');
        if (!content) {
            return;
        }

        const sectionItem = new SectionComponent({ root: content, section: section, controller: this.controller });
        sectionItem.render();
    }

    addAddSectionEventListeners () {
        const addSection = this.root.querySelector('.menu-container__btn');
        if (!addSection) {
            return;
        }

        addSection.addEventListener('click', e => {
            e.preventDefault();

            this.addingSectionItem = document.createElement('div');
            this.root.append(this.addingSectionItem);

            const addingSection = new RestaurantAddingSection({
                root: this.addingSectionItem,
                controller: this.controller
            });
            addingSection.render();
        });
    }

    updateSection (section) {
        console.log(section);
        this.addingSectionItem = document.createElement('div');
        this.root.querySelector(`[data-section-id="${section.id}"]`)
            .insertAdjacentElement('afterbegin', this.addingSectionItem);

        const addingSection = new RestaurantAddingSection({
            root: this.addingSectionItem,
            controller: this.controller,
            section: section
        });
        addingSection.render();
    }

    deleteSection ({ id }) {
        console.log('deleteSectionSuccess', id);
        const deleteItem = this.root.querySelector(`[data-section-id="${id}"]`);
        console.log('deleteItem', deleteItem);
        deleteItem.remove();
    }
}
