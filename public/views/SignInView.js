import { SignIn } from '../components/SignIn/SignIn.js';
import { SignInController } from '../controllers/SignInController.js';
import { noop } from '../modules/utils.js';

export class SignInView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new SignInController({ root })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.controller = controller;
        this.login = new SignIn({ root, goTo, controller });

    }

    render () {
        this.root.innerHTML = '';
        this.login.render();
    }

    renderServerError (error) {
        this.login.renderServerError(error)
    }
}
