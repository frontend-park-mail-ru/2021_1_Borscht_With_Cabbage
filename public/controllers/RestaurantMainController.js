import { Validator } from '../modules/validation.js';
import mainModel from '../models/RestaurantMainModel.js';
import { DishEvents } from '../events/DishEvents.js';
import eventBus from '../modules/eventBus.js';
import { noop } from '../modules/utils.js';
import { RestaurantMainView } from '../views/RestaurantMainView.js';
import { RestaurantAddingDish } from '../components/Restaurant/RestaurantAddDish/RestaurantAddingDish.js';
import { RestaurantAddingSection } from '../components/Restaurant/RestaurantAddingSection/RestaurantAddingSection.js'
import user from '../modules/user.js';
import chatModel from '../models/ChatModel.js';
import { RestaurantEvents } from '../events/RestaurantEvents.js';
import { SectionEvents } from '../events/SectionEvents.js';
import { MenuModel } from '../modules/menu.js';
import { ConfirmationEvents } from '../events/ConfirmationEvents.js';
import { ConfirmationComponent } from '../components/Confirmation/Confirmation.js';
import { RestaurantOrdersEvents } from '../events/RestaurantOrdersEvents.js';

export class RestaurantMainController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;

        this.confirmationId = 'restaurantController';
        this.menu = new MenuModel();
        this.view = new RestaurantMainView({ root, goTo, menu: this.menu, controller: this });
        this.addingDish = new RestaurantAddingDish({ goTo: this.goTo, controller: this });
        this.addingSection = new RestaurantAddingSection({ controller: this });
        this.confirmation = new ConfirmationComponent();
        eventBus.on(SectionEvents.addingSectionSuccess, this.addSectionSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationSuccess + this.confirmationId, this.confirmationSuccess.bind(this));
        eventBus.on(ConfirmationEvents.confirmationFailed + this.confirmationId, this.confirmationFailed.bind(this));
        eventBus.on(SectionEvents.deleteSectionSuccess, this.deleteSectionSuccess.bind(this));
        eventBus.on(SectionEvents.addingDishSuccess, this.addingDishDataSuccess.bind(this));
        eventBus.on(SectionEvents.addingDishFailed, this.addingDishDataFailed.bind(this));
        eventBus.on(SectionEvents.deleteDishSuccess, this.deleteDishSuccess.bind(this));
        eventBus.on(DishEvents.getAllDishSuccess, this.draw.bind(this));
        eventBus.on(DishEvents.getAllDishFailed, this.loadError.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatsSuccess, this.draw.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatsFailed, this.loadError.bind(this)); // TODO
        eventBus.on(RestaurantEvents.restaurantGetChatMessagesSuccess, this.draw.bind(this));
        eventBus.on(RestaurantEvents.restaurantGetChatMessagesFailed, this.loadError.bind(this)); // TODO
        eventBus.on(RestaurantOrdersEvents.restaurantGetOrdersSuccess, this.draw.bind(this));
        eventBus.on(RestaurantOrdersEvents.restaurantGetOrdersFailed, this.loadError.bind(this));
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
            this.getOrders();
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
        if (this.url.match(/menu/)) {
            data.forEach(section => {
                const model = this.menu.addSection(section);
                this.view.appendSection({ section: model });
            })
        }

        this.view.render({ data, url: this.url });
    }

    editSection (section) {
        this.addingSectionItem = document.createElement('div');
        this.root.appendChild(this.addingSectionItem);
        // this.root.querySelector(`[data-section-id="${section.id}"]`)
        //     .insertAdjacentElement('afterbegin', this.addingSectionItem);


        this.addingSection.render({ root: this.addingSectionItem, section: section });
    }

    closeAddingSection () {
        this.addingSectionItem.remove();
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

    addSectionSuccess (section) {
        const model = this.menu.addSection(section);
        this.view.appendSection({ section: model });

        this.view.render({ url: this.url });
    }

    deleteSection ({ section }) {
        this.removeSection = section;
        this.confirmation.render({ root: this.root, id: this.confirmationId });
    }

    deleteDish ({ dish }) {
        this.removeDish = dish;
        this.confirmation.render({ root: this.root, id: this.confirmationId });
    }

    deleteSectionSuccess ({ id }) {
        this.menu.deleteSection({ id: id });
        this.view.render({ url: this.url });
    }

    deleteDishSuccess ({ id }) {
        this.menu.deleteDish({ id: id });
        this.view.render({ url: this.url });
    }

    confirmationSuccess () {
        console.log(this.removeSection);
        console.log(this.removeDish);
        if (this.removeSection) {
            mainModel.deleteSection({ id: this.removeSection.id });
            this.removeSection = null;
        }
        if (this.removeDish) {
            mainModel.deleteDish({ id: this.removeDish.id });
            this.removeDish = null;
        }
    }

    confirmationFailed () {
        console.log('confirmationFailed');
        this.removeSection = null;
        this.removeDish = null;
    }

    editDish (dish) {
        console.log('editDish', dish);
        this.addingDishItem = document.createElement('div');
        this.root.append(this.addingDishItem);

        this.addingDish.render({
            root: this.addingDishItem,
            dish: dish
        });
    }
    
    closeAddingDish() {
        if (this.addingDishItem) {
            this.addingDishItem.remove();
        }
    }

    addDish (dish) {
        const nameError = Validator.validateName(dish.name);
        const descriptionError = Validator.validateDescription(dish.description);
        const priceError = Validator.validateNumber(dish.price);
        const weightError = Validator.validateNumber(dish.weight);
        this.imageDish = dish.image;

        if (nameError.result && descriptionError.result && priceError.result && weightError.result) {
            dish.price = Number(dish.price);
            dish.weight = Number(dish.weight);
            mainModel.addDish(dish);
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

    addingDishDataSuccess (dish) {
        const model = this.menu.addDish(dish);
        this.view.appendDish({ dish: model });
        model.updateImage({ id: dish.id, image: this.imageDish });
        this.view.render({ url: this.url });
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

    getOrders () {
        mainModel.getOrders();
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

    getDishes () {
        this.menu.deleteAll();
        this.view.deleteAll();
        mainModel.getDish();
    }

    addingDishDataFailed () {
        this.imageDish = null;
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

    saveStatus (status, time, order) {
        console.log(time)
        time = time + ':00'
        mainModel.updateStatus(status, time, order)
    }

    setStatusSuccess() {
        console.log("set new status success")
    }

    setStatusFailed() {
        console.log("set new status error")
    }
}
