import { loginPost } from 'Modules/api.js';
import eventBus from 'Modules/eventBus.js';
import { SignInEvents } from 'Events/SignInEvents.js';

class SignInModel {
    signIn (login, password) {
        loginPost({ login, password })
            .then(res => {
                if (res.status === 200) {
                    eventBus.emit(SignInEvents.userSignInSuccess, {});
                } else {
                    eventBus.emit(SignInEvents.userSignInFailed, res);
                }
            })
            .catch(res => eventBus.emit(SignInEvents.userSignInFailed, res));
    }
}

export default new SignInModel();
