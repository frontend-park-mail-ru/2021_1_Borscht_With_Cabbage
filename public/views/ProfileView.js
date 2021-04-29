import '../components/Profile/Profile.less';
import renderProfileView from '../components/Profile/ProfileTmpl.hbs'
import { ProfileEdits } from '../components/Profile/ProfileEdits/ProfileEdits.js';
import { ProfileController } from '../controllers/ProfileController.js';
import { RightMenu } from '../components/Profile/RightMenu/RightMenu.js';
import { Orders } from '../components/Profile/Orders/Orders.js';
import { noop } from '../modules/utils.js';

export class ProfileView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new ProfileController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.profileController = controller;
        const initialData = {
            root: this.root,
            controller: this.profileController,
            goTo: this.goTo
        };

        this.edits = new ProfileEdits(initialData);
        this.orders = new Orders(initialData);
        this.chats = new ChatList(initialData);
        this.chat = new Chat(initialData);

        this.rightMenu = new RightMenu({
            root: this.root.querySelector('#profile-right-block'),
            goTo: this.goTo
        });
    }

    render ({ data, url } = {}) {
        this.root.innerHTML = '';

        const profile = document.createElement('div');
        profile.innerHTML = renderProfileView({});
        this.root.append(profile);

        this.rightMenu.render();

        if (/orders/.test(url)) {
            this.activeComponent = this.orders;
        } else if (/chats\/./.test(url)) {
            this.activeComponent = this.chat;
        } else if (/chats/.test(url)) {
            this.activeComponent = this.chats;
        } else {
            this.activeComponent = this.edits;
        }
        this.activeComponent.render(data);
    }

    renderServerError (error) {
        this.activeComponent.renderServerError(error);
    }

    renderNewMessage (message) {
        this.chat.renderNewMessage(message);
    }
}
