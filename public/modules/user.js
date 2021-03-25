import eventBus from './eventBus.js';

class User {
    constructor () {
        this.logout()
        eventBus.on('userSignIn', this.auth.bind(this))
        eventBus.on('userLogout', this.logout.bind(this))
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

export default new User()
