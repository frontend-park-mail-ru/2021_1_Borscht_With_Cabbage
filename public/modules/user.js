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
        deliveryCost = '',
        email = '',
        number = '',
        role = ''
    } = {}) {
        if (name) {
            this.name = name;
            this.avatar = avatar;

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
        this.deliveryCost = '';
        this.email = '';
        this.number = '';
        this.role = '';
        this.isAuth = false;
    }
}

export default new User()
