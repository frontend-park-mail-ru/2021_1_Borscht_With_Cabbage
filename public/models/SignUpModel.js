import { signupPost } from 'Modules/api.js';
import { SignUpEvents } from 'Events/SignUpEvents.js';
import eventBus from 'Modules/eventBus.js';

class SignUpModel {
    signUp ({ email, password, name, number }) {
        signupPost({ email, password, name, number })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignUpEvents.userSignUpSuccess, {});
                } else {
                    eventBus.emit(SignUpEvents.userSignUpFailed, res);
                }
            })
            .catch(res => eventBus.emit(SignUpEvents.userSignUpFailed, res));
    }
}

export default new SignUpModel();
