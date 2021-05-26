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
export function restaurantSignupPost ({ email, password, title, number, address }) {
    return Http.ajaxPost({
        url: '/restaurant/signup',
        body: {
            email,
            password,
            title,
            number,
            address
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
 * @param {string} section
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantAddDishPost ({ name, description, price, weight, section }) {
    return Http.ajaxPost({
        url: '/restaurant/dish',
        body: {
            name,
            description,
            price,
            weight,
            section
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
export function restaurantUpdateDishDataPut ({ id, name, description, price, weight }) {
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
 * Send server post-request to add section and get data about dish (id, name and avatar)
 *
 * @param {string} name
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function sectionAddPost ({ name }) {
    return Http.ajaxPost({
        url: '/restaurant/section',
        body: {
            name
        }
    });
}

/**
 * Send server delete-request to delete section
 *
 * @param {int} id
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function sectionDelete ({ id }) {
    return Http.ajaxDelete({
        url: '/restaurant/section',
        body: { id }
    });
}

/**
 * Send server post-request to update section and get data about dish (id, name and avatar)
 *
 * @param {int} id
 * @param {string} name
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function sectionUpdatePut ({ id, name }) {
    return Http.ajaxPutJson({
        url: '/restaurant/section',
        body: {
            id,
            name
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
 * @returns {Promise<{parsedJSON: *, status: *}>}
 */
export function authGet () {
    return Http.ajaxGet({ url: '/auth' }) // TODO: разобраться с /user/auth что из этого надо
        .then(auth);
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
    return Http.ajaxPutJson({
        url: '/user',
        body: data
    });
}

/**
 *
 * @param data
 * @returns {Promise<{parsedJSON: *, status: *}>}
 */
export function userAvatarPut ({ avatar = null }) {
    return Http.ajaxPutFormData({
        url: '/user/avatar',
        body: avatar
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
 * Send server get-request to get user's orders
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userOrdersGet () {
    return Http.ajaxGet({ url: '/user/orders' });
}

/**
 * Send server post-request to post user's review for order
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function userOrderPostReview (oid, review, stars) {
    return Http.ajaxPost({
        url: '/user/order/review',
        body: { oid, review, stars }
    });
}

/**
 * Send server put-request with formData to put new order's status
 *
 * @param {string} status
 * @param {string} deliveryTime
 * @param {int} order
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function updateStatus (status, deliveryTime, order) {
    return Http.ajaxPutJson({
        url: '/restaurant/order/status',
        body: { status, deliveryTime, order }
    });
}

/**
 * Send server get-request to get restaurant's orders
 *
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantOrdersGet () {
    return Http.ajaxGet({ url: '/restaurant/orders' });
}

/**
 * Send server put-request with formData to put info about user
 *
 * @param {FormData} data with avatar name email phone
 * @returns {Promise<{parsedJSON: object, status: number}>}
 */
export function restaurantPut ({ data = null }) {
    return Http.ajaxPutJson({
        url: '/restaurant',
        body: data
    });
}

/**
 *
 * @param data
 * @returns {Promise<{parsedJSON: *, status: *}>}
 */
export function restaurantAvatarPut ({ avatar = null }) {
    return Http.ajaxPutFormData({
        url: '/restaurant/avatar',
        body: avatar
    });
}

/**
 * Send server post to order food
 *
 * @returns {Promise<{parsedJSON: any, status: number}>}
 * @param data
 */
export function orderPost (data = {}) {
    return Http.ajaxPost({
        url: '/user/order',
        body: data
    });
}

export function addDishInBasket (data = {}) {
    return Http.ajaxPutJson({
        url: '/user/basket',
        body: data
    });
}

export function getBasket () {
    return Http.ajaxGet({
        url: '/user/basket'
    });
}

export function getReviews (rid) {
    return Http.ajaxGet({
        url: '/restaurant/'+rid+'/reviews'
    });
}

export function getRecommendations (id, latitude, longitude) {
    return Http.ajaxGet({
        url: '/restaurant/' + id + '/recommendations?latitude=' + latitude + '&longitude=' + longitude
    });
}

export function postBasket (basket) {
    return Http.ajaxPost({
        url: '/user/basket',
        body: basket
    });
}

export function postAddress (address) {
    return Http.ajaxPost({
        url: '/user/address',
        body: address
    });
}

export function getChats () {
    return Http.ajaxGet({
        url: '/chats'
    });
}

export function getChatMessage (id) {
    return Http.ajaxGet({
        url: `/chat/${id}`
    });
}

export function getWSKey () {
    return Http.ajaxGet({
       url: '/connect/ws'
    });
}

export function getBaskets (params) {
    return Http.ajaxGet({
        url: `/user/baskets${params}`
    });
}

export function deleteBasket (id) {
    return Http.ajaxDelete({
       url: `/user/basket/${id}`
    });
}

export function deleteAllBaskets () {
    return Http.ajaxDelete({
        url: '/user/basket/all'
    });
}
