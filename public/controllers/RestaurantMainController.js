import { Validator } from '../modules/validation.js';
import mainModel from '../models/RestaurantMainModel.js';
import { DishEvents } from '../events/DishEvents.js';
import eventBus from '../modules/eventBus.js';

export class RestaurantMainController {
    constructor () {
        eventBus.on(DishEvents.addingDishSuccess, this.addingDishDataSuccess.bind(this));
        eventBus.on(DishEvents.addingDishFailed, this.addingDishDataFailed.bind(this));
    }

    addSection (section) {
        const nameError = Validator.validateName(section.name);
        if (nameError.result) {
            mainModel.addSection(section);
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

    updateSection (section) {
        if (!section.id) {
            return {
                error: true
            }
        }

        section.id = Number(section.id);
        const nameError = Validator.validateName(section.name);
        if (nameError.result) {
            mainModel.updateSection(section);
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

    deleteSection (id) {
        if (!id) {
            return {
                error: true
            }
        }
        return mainModel.deleteSection({ id: Number(id) });
    }

    getDishes () {
        mainModel.getDish();
    }

    updateDish (dish) {
        if (!dish.id) {
            return {
                error: true
            }
        }
        const actonFunc = mainModel.updateDataDish;
        const result = this.correctAndSendDish(dish, actonFunc);

        // загрузка изображения
        if (!dish.image) {
            return result;
        }
        const formData = new FormData();
        formData.append('image', dish.image);
        formData.append('id', dish.id);
        mainModel.updateImageDish({ id: dish.id, data: formData });

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

    addDish (dish) {
        const actonFunc = mainModel.addDish;
        this.imageDish = dish.image;
        return this.correctAndSendDish(dish, actonFunc)
    }

    addingDishDataSuccess ({ id }) {
        if (this.imageDish) {
            const formData = new FormData();
            formData.append('image', this.imageDish);
            formData.append('id', id);
            mainModel.updateImageDish({ id: id, data: formData });

            this.imageDish = null;
        }
    }

    addingDishDataFailed () {
        this.imageDish = null;
    }

    deleteDish (id, sectionId) {
        if (!id) {
            return {
                error: true
            }
        }
        return mainModel.deleteDish({ id: Number(id), sectionId: sectionId });
    }

    setRestaurantData ({
        email,
        title,
        phone,
        currentPassword,
        newPassword,
        repeatPassword,
        avatar,
        deliveryCost
    } = {}) {
        const emailError = Validator.validateEmail(email);
        const titleError = Validator.validateName(title);
        const phoneError = Validator.validatePhone(phone);
        const currentPasswordError = Validator.validateChangeOldPassword(currentPassword, newPassword);
        const newPasswordError = Validator.validateChangeNewPassword(newPassword);
        const repeatPasswordError = Validator.validateChangePasswordRepeat(newPassword, repeatPassword);
        const deliveryCostError = Validator.validateRealNumber(deliveryCost)

        if (emailError.result && titleError.result && phoneError.result && deliveryCostError.result &&
            currentPasswordError.result && newPasswordError.result && repeatPasswordError.result
        ) {
            const formData = new FormData();
            if (avatar) {
                formData.append('avatar', avatar);
            }

            mainModel.setRestaurantData({
                email,
                title,
                deliveryCost: Number.parseInt(deliveryCost),
                number: phone,
                password_current: currentPassword,
                password: newPassword,
                password_repeat: repeatPassword
            }, formData);
            return {
                error: false
            };
        }
        return {
            error: true,
            emailError,
            titleError,
            phoneError,
            deliveryCostError,
            currentPasswordError,
            newPasswordError,
            repeatPasswordError
        };
    }
}
