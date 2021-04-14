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
        title = '',
        avatar = '',
        deliveryCost = '',
        email = '',
        number = '',
        role = '',
        address = '',
    } = {}) {
        if (name || title) {
            this.name = name || title;
            this.avatar = avatar;

            this.address = address;
            this.deliveryCost = deliveryCost;
            this.email = email;
            this.number = number;
            this.role = role;
            this.isAuth = true;
        }
    }

    logout () {
        this.name = '';
        this.avatar = '';
        this.address = '';
        this.deliveryCost = '';
        this.email = '';
        this.number = '';
        this.role = '';
        this.isAuth = false;
    }
}

export default new User()
