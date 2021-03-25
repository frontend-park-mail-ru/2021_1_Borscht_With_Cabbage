/**
 *  userSignInSuccess
 *      data: { name, avatar }
 *
 *  userSignInFailed
 *      data: { error }
 */

class SignInEvents {
    constructor () {
        this.userSignInSuccess = 'userSignInSuccess'
        this.userSignInFailed = 'userSignInFailed'
    }
}

export default new SignInEvents()
