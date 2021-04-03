import { restaurantSignupPost } from "../modules/api.js";
import eventBus from "../modules/eventBus.js";
import SignUpEvents from "../events/SignUpEvents.js";

export class RestaurantSignUpModel {
    signUp ({ email, password, title, number }) {
        restaurantSignupPost({ email, password, title, number })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignUpEvents.userSignUpSuccess, {})
                } else {
                    eventBus.emit(SignUpEvents.userSignUpFailed, res.parsedJSON)
                }
            })
            .catch(res => eventBus.emit(SignUpEvents.userSignUpFailed, res.parsedJSON));
    }
}
