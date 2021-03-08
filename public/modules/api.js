import { ajaxGet, ajaxPost } from './http.js';
import { authPromise } from './auth.js';

export function loginPost (email, password) {
    return ajaxPost({
        url: '/login',
        body: { email, password }
    })
        .then(authPromise);
}

export function signupPost (email, password) {
    return ajaxPost({
        url: '/signup',
        body: { email, password }
    })
        .then(authPromise);
}

export function authGet () {
    return ajaxGet({ url: '/auth' });
}

export function mainGet () {
    return ajaxGet({ url: '/restaurants' });
}

export function storeGet () {
    return ajaxGet({ url: '/store' });
}
