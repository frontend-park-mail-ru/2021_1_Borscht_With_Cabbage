import { SignUp } from '../components/SignUp/SignUp.js';
import { SignUpController } from '../controllers/SignUpController.js';
import { noop } from '../modules/utils.js';

export class SignUpView {
    constructor ({
        root = document.body,
        goTo = noop,
        controller = new SignUpController({ root, goTo })
    } = {}) {
        this.goTo = goTo;
        this.root = root;
        this.signup = new SignUp({ root, goTo, controller });
    }

    render () {
        this.root.innerHTML = '';
        this.signup.render();
    }

    renderServerError (error) {
        this.signup.renderServerError(error);
    }
}
