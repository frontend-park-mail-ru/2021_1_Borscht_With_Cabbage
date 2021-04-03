/**
 *  profileGetUserDataSuccess
 *      data: { userData }
 *
 *  profileGetUserDataFailed
 *      data: { error }
 *
 *  profileSetUserDataSuccess
 *      data: { userData }
 *
 *  profileSetUserDataFailed
 *      data: { error }
 */

class ProfileEvents {
    constructor () {
        this.profileGetUserDataSuccess = 'profileGetUserDataSuccess'
        this.profileGetUserDataFailed = 'profileGetUserDataFailed'
        this.profileSetUserDataSuccess = 'profileSetUserDataSuccess'
        this.profileSetUserDataFailed = 'profileSetUserDataFailed'
        this.profileGetOrdersSuccess = 'profileGetOrdersSuccess'
        this.profileGetOrdersFailed = 'profileGetOrdersFailed'
    }
}

export default new ProfileEvents()
