import { Http } from './http.js';
import { auth } from './auth.js';

/**
 * Send server post-request to user login and save email and avatar if status 200 ok
 *
 * @param {string} login
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function loginPost ({ login, password }) {
    return Http.ajaxPost({
        url: '/signin',
        body: { login, password }
    })
        .then(auth)
}

/**
 * Send server post-request to user register and save username and avatar if status 200 ok
 *
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @param {string} number
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function signupPost ({ email, password, name, number }) {
    return Http.ajaxPost({
        url: '/signup',
        body: {
            email,
            password,
            name,
            number
        }
    })
        .then(auth)
}

/**
 * Send server get-request to check if user auth and get data about him (username and avatar)
 *
 * @returns {Promise<void>}
 */
export function authGet () {
    return Http.ajaxGet({ url: '/user/auth' })
        .then(auth)
}

/**
 * Send server get-request to get main page with restaurants
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function mainGet () {
    return Http.ajaxGet({ url: '/' });
}

/**
 * Send server get-request to get main page with concrete restaurants
 *
 * @param {string} url
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantsGet ({ url = '/restaurants' }) {
    return Http.ajaxGet({ url: url });
}

/**
 * Send server get-request to get page with concrete restaurant
 *
 * @param {string} url
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function storeGet ({ url = '/' } = {}) {
    return Http.ajaxGet({ url: url });
}

/**
 * Send server get-request to get page with user
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userGet () {
    return Http.ajaxGet({ url: '/user' });
}

/**
 * Send server put-request with formData to put info about user
 *
 * @param {FormData} data with avatar name email phone
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userPut ({ data = null }) {
    return Http.ajaxPut({
        url: '/user',
        body: data
    });
}

/**
 * Send server get to logout (clean cookie)
 *
 * @returns {Promise<{parsedJSON: any, status: number}>}
 */
export function logoutGet () {
    return Http.ajaxGet({ url: '/logout' });
}
