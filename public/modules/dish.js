import mainModel from '../models/RestaurantMainModel.js';
import { Validator } from './validation.js';
import { DishEvents } from '../events/DishEvents.js';
import eventBus from './eventBus.js';

export class DishModel {
    constructor ({
        id,
        name,
        price,
        description,
        weight,
        image,
        section
    }) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.weight = weight;
        this.image = image;
        this.section = section;

        eventBus.on(DishEvents.updateDishDataSuccess + id, this.updateDishDataSuccess.bind(this));
        eventBus.on(DishEvents.updateDishImageSuccess + id, this.updateDishImageSuccess.bind(this));
    }

    updateDishDataSuccess({
        name,
        price,
        description,
        weight
    }) {
        this.name = name;
        this.price = price;
        this.description = description;
        this.weight = weight;
        eventBus.emit(DishEvents.updateDish + this.id);
    }

    updateDishImageSuccess ({ filename }) {
        this.image = filename;
        eventBus.emit(DishEvents.updateDish + this.id);
    }

    updateDish ({ dish }) {
        console.log(dish)
        const actonFunc = mainModel.updateDataDish;
        const result = this.correctAndSendDish(dish, actonFunc);

        // загрузка изображения
        this.updateImage(dish);

        return result;
    }

    updateImage ({ id, image }) {
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('id', id);
            mainModel.updateImageDish({ id: id, data: formData });
        }
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
            };
        }
        return {
            error: true,
            nameError,
            descriptionError,
            priceError,
            weightError
        };
    }
}