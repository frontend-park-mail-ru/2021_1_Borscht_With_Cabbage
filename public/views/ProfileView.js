import '../components/Profile/Profile.less';

import renderProfileView from '../components/Profile/ProfileTmpl.hbs'
import { ProfileEdits } from '../components/Profile/ProfileEdits/ProfileEdits.js';
import { ProfileController } from '../controllers/ProfileController.js';
import eventBus from '../modules/eventBus.js';
import { ProfileEvents } from '../events/ProfileEvents.js';
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
        this.edits = new ProfileEdits({
            root: this.root,
            goTo: this.goTo,
            controller: this.profileController
        });

        this.orders = new Orders({
            root: this.root,
            controller: this.profileController,
            goTo: this.goTo,
        });

        this.rightMenu = new RightMenu({
            root: this.root.querySelector('#profile-right-block'),
            goTo: this.goTo
        });
    }

    render ({ data, url } = {}) {
        this.root.innerHTML = ''

        const profile = document.createElement('div')
        profile.innerHTML = renderProfileView({}) // создаем правое меню
        this.root.append(profile)

        this.rightMenu.render();

        if (/orders/.test(url)) {
            this.orders.render(data);
            this.activeComponent = this.orders;
        } else if (/chats/.test(url)) {
            // TODO
        } else {
            this.edits.render(data);
            this.activeComponent = this.edits;
        }
    }

    renderServerError (error) {
        this.activeComponent.renderServerError(error);
    }
}
