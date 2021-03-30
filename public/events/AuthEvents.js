/**
 *  userSignIn
 *      data: { name, avatar }
 *
 *  userLogout
 *      data: {}
 *
 *  offline
 *      data: { message }
 */

class AuthEvents {
    constructor () {
        this.userSignIn = 'userSignIn';
        this.userLogout = 'userLogout';
        this.offline = 'offlineRequest';
    }
}

export default new AuthEvents()
