import { Login } from '../components/SignIn/Login.js';
import user from '../modules/user.js';
import { SignInController } from '../controllers/SignInController.js';
import { Navbar } from "../components/NavBar/Navbar.js";

export class SignInView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.signInController = new SignInController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';

        const login = new Login({
            root: this.root,
            goTo: this.goTo,
            controller: this.signInController
        });
        login.render()
    }
}
