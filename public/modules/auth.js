import eventBus from './eventBus.js';
import AuthEvents from '../events/AuthEvents.js';

export function auth (promise) {
    if (promise.status !== 200) {
        return promise
    }

    if (promise.parsedJSON.role === 'user') {
        console.log("user")
        eventBus.emit(AuthEvents.userSignIn, promise.parsedJSON)
    } else if (promise.parsedJSON.role === 'admin') {
        console.log("admin")
        eventBus.emit(AuthEvents.restaurantSignIn, promise.parsedJSON)
    }
    return promise
}
