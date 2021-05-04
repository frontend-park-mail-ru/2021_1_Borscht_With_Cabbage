import profileModel from 'Models/ProfileModel.js';
import { Validator } from 'Modules/validation.js';
import user from '../modules/user.js';
import { noop } from '../modules/utils.js';
import { ProfileView } from '../views/ProfileView.js';
import eventBus from '../modules/eventBus.js';
import { ProfileEvents } from '../events/ProfileEvents.js';
import { AuthEvents } from '../events/AuthEvents.js';
import chatModel from '../models/ChatModel.js';

export class ProfileController {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.profileView = new ProfileView({ root, goTo, controller: this })
        eventBus.on(ProfileEvents.profileGetUserDataSuccess, this.draw.bind(this));
        eventBus.on(ProfileEvents.profileGetUserDataFailed, this.loadError.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataSuccess, this.updateInputs.bind(this));
        eventBus.on(ProfileEvents.profileSetUserDataFailed, this.changeFailed.bind(this));
        eventBus.on(ProfileEvents.profileGetOrdersSuccess, this.draw.bind(this));
        eventBus.on(ProfileEvents.profileGetOrdersFailed, this.loadError.bind(this));
        eventBus.on(ProfileEvents.profileGetChatsSuccess, this.draw.bind(this));
        eventBus.on(ProfileEvents.profileGetChatsFailed, this.loadError.bind(this)); // TODO
        eventBus.on(ProfileEvents.profileGetChatMessagesSuccess, this.draw.bind(this));
        eventBus.on(ProfileEvents.profileGetChatMessagesFailed, this.loadError.bind(this)); // TODO
        chatModel.subscribe(this.addNewMessage.bind(this));
    }

    setUserData ({
        email,
        name,
        phone,
        currentPassword,
        newPassword,
        repeatPassword,
        avatar
    } = {}) {
        const emailError = Validator.validateEmail(email);
        const nameError = Validator.validateName(name);
        const phoneError = Validator.validatePhone(phone);
        const currentPasswordError = Validator.validateChangeOldPassword(currentPassword, newPassword);
        const newPasswordError = Validator.validateChangeNewPassword(newPassword);
        const repeatPasswordError = Validator.validateChangePasswordRepeat(newPassword, repeatPassword);

        if (emailError.result && nameError.result && phoneError.result &&
            currentPasswordError.result && newPasswordError.result && repeatPasswordError.result
        ) {
            const formData = new FormData();
            if (avatar) {
                formData.append('avatar', avatar);
            }

            profileModel.setUserData({
                email,
                name,
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
            nameError,
            phoneError,
            currentPasswordError,
            newPasswordError,
            repeatPasswordError
        };
    }

    getUserData () {
        profileModel.getUserData();
    }

    getOrders () {
        profileModel.getOrders()
    }

    render (url) {
        this.url = url;
        if (user.role === 'admin') {
            this.goTo('restaurantMain');
            return;
        } else if (user.role !== 'user') {
            this.goTo('main');
            return;
        }

        if (/orders/.test(url)) {
            this.getOrders();
        } else if (/chats\/./.test(url)) {
            this.getChatMessages(url);
        } else if (/chats/.test(url)) {
            this.getChats();
        } else {
            this.getUserData();
        }
    }

    draw (data) {
        this.profileView.render({ data, url: this.url });
    }

    loadError (error) {
        console.log('profile controller -> loadError', error)
    }

    updateInputs ({ info, status }) {
        if (status === 200) {
            if (!info.avatar) {
                info.avatar = user.avatar;
            }
            eventBus.emit(AuthEvents.userSignIn, info);
            this.draw(info);
        }
    }

    changeFailed (error) {
        this.profileView.renderServerError(error);
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
        chatModel.getChats(ProfileEvents.profileGetChatsSuccess, ProfileEvents.profileGetChatsFailed);
    }

    getChatMessages (url) {
        console.log('getChatMessages -> ', url.substring(url.lastIndexOf('/') + 1))
        const handler = this.addNewMessage.bind(this);
        chatModel.getChatsMessage({
            id: url.substring(url.lastIndexOf('/') + 1),
            handler,
            successEvent: ProfileEvents.profileGetChatMessagesSuccess,
            failEvent: ProfileEvents.profileGetChatMessagesFailed
        });
    }

    addNewMessage (message) {
        if (message.action === 'message') {
            const link = window.location.pathname;
            if (String(message.payload.from.id) === link.substring(link.lastIndexOf('/') + 1)
                && link.match(/profile\/chats\/./)) {
                this.profileView.renderNewMessage(message.payload.message);
            }
        }
    }

    postReview (oid, review, stars) {
        stars = parseInt(stars)
        profileModel.postReview(oid, review, stars)
    }
}
