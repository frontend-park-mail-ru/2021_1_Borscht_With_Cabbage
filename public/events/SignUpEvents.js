/**
 *  userSignUpSuccess
 *      data: { name, avatar, role }
 *
 *  userSignUpFailed
 *      data: { error }
 */

class SignUpEvents {
    constructor () {
        this.userSignUpSuccess = 'userSignUpSuccess'
        this.userSignUpFailed = 'userSignUpFailed'
        this.restaurantSignUpSuccess = 'restaurantSignUpSuccess'
        this.restaurantSignUpFailed = 'restaurantSignUpFailed'
    }
}

export default new SignUpEvents()
