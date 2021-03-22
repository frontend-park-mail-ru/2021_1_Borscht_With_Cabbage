import { Navbar } from '../components/NavBar/Navbar.js';
import { Login } from '../components/SignIn/Login.js';

export class SignInView {
    constructor (root, goTo) {
        this.goTo = goTo;
        this.root = root;
    }

    render () {
        this.root.innerHTML = '';
        this.navbar = new Navbar({ root: this.root, goTo: this.goTo });

        const login = new Login({
            root: this.root,
            goTo: this.goTo
        });
        login.render()
    }
}
