import { authGet } from './api.js';

// user = {
//     email: '',
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

export function auth () {
    authGet()
        .then(saveUser);
}
