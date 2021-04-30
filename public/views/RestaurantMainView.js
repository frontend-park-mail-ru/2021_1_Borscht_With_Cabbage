import '../components/Restaurant/Restaurant.less'
import { RestaurantMainController } from '../controllers/RestaurantMainController.js';
import { RestaurantMenuComponent } from '../components/Restaurant/RestaurantMenu/RestaurantMenu.js'
import { RestaurantEdits } from '../components/Restaurant/RestaurantEdits/RestaurantEdits.js';
import renderRestaurantView from '../components/Restaurant/RestaurantMainTmpl.hbs';
import { RestaurantRightMenu } from '../components/Restaurant/RestaurantRightMenu/RightMenu.js';
import { noop } from '../modules/utils.js';
import { ChatList } from '../components/ChatList/ChatList.js';
import { Chat } from '../components/Chat/Chat.js';

export class RestaurantMainView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new RestaurantMainController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.mainController = controller;
        const initialData = {
            root: this.root,
            controller: this.mainController,
            goTo: this.goTo
        };

        this.menu = new RestaurantMenuComponent(initialData);
        this.edits = new RestaurantEdits(initialData);
        this.chats = new ChatList(initialData);
        this.chat = new Chat(initialData);

        this.rightMenu = new RestaurantRightMenu({
            root: this.root,
            goTo: this.goTo
        });
    }

    render ({ data, url } = {}) {
        this.root.innerHTML = renderRestaurantView({});
        this.rightMenu.render();

        if (/orders/.test(url)) {
            // this.activeComponent = this.orders;
        } else if (/chats\/./.test(url)) {
            this.activeComponent = this.chat;
        } else if (/chats/.test(url)) {
            this.activeComponent = this.chats;
        } else if (/menu/.test(url)) {
            this.activeComponent = this.menu;
        } else {
            this.activeComponent = this.edits;
        }
        this.activeComponent.render(data);
    }

    renderServerError (error) {
        this.activeComponent.renderServerError(error);
    }

    loadError (error) {
        // TODO изобразить сообщение о пропаввшем интернете
        console.log('mainVIew -> loadError', error)
    }

    renderNewMessage (message) {
        this.chat.renderNewMessage(message);
    }

    renderAppendSections (data) {
        this.menu.appendSections(data);
    }

    renderDishLoadingError (data) {
        this.menu.dishLoadingError(data);
    }

    renderAddingSuccess (data) {
        this.menu.addingSuccess(data);
    }

    renderCloseAddingSectionComponent (data) {
        this.menu.closeAddingSectionComponent(data);
    }

    renderUpdateSection (data) {
        this.menu.updateSection(data);
    }

    renderDeleteSection (data) {
        this.menu.deleteSection(data);
    }
}
