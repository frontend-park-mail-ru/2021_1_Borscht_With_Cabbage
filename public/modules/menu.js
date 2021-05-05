import mainModel from '../models/RestaurantMainModel.js';
import { SectionEvents } from '../events/SectionEvents.js';
import eventBus from './eventBus.js';
import { SectionModel } from './section.js';

export class MenuModel {
    constructor ({ sections = [] } = {}) {
        sections.forEach(section => {
            this.addSection(section);
        });
        this.sections = sections;

        eventBus.on(SectionEvents.deleteSectionSuccess, this.deleteSection.bind(this));
    }

    addSection (section) {
        const sectionItem = new SectionModel(section);
        this.sections.push(sectionItem);
        return sectionItem;
    }

    deleteSection ({ id }) {
        this.sections.forEach((section, index) => {
            console.log(section);
            if (section.id === id) {
                console.log('deleteSection -> ', id);
                eventBus.emit(SectionEvents.deleteSection, { id });

                this.sections.splice(index, 1);
                // delete section;
            }
        });
    }

    addDish (dish) {
        let result;
        for (let i = 0; i < this.sections.length; i++) {
            if (this.sections[i].id === dish.section) {
                result = this.sections[i].addDish(dish);
            }
        }

        return result;
    }

    deleteDish ({ id }) {
        this.sections.forEach(section => {
            section.deleteDish({ id: id });
        })
    }
    
    deleteAll () {
        this.sections = [];
    }
}