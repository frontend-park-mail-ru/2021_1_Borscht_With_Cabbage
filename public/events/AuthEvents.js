/**
 *  userSignIn
 *      data: { name, avatar, role }
 *
 *  userLogout
 *      data: {}
 */

class AuthEvents {
    constructor () {
        this.userSignIn = 'userSignIn'
        this.userLogout = 'userLogout'
    }
}

export default new AuthEvents()
