import { Navbar } from '../components/NavBar/Navbar.js';
import { Login } from '../components/SignIn/Login.js';

export class SignInView {
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

        const login = new Login({
            root: this.root,
            goTo: this.goTo
        });
        login.render()
    }
}
