import { authGet } from './api.js';

// user = {
//     email: '',
//     avatar: ''
// }

const resolve = function (promise) {
    window.isUserAuth = false;

    if (promise.status === 200) {
        window.user = promise.parsedJSON;
        window.isUserAuth = true;
    }
}

export function auth () {
    authGet()
        .then(resolve);
}

export function authPromise (promise) {
    return authGet()
        .then(resolve)
        .then(_ => promise);
}