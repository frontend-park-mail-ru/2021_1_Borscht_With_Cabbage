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
        menu,
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

        this.menu = new RestaurantMenuComponent({
            controller: this.mainController,
            goTo: this.goTo, 
            menu: menu
        });
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
            this.menu.render({ root: document.getElementById('restaurant-left-block') });
            return;
        } else {
            console.log('strange', url);
            this.activeComponent = this.edits;
        }
        this.activeComponent.render(data);
    }

    appendSection(section) {
        this.menu.appendSection(section);
    }

    appendDish(dish) {
        this.menu.appendDish(dish);
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

    deleteAll () {
        this.menu.sections = [];
    }
}
