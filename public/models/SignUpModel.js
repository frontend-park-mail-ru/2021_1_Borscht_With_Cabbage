import { signupPost } from '../modules/api.js';
import SignUpEvents from '../events/SignUpEvents.js';
import eventBus from '../modules/eventBus.js';

export class SignUpModel {
    signUp ({ email, password, name, number }) {
        signupPost({ email, password, name, number })
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
