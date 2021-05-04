import { restaurantSignupPost } from "Modules/api.js";
import eventBus from "Modules/eventBus.js";
import { SignUpEvents } from "Events/SignUpEvents.js";

export class RestaurantSignUpModel {
    signUp ({ email, password, title, number }) {
        restaurantSignupPost({ email, password, title, number })
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
