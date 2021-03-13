import { ajaxGet, ajaxPost, ajaxPut } from './http.js';
import { saveUser } from './auth.js';

/**
 * Send server post-request to user login and save email and avatar if status 200 ok
 *
 * @param {string} login
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function loginPost ({ login, password }) {
    return ajaxPost({
        url: '/signin',
        body: { login, password }
    })
        .then(saveUser);
}

/**
 * Send server post-request to user register and save username and avatar if status 200 ok
 *
 * @param {string} email
 * @param {string} password
 * @param {string} name
 * @param {string} phone
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function signupPost ({ email, password, name, phone }) {
    return ajaxPost({
        url: '/signup',
        body: {
            email,
            password,
            name,
            phone
        }
    })
        .then(saveUser);
}

/**
 * Send server get-request to check if user auth and get data about him (username and avatar)
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function authGet () {
    return ajaxGet({ url: '/auth' });
}

/**
 * Send server get-request to get main page with restaurants
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function mainGet () {
    return ajaxGet({ url: '/' });
}

/**
 * Send server get-request to get main page with concrete restaurants
 *
 * @param {string} url
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantsGet ({ url = '/restaurants' }) {
    return ajaxGet({ url: url });
}

/**
 * Send server get-request to get page with concrete restaurant
 *
 * @param {string} url
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function storeGet ({ url = '/' } = {}) {
    return ajaxGet({ url: url });
}

/**
 * Send server get-request to get page with user
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userGet () {
    return ajaxGet({ url: '/user' });
}

/**
 * Send server put-request with formData to put info about user
 *
 * @param {FormData} data with avatar name email phone
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userPut ({ data = null }) {
    return ajaxPut({
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
    return ajaxGet({ url: '/logout' });
}
