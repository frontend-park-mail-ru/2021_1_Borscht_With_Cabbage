import { Validator } from '../modules/validation.js';
import mainModel from '../models/RestaurantMainModel.js';
import { DishEvents } from '../events/DishEvents.js';
import eventBus from '../modules/eventBus.js';
import { noop } from '../modules/utils.js';
import { RestaurantMainView } from '../views/RestaurantMainView.js';
import user from '../modules/user.js';
import chatModel from '../models/ChatModel.js';
import { RestaurantEvents } from '../events/RestaurantEvents.js';
import { SectionEvents } from '../events/SectionEvents.js';

export class RestaurantMainController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.view = new RestaurantMainView({ root, goTo, controller: this })
        eventBus.on(DishEvents.addingDishSuccess, this.addingDishDataSuccess.bind(this));
        eventBus.on(DishEvents.addingDishFailed, this.addingDishDataFailed.bind(this));
        eventBus.on(DishEvents.getAllDishSuccess, this.draw.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.loadError.bind(this));
        eventBus.on(SectionEvents.addingSectionSuccess, this.renderAddingSuccess.bind(this));
        eventBus.on(SectionEvents.deleteSectionSuccess, this.renderDeleteSection.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatsSuccess, this.draw.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatsFailed, this.loadError.bind(this)); // TODO
        eventBus.on(RestaurantEvents.restaurantGetChatMessagesSuccess, this.draw.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatMessagesFailed, this.loadError.bind(this)); // TODO
    }

    render (url) {
        this.url = url;
        if (user.role === 'user') {
            this.goTo('profile');
            return;
        } else if (user.role !== 'admin') {
            this.goTo('main');
            return;
        }

        if (/orders/.test(url)) {
            // this.getOrders();
        } else if (/chats\/./.test(url)) {
            this.getChatMessages(url);
        } else if (/chats/.test(url)) {
            this.getChats();
        } else if (/menu/.test(url)) {
            this.getDishes();
        } else if (/edits/.test(url)) {
            this.draw();
        } else {
            this.goTo('/restaurant/edits');
        }
    }

    draw (data) {
        this.view.render({ data, url: this.url });
    }

    renderAppendSections (data) {
        this.view.renderAppendSections(data);
    }

    renderDishLoadingError (data) {
        this.view.renderDishLoadingError(data);
    }

    renderAddingSuccess (data) {
        this.view.renderAddingSuccess(data);
    }

    renderDeleteSection (data) {
        this.view.renderDeleteSection(data);
    }

    sendMessage (value, id) {
        const message = {
            to: {
                id
            },
            message: {
                date: 'today',
                text: value
            }
        }

        chatModel.sendMessage(message);
    }

    getChats () {
        chatModel.getChats(RestaurantEvents.restaurantGetChatsSuccess, RestaurantEvents.restaurantGetChatsFailed);
    }

    getChatMessages (url) {
        const handler = this.addNewMessage.bind(this);
        chatModel.getChatsMessage({
            id: url.substring(url.lastIndexOf('/') + 1),
            handler,
            successEvent: RestaurantEvents.restaurantGetChatMessagesSuccess,
            failEvent: RestaurantEvents.restaurantGetChatMessagesFailed
        });
    }

    addNewMessage (message) {
        if (message.action === 'message') {
            if (String(message.payload.from.id) === this.url.substring(this.url.lastIndexOf('/') + 1)
                && window.location.pathname.match(/restaurant\/chats\/./)) {
                this.view.renderNewMessage(message.payload.message);
            }
        }
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
        deliveryCost,
        address
    } = {}) {
        const emailError = Validator.validateEmail(email);
        const titleError = Validator.validateName(title);
        const phoneError = Validator.validatePhone(phone);
        const currentPasswordError = Validator.validateChangeOldPassword(currentPassword, newPassword);
        const newPasswordError = Validator.validateChangeNewPassword(newPassword);
        const repeatPasswordError = Validator.validateChangePasswordRepeat(newPassword, repeatPassword);
        const deliveryCostError = Validator.validateRealNumber(deliveryCost);
        const radiusError = Validator.validateNumber(address?.radius);

        if (emailError.result && titleError.result && phoneError.result && deliveryCostError.result &&
            currentPasswordError.result && newPasswordError.result && repeatPasswordError.result && radiusError.result) {
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
                password_repeat: repeatPassword,
                address
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
            repeatPasswordError,
            radiusError
        };
    }

    loadError (error) {
        console.log('restaurant main controller -> loadError', error)
    }
}
