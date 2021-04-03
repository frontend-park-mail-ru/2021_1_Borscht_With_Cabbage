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

export const AuthEvents = {
    userSignIn: 'userSignIn',
    userLogout: 'userLogout',
    offline: 'offlineRequest'
}
