import renderDish from './DishTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { DishEvents } from '../../../events/DishEvents.js';
import { ConfirmationEvents } from '../../../events/ConfirmationEvents.js';
import { ConfirmationComponent } from '../../Confirmation/Confirmation.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';

export class DishComponent {
    constructor ({
        root = document.body,
        dish = null, 
        controller = new RestaurantMainController()
    } = {}) {
        this.root = root;
        this.dish = dish;
        this.controller = controller;
        eventBus.on(DishEvents.updateDishDataSuccess + dish.id, this.updateDishDataSuccess.bind(this));
        eventBus.on(DishEvents.updateDishImageSuccess + dish.id, this.updateDishImageSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationSuccess + dish.id, this.confirmationSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationFailed + dish.id, this.confirmationFailed.bind(this));
    }

    render () {
        if (this.dish) {
            this.root.innerHTML += renderDish({ dish: this.dish });

            this.addEditDishEventListener();
            this.addDeleteDishEventListener();
        }
    }

    addEditDishEventListener () {
        const editDish = this.root.querySelector('.icon-edit');
        if (!editDish) {
            return;
        }
        
        editDish.addEventListener('click', e => {
            eventBus.emit(DishEvents.editDish + this.dish.section, this.dish);
        });
    }

    addDeleteDishEventListener () {
        const deleteDish = this.root.querySelector('.icon-delete');
        if (!deleteDish) {
            return;
        }
        
        deleteDish.addEventListener('click', e => {
            const confirmation = new ConfirmationComponent({ root: this.root, id: this.dish.id });
            confirmation.render();
        });
    }

    updateDishDataSuccess (dish) {
        if (!dish) {
            return;
        }
        this.root.querySelector('.card__name').textContent = dish.name;
        this.root.querySelector('.card__sum').textContent = dish.price;
        this.root.querySelector('.card__description').textContent = dish.description;
    }

    updateDishImageSuccess ({filename}) {
        console.log(filename);
        this.root.querySelector('.card__image').style.backgroundImage = `url(${filename})`;
    }

    confirmationSuccess () {
        console.log('confirmationSuccess', this.dish);
        this.controller.deleteDish(this.dish.id, this.dish.section);
    }

    confirmationFailed () {
        console.log('confirmationFailed');
    }
}
