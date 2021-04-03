import { loginPost } from '../modules/api.js';
import eventBus from '../modules/eventBus.js';
import { SignInEvents } from '../events/SignInEvents.js';

export class SignInModel {
    signIn (login, password) {
        loginPost({ login, password })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignInEvents.userSignInSuccess, {});
                } else {
                    eventBus.emit(SignInEvents.userSignInFailed, res.parsedJSON);
                }
            })
            .catch(res => eventBus.emit(SignInEvents.userSignInFailed, res.parsedJSON));
    }
}
