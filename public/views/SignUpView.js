import { SignUp } from '../components/SignUp/SignUp.js';
import user from '../modules/user.js';
import { SignUpController } from '../controllers/SignUpController.js';
import { Navbar } from "../components/NavBar/Navbar.js";

export class SignUpView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
        this.signUpController = new SignUpController()
    }

    render () {
        if (user.isAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';

        const signup = new SignUp({
            root: this.root,
            goTo: this.goTo,
            controller: this.signUpController
        });
        signup.render()
    }
}
