import { Login } from '../components/SignIn/Login.js';
import user from '../modules/user.js';

export class SignInView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        if (user.isAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';

        const login = new Login({
            root: this.root,
            goTo: this.goTo
        });
        login.render()
    }
}
