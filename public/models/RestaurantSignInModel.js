import { restaurantLoginPost } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { SignInEvents } from '../events/SignInEvents.js';

export class RestaurantSignInModel {
    signIn (login, password) {
        restaurantLoginPost({ login, password })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignInEvents.restaurantSignInSuccess, {})
                } else {
                    eventBus.emit(SignInEvents.restaurantSignInFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(SignInEvents.restaurantSignInFailed, res.parsedJSON));
    }
}
