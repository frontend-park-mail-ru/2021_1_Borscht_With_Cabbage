class User {
    constructor () {
        this.logout()
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
