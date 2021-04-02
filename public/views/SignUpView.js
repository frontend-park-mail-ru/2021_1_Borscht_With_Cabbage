import { Navbar } from '../components/NavBar/Navbar.js';
import { SignUp } from '../components/SignUp/SignUp.js';

export class SignUpView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        if (window.isUserAuth) {
            this.goTo('main')
        }
        this.root.innerHTML = '';
        this.navbar = new Navbar({ root: this.root, goTo: this.goTo });
        this.navbar.render()

        const signup = new SignUp({
            root: this.root,
            goTo: this.goTo
        });
        signup.render()
    }
}
