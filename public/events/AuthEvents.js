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
        this.restaurantSignIn = 'restaurantSignIn'
        this.restaurantLogout = 'restaurantLogout'
    }
}

export default new AuthEvents()
