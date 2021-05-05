/**
 *  userSignIn
 *      data: { name, avatar, role }
 *
 *  userLogout
 *      data: {}
 *
 *  offline
 *      data: { message }
 */

export const AuthEvents = {
    userSignIn: 'userSignIn',
    userLogout: 'userLogout',
    offline: 'offlineRequest',
    restaurantSignIn: 'restaurantSignIn',
    restaurantLogout: 'restaurantLogout',
    notAuth: 'notAuth',
    changeActiveAddress: 'changeActiveAddress',
    wantToChangeActiveAddress: 'wantToChangeActiveAddress'
}
