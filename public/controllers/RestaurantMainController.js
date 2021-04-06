import { Validator } from '../modules/validation.js';
import { RestaurantMainModel } from '../models/RestaurantMainModel.js';
import { DishEvents } from '../events/DishEvents.js';
import eventBus from '../modules/eventBus.js';

export class RestaurantMainController {
    constructor () {
        this.mainModel = new RestaurantMainModel();
        eventBus.on(DishEvents.addingDishSuccess, this.addingDishDataSuccess.bind(this));
        eventBus.on(DishEvents.addingDishFailed, this.addingDishDataFailed.bind(this));
    }

    getDishes (dish) { 
        this.mainModel.getDish();
    }

    updateDish (dish) {
        console.log(dish);
        if (!dish.id) {
            return {
                error: true
            }
        }
        const actonFunc = this.mainModel.updateDataDish;
        const result = this.correctAndSendDish(dish, actonFunc);

        // загрузка изображения
        if (!dish.image) {
            return result;
        }
        const formData = new FormData();
        formData.append('image', dish.image);
        formData.append('id', dish.id);
        this.mainModel.updateImageDish({id: dish.id, data: formData});

        return result;
    }

    correctAndSendDish (dish, action) {
        const nameError = Validator.validateName(dish.name);
        const descriptionError = Validator.validateDescription(dish.description);
        const priceError = Validator.validateNumber(dish.price);
        const weightError = Validator.validateNumber(dish.weight);

        if (nameError.result && descriptionError.result && priceError.result && weightError.result) {
            dish.price = Number(dish.price);
            dish.weight = Number(dish.weight);
            action(dish);
            return {
                error: false
            }
        } else {
            return {
                error: true,
                nameError,
                descriptionError,
                priceError,
                weightError
            }
        }
    }

    addDish (dish) {
        console.log(dish);
        const actonFunc = this.mainModel.addDish;
        this.imageDish = dish.image;
        return this.correctAndSendDish(dish, actonFunc)
    }

    addingDishDataSuccess ({ id }) {
        if (this.imageDish) {
            const formData = new FormData();
            formData.append('image', this.imageDish);
            formData.append('id', id);
            this.mainModel.updateImageDish({id: id, data: formData});

            this.imageDish = null;
        }
    }

    addingDishDataFailed () {
        this.imageDish = null;
    }

    deleteDish (id) {
        if (!id) {
            return {
                error: true
            }
        }
        return this.mainModel.deleteDish({ id: Number(id) });
    }
}
