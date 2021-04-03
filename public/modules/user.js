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
        avatar = '',
        address = '',
        uid = 0,
        email = '',
        number = ''
    } = {}) {
        if (name && avatar) {
            this.name = name;
            this.avatar = avatar;
            this.isAuth = true;

            this.address = address;
            this.uid = uid;
            this.email = email;
            this.number = number;
        }
    }

    logout () {
        this.name = '';
        this.avatar = '';
        this.isAuth = false;

        this.address = '';
        this.uid = '';
        this.email = '';
        this.number = '';
    }
}

export default new User()
