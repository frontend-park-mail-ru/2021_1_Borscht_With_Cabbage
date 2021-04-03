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
    }
}

export default new SignUpEvents()