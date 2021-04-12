import { SignIn } from '../components/SignIn/SignIn.js';
import user from '../modules/user.js';
import { SignInController } from '../controllers/SignInController.js';
import { noop } from '../modules/utils.js';

export class SignInView {
    constructor ({
        root = document.body,
        goTo = noop
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signInController = new SignInController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main');
            return;
        }
        this.root.innerHTML = '';

        const login = new SignIn({
            root: this.root,
            goTo: this.goTo,
            controller: this.signInController
        });
        login.render()
    }
}
