// import { authGet } from './api.js';
//
// // user = {
// //     name: '',
// //     avatar: ''
// // }
//
// export const saveUser = function (promise) {
//     window.isUserAuth = false;
//     if (promise.parsedJSON.code === 200) {
//         window.user = promise.parsedJSON.data;
//         window.isUserAuth = true;
//     }
//     console.log("user: ", window.user)
//
//     return promise;
// }
//
// export const deleteUser = function () {
//     window.isUserAuth = false;
//     window.user = null;
// }
//
// export function auth () {
//     return authGet()
//         .then(saveUser);
// }

import eventBus from './eventBus.js';
import AuthEvents from '../events/AuthEvents.js';

export function auth (promise) {
    if (promise.status === 200) {
        eventBus.emit(AuthEvents.userSignIn, promise.parsedJSON)
    }
    return promise
}
