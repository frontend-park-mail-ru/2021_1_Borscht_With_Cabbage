import { SignUp } from '../components/SignUp/SignUp.js';
import user from '../modules/user.js';

export class SignUpView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        if (user.isAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';
        const signup = new SignUp({
            root: this.root,
            goTo: this.goTo
        });
        signup.render()
    }
}
