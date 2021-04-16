import { SignUp } from '../components/SignUp/SignUp.js';
import user from '../modules/user.js';
import { SignUpController } from '../controllers/SignUpController.js';
import { noop } from '../modules/utils.js';

export class SignUpView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signUpController = new SignUpController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main');
            return;
        }
        this.root.innerHTML = '';
        if (!this.signup) {
            this.signup = new SignUp({
                root: this.root,
                goTo: this.goTo,
                controller: this.signUpController
            });
        }
        this.signup.render();
    }
}
