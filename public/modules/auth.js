import { authGet } from './api.js';

// user = {
//     name: '',
//     avatar: ''
// }

export const saveUser = function (promise) {
    window.isUserAuth = false;

    if (promise.status === 200) {
        window.user = promise.parsedJSON;
        window.isUserAuth = true;
    }

    return promise;
}

export const deleteUser = function () {
    window.isUserAuth = false;
    window.user = null;
}

export function auth () {
    return authGet()
        .then(saveUser);
}
