import eventBus from '../../../modules/eventBus.js';
import { noop } from '../../../modules/utils.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { renderRestaurantMenu } from './RestaurantMenuTmpl.js';
import { DishEvents } from '../../../events/DishEvents.js';
import { SectionComponent } from '../Section/Section.js'

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
    }

    render () {
        this.root.innerHTML = renderRestaurantMenu({});

        this.controller.getDishes();
    }

    dishLoadingError (error) {
        // TODO: показать пользователю ошибку
    }

    appendSections (sections) {
        sections.forEach(section => {
            const sectionItem = new SectionComponent ({root: this.root, section: section, controller: this.controller});
            sectionItem.render();
        });
    }

    // addAddDishEventListeners () {
    //     const addDish = this.root.querySelector('.card-add');
    //     if (!addDish) {
    //         return;
    //     }

    //     addDish.addEventListener('click', e => {
    //         e.preventDefault();

    //         this.addingDishItem = document.createElement('div');
    //         this.root.append(this.addingDishItem);

    //         const addingDish = new RestaurantAddingDish({
    //             root: this.addingDishItem,
    //             goTo: this.goTo,
    //             controller: this.controller
    //         });
    //         addingDish.render();
    //     });
    // }
}
