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

        eventBus.on(DishEvents.getAllDishSuccess, this.renderAppendSections.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.renderDishLoadingError.bind(this));
        eventBus.on(SectionEvents.addingSectionSuccess, this.renderAddingSuccess.bind(this));
        eventBus.on(SectionEvents.closeAddingSectionComponent, this.renderCloseAddingSectionComponent.bind(this));
        eventBus.on(SectionEvents.updateSection, this.renderUpdateSection.bind(this));
        eventBus.on(SectionEvents.deleteSectionSuccess, this.renderDeleteSection.bind(this));
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
        } else if (/menu/) {
            this.getDishes();
        } else {
            this.url = 'edits';
            this.draw();
        }
        this.draw()
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

    renderCloseAddingSectionComponent (data) {
        this.view.renderCloseAddingSectionComponent(data);
    }

    renderUpdateSection (data) {
        this.view.renderUpdateSection(data);
    }

    renderDeleteSection (data) {
        this.view.renderDeleteSection(data);
    }

    sendMessage (value) {
        const message = {
            to: {
                id: 1
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
        console.log('getChatMessages -> ', url.substring(url.lastIndexOf('/') + 1))
        const handler = this.addNewMessage.bind(this);
        chatModel.getChatsMessage({
            id: url.substring(url.lastIndexOf('/') + 1),
            handler,
            successEvent: RestaurantEvents.restaurantGetChatMessagesSuccess,
            failEvent: RestaurantEvents.restaurantGetChatMessagesFailed
        });
    }

    addNewMessage (message) {
        console.log('i get new message, ua -> ', message, 'url=', this.url)
        if (message.action === 'message') {
            if (String(message.payload.from.id) === this.url.substring(this.url.lastIndexOf('/') + 1) // TODO overthink
                && window.location.pathname.match(/restaurant\/chats\/./)) {
                this.view.renderNewMessage(message.payload);
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
}
