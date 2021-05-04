import { SignIn } from 'Components/SignIn/SignIn.js';
import user from 'Modules/user.js';
import { SignInController } from 'Controllers/SignInController.js';
import { noop } from 'Modules/utils.js';

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
        if (!this.login) {
            this.login = new SignIn({
                root: this.root,
                goTo: this.goTo,
                controller: this.signInController
            });
        }
        this.login.render()
    }
}
