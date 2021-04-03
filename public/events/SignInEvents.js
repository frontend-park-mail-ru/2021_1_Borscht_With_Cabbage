/**
 *  userSignInSuccess
 *      data: { name, avatar, role }
 *
 *  userSignInFailed
 *      data: { error }
 */

class SignInEvents {
    constructor () {
        this.userSignInSuccess = 'userSignInSuccess'
        this.userSignInFailed = 'userSignInFailed'
        this.restaurantSignInSuccess = 'restaurantSignInSuccess'
        this.restaurantSignInFailed = 'restaurantSignInFailed'
    }
}

export default new SignInEvents()
