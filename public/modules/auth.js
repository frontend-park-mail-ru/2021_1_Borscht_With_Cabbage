import eventBus from './eventBus.js';
import { AuthEvents } from '../events/AuthEvents.js';

export function auth (promise) {
    if (promise.status !== 200) {
        eventBus.emit(AuthEvents.notAuth, {});
    } else {
        eventBus.emit(AuthEvents.userSignIn, promise.parsedJSON);
    }

    return promise
}
