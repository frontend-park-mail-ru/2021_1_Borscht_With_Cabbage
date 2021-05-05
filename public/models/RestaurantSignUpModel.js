import { restaurantSignupPost } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { SignUpEvents } from '../events/SignUpEvents.js';

class RestaurantSignUpModel {
    signUp ({ email, password, title, number, address }) {
        restaurantSignupPost({ email, password, title, number, address })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignUpEvents.restaurantSignUpSuccess, {})
                } else {
                    eventBus.emit(SignUpEvents.restaurantSignUpFailed, res)
                }
            })
            .catch(res => eventBus.emit(SignUpEvents.restaurantSignUpFailed, res));
    }
}

export default new RestaurantSignUpModel();
