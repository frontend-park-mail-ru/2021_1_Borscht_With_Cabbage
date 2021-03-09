import { ajaxGet, ajaxPost } from './http.js';
import { saveUser } from './auth.js';

/**
 * Send server post-request to user login and save email and avatar if status 200 ok
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function loginPost (email, password) {
    return ajaxPost({
        url: '/signin',
        body: { email, password }
    })
        .then(saveUser);
}

/**
 * Send server post-request to user register and save email and avatar if status 200 ok
 *
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function signupPost (email, password) {
    return ajaxPost({
        url: '/signup',
        body: { email, password }
    })
        .then(saveUser);
}

/**
 * Send server get-request to check if user auth and get data about him (email and avatar)
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
    return ajaxGet({ url: '/main' });
}

/**
 * Send server get-request to get main page with concrete restaurants
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantsGet ({ url = '/restaurants' }) {
    return ajaxGet({ url: url });
}

/**
 * Send server get-request to get page with concrete restaurant
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function storeGet () {
    return ajaxGet({ url: '/store' });
}
