import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';

class User {
    constructor () {
        this.logout();
        eventBus.on(AuthEvents.userSignIn, this.auth.bind(this));
        eventBus.on(AuthEvents.userLogout, this.logout.bind(this));
    }

    auth ({
        name = '',
        avatar = ''
    } = {}) {
        if (name && avatar) {
            this.name = name;
            this.avatar = avatar;
            this.isAuth = true;
        }
    }

    logout () {
        this.name = '';
        this.avatar = '';
        this.isAuth = false;
    }
}

export default new User()
