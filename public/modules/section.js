import mainModel from '../models/RestaurantMainModel.js';
import { DishModel } from './dish.js';
import { Validator } from './validation.js';
import { SectionEvents } from '../events/SectionEvents.js';
import eventBus from './eventBus.js';

export class SectionModel {
    constructor({
        id,
        name,
        dishes = []
    } = {}) {
        this.dishes = [];
        this.id = id;
        this.name = name;
        if (dishes != null) {
            dishes.forEach(dish => {
                this.addDish(dish);
            })
        }

        eventBus.on(SectionEvents.updateSectionSuccess + this.id, this.updateSectionSuccess.bind(this));
    }

    addDish (dish) {
        const dishItem = new DishModel(dish);
        this.dishes.push(dishItem);
        // console.log('Adding dish', dishItem);
        return dishItem;
    }

    updateSection ({ name }) {
        const nameError = Validator.validateName(name);
        if (nameError.result) {
            mainModel.updateSection({ id: this.id, name: name });
            return {
                error: false
            }
        } else {
            return {
                error: true,
                nameError
            }
        }
    }

    updateSectionSuccess ({ name }) {
        if (name) {
            this.name = name;
            eventBus.emit(SectionEvents.updateSection + this.id);
        }
    }

    deleteDish ({ id }) {
        for(let i = 0; i < this.dishes.length; i++) {
            if (this.dishes[i].id === id) {
                // console.log('deleteSection -> ', id);
                eventBus.emit(SectionEvents.deleteDish, { id });

                this.dishes.splice(i, 1);
            }
        }
    }
}