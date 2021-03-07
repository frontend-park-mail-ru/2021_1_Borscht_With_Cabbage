import { ajaxGet } from './http.js';

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
    ajaxGet({ url: '/auth' })
        .then(resolve);
}
