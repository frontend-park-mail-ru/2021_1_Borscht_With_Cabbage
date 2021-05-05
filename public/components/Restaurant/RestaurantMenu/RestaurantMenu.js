import './RestaurantMenu.less';
import eventBus from 'Modules/eventBus.js';
import { noop } from 'Modules/utils.js';
import { RestaurantMainController } from 'Controllers/RestaurantMainController.js';
import renderRestaurantMenu from './RestaurantMenuTmpl.hbs';
import { DishEvents } from 'Events/DishEvents.js';
import { SectionEvents } from 'Events/SectionEvents.js'
import { SectionComponent } from '../Section/Section.js';
import { MenuModel } from '../../../modules/menu.js';

export class RestaurantMenuComponent {
    constructor ({
        goTo = noop,
        controller = new RestaurantMainController({ root, goTo }),
        menu = new MenuModel()
    } = {}) {
        this.goTo = goTo;
        this.controller = controller;
        this.menu = menu;

        this.sections = [];
        this.menu.sections.forEach(section => {
            this.appendSection(section);
        });
        eventBus.on(SectionEvents.deleteSection, this.deleteSection.bind(this));
    }

    render ({ root = document.body }) {
        this.root = root;
        console.log('menu render -> ');
        // this.root = document.getElementById('restaurant-left-block');
        this.root.innerHTML = renderRestaurantMenu({});

        const content = this.root.querySelector('.menu-container__content');
        if (!content) {
            return;
        }
        content.innerHTML = '';

        this.sections.forEach(section => {
            console.log('menu render -> ', section);
            section.render({ root: content });
        });

        this.addAddSectionEventListeners();
    }

    appendSection({ section }) {
        console.log('appendSection -> ', section);
        const sectionComponent = new SectionComponent({
            section: section,
            controller: this.controller
        });
        this.sections.push(sectionComponent);
    }

    deleteSection({ id }) {
        this.sections.forEach((section, index) => {
            if (section.section.id === id) {
                console.log('removeSection -> ', section, index);
                this.sections.splice(index, 1);
            }
        });
    }

    addAddSectionEventListeners () {
        const addSection = this.root.querySelector('.menu-container__btn');
        if (!addSection) {
            return;
        }

        addSection.addEventListener('click', e => {
            e.preventDefault();

            this.controller.editSection();
        });
    }

    appendDish({ dish }) {
        for (let i = 0; i < this.sections.length; i++) {
            console.log(this.sections[i].section.id, dish.section);
            if (this.sections[i].section.id === dish.section) {
                this.sections[i].appendDish({ dish });
            }
        }
    }
}
