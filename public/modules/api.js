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
 * Send server post-request to user login and save email and avatar if status 200 ok
 *
 * @param {string} login
 * @param {string} password
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantLoginPost ({ login, password }) {
    return Http.ajaxPost({
        url: '/restaurant/signin',
        body: { login, password }
    })
        .then(auth)
}


/**
 * Send server post-request to user register and save username and avatar if status 200 ok
 *
 * @param {string} email
 * @param {string} password
 * @param {string} title
 * @param {string} number
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantSignupPost ({ email, password, title, number }) {
    return Http.ajaxPost({
        url: '/restaurant/signup',
        body: {
            email,
            password,
            title,
            number
        }
    })
        .then(auth)
}

/**
 * Send server post-request to add dish and get data about dish (id, name and avatar)
 *
 * @param {string} name
 * @param {string} description
 * @param {int} price
 * @param {int} weight
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
 export function restaurantAddDishPost ({ name, description, price, weight }) {
    return Http.ajaxPost({
        url: '/restaurant/dish',
        body: {
            name,
            description,
            price,
            weight
        }
    });
}

/**
 * Send server delete-request to delete dish
 *
 * @param {int} id
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
 export function restaurantDeleteDish ({ id }) {
    return Http.ajaxDelete({
        url: '/restaurant/dish',
        body: { id }
    });
}

/**
 * Send server post-request to update dish and get data about dish (id, name and avatar)
 *
 * @param {int} id
 * @param {string} name
 * @param {string} description
 * @param {int} price
 * @param {int} weight
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
 export function restaurantUpdateDishDataPut ({ id, name, description, price, weight}) {
    return Http.ajaxPutJson({
        url: '/restaurant/dish',
        body: {
            id,
            name,
            description,
            price,
            weight
        }
    });
}

/**
 * Send server put-request with formData to put image dish
 *
 * @param {FormData} data with image id
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
 export function restaurantUpdateDishImagePut ({ data = null }) {
    return Http.ajaxPutFormData({
        url: '/restaurant/dish/image',
        body: data
    });
}

/**
 * Send server post-request to add dish and get data about dish (id, name and avatar)
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
 export function allDishesGet () {
    return Http.ajaxGet({
        url: '/restaurant/dishes'
    });
}

/**
 * Send server get-request to check if user auth and get data about him (username and avatar)
 *
 * @returns {Promise<void>}
 */
export function authGet () {
    return Http.ajaxGet({ url: '/auth' }) // TODO: разобраться с /user/auth что из этого надо
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
    return Http.ajaxPutFormData({
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

/**
 * Send server get-request to get user's active orders
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userOrdersGet () {
    return Http.ajaxGet({ url: '/user/orders' });
}

/**
 * Send server put-request with formData to put info about restaurant
 *
 * @param {FormData} data with avatar title email phone deliveryCost
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantPut ({ data = null }) {
    return Http.ajaxPutFormData({
        url: '/restaurant/user',
        body: data
    });
}
