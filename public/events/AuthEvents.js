/**
 *  userSignIn
 *      data: { name, avatar }
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
