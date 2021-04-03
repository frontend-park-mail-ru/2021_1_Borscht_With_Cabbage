import eventBus from './eventBus.js';
import AuthEvents from '../events/AuthEvents.js';

class Restaurant {
    constructor () {
        this.logout()
        eventBus.on(AuthEvents.restaurantSignIn, this.auth.bind(this))
        eventBus.on(AuthEvents.restaurantLogout, this.logout.bind(this))
    }

    auth ({ name, avatar }) {
        this.name = name
        this.avatar = avatar
        this.isAuth = true
    }

    logout () {
        this.name = ''
        this.avatar = ''
        this.isAuth = false
    }
}

export default new Restaurant()
