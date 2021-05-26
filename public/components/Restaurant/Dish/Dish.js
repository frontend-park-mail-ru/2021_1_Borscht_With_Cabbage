import renderDish from './DishTmpl.hbs';
import eventBus from '../../../modules/eventBus.js';
import { DishEvents } from '../../../events/DishEvents.js';
import { ConfirmationEvents } from '../../../events/ConfirmationEvents.js';
import { ConfirmationComponent } from '../../Confirmation/Confirmation.js';
import { RestaurantMainController } from '../../../controllers/RestaurantMainController.js';
import { DishModel } from '../../../modules/dish.js';

export class DishComponent {
    constructor ({
        dish = new DishModel(),
        controller = new RestaurantMainController()
    } = {}) {
        this.dish = dish;
        this.controller = controller;
        eventBus.on(DishEvents.updateDish + this.dish.id, this.update.bind(this));
    }

    render ({
        root = document.body
    }) {
        this.root = root;
        this.root.innerHTML = renderDish({ dish: this.dish });

        this.addEditDishEventListener();
        this.addDeleteDishEventListener();
    }

    addEditDishEventListener () {
        this.editDish = this.root.querySelector('.icon-edit');
        if (!this.editDish) {
            return;
        }

        this.editDish.addEventListener('click', e => {
            this.controller.editDish(this.dish);
        });
        this.root.addEventListener('click', e => {
            if (e.target != this.editDish && e.target != this.deleteDish) {
                this.controller.editDish(this.dish);
            }
        });
    }

    addDeleteDishEventListener () {
        this.deleteDish = this.root.querySelector('.icon-delete');
        if (!this.deleteDish) {
            return;
        }

        this.deleteDish.addEventListener('click', e => {
            this.controller.deleteDish({ dish: this.dish })
        });
    }

    update() {
        console.log('update dish');
        const dishName = this.root.querySelector('.card__name');
        if (dishName) {
            dishName.textContent = this.dish.name;
        }
        const dishSum = this.root.querySelector('.card__sum')
        if (dishSum) {
            dishSum.textContent = this.dish.price;
        }
        const dishDesc = this.root.querySelector('.card__description');
        if (dishDesc) {
            dishDesc.textContent = this.dish.description;
        }
        const dishImage = this.root.querySelector('.card__image');
        if (dishImage) {
            dishImage.style.backgroundImage = `url(${this.dish.image})`;
        }
    }
}
