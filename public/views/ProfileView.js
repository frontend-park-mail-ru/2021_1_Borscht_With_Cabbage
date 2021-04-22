import renderProfileView from '../components/Profile/ProfileTmpl.hbs'
import { ProfileEdits } from '../components/Profile/ProfileEdits/ProfileEdits.js';
import { ProfileController } from '../controllers/ProfileController.js';
import eventBus from '../modules/eventBus.js';
import { ProfileEvents } from '../events/ProfileEvents.js';
import { RightMenu } from '../components/Profile/RightMenu/RightMenu.js';
import { Orders } from '../components/Profile/Orders/Orders.js';
import user from '../modules/user.js';

export class ProfileView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.profileController = new ProfileController()
        eventBus.on(ProfileEvents.profileGetUserDataSuccess, this.userDraw.bind(this))
        eventBus.on(ProfileEvents.profileGetUserDataFailed, this.loadError.bind(this))
    }

    render (url) {
        this.url = url;
        if (user.role === 'admin') {
            this.goTo('restaurantMain');
            return;
        } else if (user.role !== 'user'){
            this.goTo('main');
            return;
        }
        // TODO вынести эту лоику в компонент, который отвечает за это конкретно
        this.profileController.getUserData()
    }

    userDraw (data) {
        this.root.innerHTML = ''

        const profile = document.createElement('div')
        profile.innerHTML = renderProfileView({}) // создаем правое меню
        this.root.append(profile)

        // добавляем поля профиля и его изменения
        const edits = new ProfileEdits({
            root: this.root,
            goTo: this.goTo,
            user: data,
            controller: this.profileController
        });

        const orders = new Orders({
            root: this.root,
            controller: this.profileController,
            goTo: this.goTo,
            user: user
        });

        const rightMenu = new RightMenu({
            root: this.root.querySelector('#profile-right-block'),
            goTo: this.goTo
        });
        rightMenu.render();

        if (/orders/.test(this.url)) {
            orders.render();
        } else if (/chats/.test(this.url)) {
            // TODO
        } else {
            edits.render();
        }
    }

    loadError (error) {
        console.log('profileView -> loadError', error)
    }
}
