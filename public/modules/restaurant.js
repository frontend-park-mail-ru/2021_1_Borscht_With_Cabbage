import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';

class Restaurant {
    constructor () {
        this.logout()
        eventBus.on(AuthEvents.restaurantSignIn, this.auth.bind(this))
        eventBus.on(AuthEvents.restaurantLogout, this.logout.bind(this))
    }

    auth ({
        name = '',
        title = '',
        avatar = '',
        deliveryCost = '',
        email = '',
        number = '',
        role = ''
    } = {}) {
        if (name || title) {
            this.name = name || title;
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

export default new Restaurant()
