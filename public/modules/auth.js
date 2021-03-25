import { authGet } from './api.js';
import user from './user.js';

export const saveUser = function (promise) {
    console.log('saveUser', promise)
    if (promise.status === 200) {
        user.auth(promise.parsedJSON)
    }

    return promise;
}

export const deleteUser = function () {
    user.logout()
}

export function auth () {
    return authGet()
        .then(saveUser);
}
